function createChart(elementId) {
    // Container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 300, // Increase right margin to accommodate legend
        bottom: 100, // Increase bottom margin to accommodate x-axis label
        left: 100,
    };

    // Calculate dimensions without margins
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;

    // Define legend properties
    const legendRectSize = 15;
    const legendItemSpacing = 130; // Increased horizontal spacing between legend items
    const legendLabelSpacing = 10; // Space between legend item and label
    const legendRows = 2; // Number of rows for legend
    const verticalSpacing = 20; // Less vertical spacing between rows

    // Create svg element
    const svg = d3
        .select(elementId)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // Create inner group element
    const g = svg
        .append('g')
        .attr('class', 'svg-group')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    // Create tooltip element
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('opacity', 0)
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '5px')
        .style('border-radius', '5px');

    // Read in air quality data
    d3.csv('percent_insurance.csv').then(function (data) {
        data.forEach(d => {
            d.pct = parseFloat(d.pct.replace(/,/g, ""));
        });

        const stateData = {};

        data.forEach(d => {
            if (!stateData[d.state]) {
                stateData[d.state] = [];
            }
            stateData[d.state].push(d.pct);
        });

        // Calculate average pct for each state
        let countryAveragePercentage = 0;
        const stateAverages = {};
        for (const state in stateData) {
            const pcts = stateData[state];
            
            // Filter out NaN values from the pcts array
            const validPcts = pcts.filter(value => !isNaN(value));
            
            // Ensure that we only calculate sum and average if there are valid values
            if (validPcts.length > 0) {
                const sum = validPcts.reduce((a, b) => a + b, 0);
                const average = sum / validPcts.length;
                stateAverages[state] = average;
                countryAveragePercentage += average; // Add to country average sum
            }
        }
        
        // Calculate overall country average percentage
        const totalStates = Object.keys(stateData).length;
        countryAveragePercentage /= totalStates;
        
        const stateDeviations = {};
        for (const state in stateData) {
            stateDeviations[state] = stateAverages[state] - countryAveragePercentage;
        }

        const chartData = Object.keys(stateDeviations).map(state => ({
            state,
            deviation: stateDeviations[state]
        }));

        // Define a color scale for all states
        const colorScale = d3.scaleOrdinal(d3.schemeSet2)
            .domain(chartData.map(d => d.state)); // Ensure all states are in the color domain

        // Populate checkboxes with states
        const checkboxContainer = d3.select('#checkbox-container');
        
        // Style checkbox container as a grid
        checkboxContainer.style('display', 'grid')
            .style('grid-template-columns', 'repeat(auto-fill, minmax(120px, 1fr))') // Responsive grid
            .style('gap', '10px'); // Space between checkboxes

        checkboxContainer.selectAll('div.checkbox-item')
            .data(chartData)
            .enter()
            .append('div')
            .attr('class', 'checkbox-item')
            .each(function(d) {
                const container = d3.select(this);
                
                container.append('input')
                    .attr('type', 'checkbox')
                    .attr('id', `checkbox-${d.state.replace(/\s+/g, '-')}`)
                    .attr('value', d.state)
                    .on('change', updateChart);

                container.append('label')
                    .attr('for', `checkbox-${d.state.replace(/\s+/g, '-')}`)
                    .text(d.state);
            });

        // Create initial scales and axes
        const yScale = d3.scaleBand()
            .domain(chartData.map(d => d.state))
            .range([0, innerHeight])
            .padding(0.1); // Adjust padding for thinner bars

        const xScale = d3.scaleLinear()
            .domain([d3.min(chartData, d => d.deviation) || 0, d3.max(chartData, d => d.deviation) || 0])
            .nice()
            .range([0, innerWidth]);

        // Draw initial x-axis
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');

        // Draw vertical line at x = 0
        g.append('line')
            .attr('class', 'zero-line')
            .attr('x1', xScale(0))
            .attr('x2', xScale(0))
            .attr('y1', 0)
            .attr('y2', innerHeight)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        // Define a function to update the legend
        function updateLegend(selectedStates) {
            // Remove existing legend
            svg.select('.legend').remove();

            // Define the legend group and position it to the right of the chart
            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${margins.left + innerWidth + 30}, ${margins.top})`); // Adjust position

            // Create the legend data for selected states
            const legendStates = selectedStates.map((state, i) => ({
                label: state,
                color: colorScale(state),
                index: i
            }));

            // Calculate number of rows needed
            const numRows = Math.ceil(legendStates.length / legendRows);

            // Add rectangles for the legend
            legend.selectAll('rect')
                .data(legendStates)
                .enter()
                .append('rect')
                .attr('x', d => (d.index % legendRows) * (legendRectSize + legendItemSpacing))
                .attr('y', d => Math.floor(d.index / legendRows) * verticalSpacing)
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .attr('fill', d => d.color);

            // Add text labels for the legend
            legend.selectAll('text')
                .data(legendStates)
                .enter()
                .append('text')
                .attr('x', d => (d.index % legendRows) * (legendRectSize + legendItemSpacing) + legendRectSize + legendLabelSpacing)
                .attr('y', d => Math.floor(d.index / legendRows) * verticalSpacing + legendRectSize / 2)
                .attr('dy', '0.35em') // Vertical alignment adjustment
                .attr('text-anchor', 'start')
                .text(d => d.label)
                .style('font-size', '13px');
        }

        // Update the chart based on selected checkboxes
        function updateChart() {
            const selectedStates = Array.from(document.querySelectorAll('#checkbox-container input:checked'))
                .map(checkbox => checkbox.value);

            // Ensure the number of selected states does not exceed 8
            if (selectedStates.length > 8) {
                alert('You can only select up to 8 states.');
                return;
            }

            // Filter the data based on selected states
            const filteredData = chartData.filter(d => selectedStates.includes(d.state));

            // If no states are selected, clear the chart
            if (filteredData.length === 0) {
                g.selectAll('.bar').remove();
                return;
            }

            // Update scales based on filtered data
            const xDomain = [
                d3.min(filteredData, d => d.deviation),
                d3.max(filteredData, d => d.deviation)
            ];

            // Ensure xScale always includes zero if it is in the range
            xScale.domain([
                Math.min(0, xDomain[0]),
                Math.max(0, xDomain[1])
            ]);

            yScale.domain(filteredData.map(d => d.state));

            // Update bars
            g.selectAll('.bar')
                .data(filteredData, d => d.state)
                .join(
                    enter => enter.append('rect')
                        .attr('class', 'bar')
                        .attr('x', d => xScale(Math.min(0, d.deviation))) // Bars start at the x position for the deviation
                        .attr('y', d => yScale(d.state))
                        .attr('height', yScale.bandwidth())
                        .attr('width', d => Math.abs(xScale(d.deviation) - xScale(0))) // Ensure width is positive
                        .attr('fill', d => colorScale(d.state))
                        .on('mouseover', function(event, d) {
                            tooltip.transition()
                                .duration(200)
                                .style('opacity', .9);
                            tooltip.html(`<strong>${d.state}</strong><br>Deviation: ${d.deviation.toFixed(2)}`)
                                .style('left', `${event.pageX + 10}px`) // Adjusted for better placement
                                .style('top', `${event.pageY - 28}px`); // Position above the cursor
                        })
                        .on('mousemove', function(event) {
                            tooltip.style('left', `${event.pageX + 10}px`)
                                .style('top', `${event.pageY - 28}px`);
                        })
                        .on('mouseout', function() {
                            tooltip.transition()
                                .duration(500)
                                .style('opacity', 0);
                        }),
                    update => update
                        .attr('x', d => xScale(Math.min(0, d.deviation))) // Bars start at the x position for the deviation
                        .attr('y', d => yScale(d.state))
                        .attr('height', yScale.bandwidth())
                        .attr('width', d => Math.abs(xScale(d.deviation) - xScale(0))), // Ensure width is positive
                    exit => exit.remove()
                );

            // Update x-axis
            g.select('.x-axis')
                .call(d3.axisBottom(xScale));

            // Update vertical line at x = 0
            g.select('.zero-line')
                .attr('x1', xScale(0))
                .attr('x2', xScale(0))
                .attr('y1', 0)
                .attr('y2', innerHeight);

            // Update the legend
            updateLegend(selectedStates);
        }

        // Initial chart render
        updateChart();
    });
}

createChart('#chart-container');
