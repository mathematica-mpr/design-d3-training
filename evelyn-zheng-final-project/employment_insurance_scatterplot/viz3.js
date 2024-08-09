function createChart(elementId, dropdownContainerId) {
    // Container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 370, 
        bottom: 50,
        left: 70
    };

    // Calculate dimensions without margin vals
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;

    // Create SVG element
    const svg = d3.select(elementId)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // Create inner group element
    const g = svg.append('g')
        .attr('class', 'svg-group')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    // Create a tooltip element
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip');

    let points, colorScale, regressionLine, equationText;
    let allStatesChecked = false; 

    d3.csv('correlation_employed_insurance.csv').then(function(data) {
        // Parse data
        data.forEach(d => {
            d.pct_employed = +d.pct_employed;
            d.pct_private = +d.pct_private;
            d.state = d.state || 'Unknown'; // Ensure state is not undefined
        });

        // Filter out invalid data points
        data = data.filter(d => d.pct_employed && d.pct_private && d.state !== 'Unknown');

        // Get the unique states
        const states = Array.from(new Set(data.map(d => d.state)));
        colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(states);

        // Define scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.pct_employed)])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.pct_private)])
            .range([innerHeight, 0]);

        // Create scatterplot points
        points = g.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => xScale(d.pct_employed))
            .attr('cy', d => yScale(d.pct_private))
            .attr('r', 5)
            .style('fill', d => colorScale(d.state))
            .style('opacity', 0.7)
            .style('stroke', 'black')
            .style('stroke-width', 0.5)
            .style('display', 'none'); // Start with points hidden

        // Tooltip interactions
        points.on('mouseover', function(event, d) {
            tooltip.transition().duration(200).style('opacity', .9);
            tooltip.html(`
                <strong>State:</strong> ${d.state}<br/>
                <strong>County:</strong> ${d.county}<br/>
                <strong>Employed (%):</strong> ${d.pct_employed.toFixed(2)}<br/>
                <strong>Private Insurance (%):</strong> ${d.pct_private.toFixed(2)}
            `)
            .style('left', (event.pageX + 5) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        }).on('mouseout', function() {
            tooltip.transition().duration(500).style('opacity', 0);
        });

        // Create checkboxes
        const dropdownMenu = d3.select(dropdownContainerId);

        // Add "All States" checkbox to dropdown first
        const allStatesCheckboxWrapper = dropdownMenu.append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('padding', '5px');

        allStatesCheckboxWrapper.append('input')
            .attr('type', 'checkbox')
            .attr('id', 'checkbox-all-states')
            .property('checked', false) 
            .on('change', function() {
                allStatesChecked = d3.select(this).property('checked');
                d3.selectAll('input[type="checkbox"]').property('checked', false);
                d3.select(this).property('checked', allStatesChecked);
                updateChart();
            });

        allStatesCheckboxWrapper.append('label')
            .attr('for', 'checkbox-all-states')
            .text('All States')
            .style('margin-left', '8px'); // Put some white space between box and text

        // Add states to the dropdown menu
        states.forEach(state => {
            const sanitizedState = state.replace(/\s+/g, '-'); // Accommodate for states with multiple words

            // Create checkbox container
            const checkboxWrapper = dropdownMenu.append('div')
                .style('display', 'flex')
                .style('padding', '5px');

            checkboxWrapper.append('input')
                .attr('type', 'checkbox')
                .attr('id', `checkbox-${sanitizedState}`)
                .property('checked', false) // Default unchecked
                .on('change', updateChart);

            checkboxWrapper.append('label')
                .attr('for', `checkbox-${sanitizedState}`)
                .text(state)
                .style('margin-left', '8px'); // Space between checkbox and label
        });

        const xAxis = d3.axisBottom(xScale).ticks(10);
        const yAxis = d3.axisLeft(yScale).ticks(10);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        svg.append('text')
            .attr('class', 'title-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth)
            .attr('y', margins.top / 2)
            .style('font-size', '14px')
            .text('Percent of Counties with Private Health Insurance and Corresponding Employment Percentages Filtered By State in the US');

        svg.append('text')
            .attr('class', 'x-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth / 2)
            .attr('y', height - margins.bottom / 3)
            .style('font-size', '14px')
            .text('Private Health Insurance Percentage (%)');

        svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', -innerHeight * 0.7)
            .attr('y', margins.left / 3)
            .attr('transform', 'rotate(-90)')
            .style('font-size', '14px')
            .text('Employment Percentage (%)');

        // Create legend container
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${margins.left + innerWidth + 20}, ${margins.top})`);

        // Update the legend based on selected checkboxes
        function updateLegend() {
            legend.selectAll('*').remove(); // Clear existing legend

            const selectedStates = allStatesChecked
                ? states // If "All States" is checked, include all states
                : states.filter(state => {
                    const checkbox = d3.select(`#checkbox-${state.replace(/\s+/g, '-')}`);
                    return checkbox.node() && checkbox.property('checked');
                });

            const numColumns = 3; 
            const itemWidth = 130; // rectangle + text
            const itemHeight = 20; 

            // Append legend items
            selectedStates.forEach((state, index) => {
                const col = index % numColumns; //indices to determine placement in legend
                const row = Math.floor(index / numColumns); 

                legend.append('rect')
                    .attr('x', col * itemWidth) 
                    .attr('y', row * itemHeight) 
                    .attr('width', 15)
                    .attr('height', 15)
                    .style('fill', colorScale(state)); 

                legend.append('text')
                    .attr('x', col * itemWidth + 20) 
                    .attr('y', row * itemHeight + 12) 
                    .text(state)
                    .style('font-size', '12px')
                    .style('text-anchor', 'start');
            });
        }

        // Linear regression calc
        function linearRegression(data) {
            const n = data.length;
            const xMean = d3.mean(data, d => d.pct_employed);
            const yMean = d3.mean(data, d => d.pct_private);

            const xyMean = d3.mean(data, d => d.pct_employed * d.pct_private);
            const x2Mean = d3.mean(data, d => d.pct_employed * d.pct_employed);

            const slope = (xyMean - xMean * yMean) / (x2Mean - xMean * xMean);
            const intercept = yMean - slope * xMean;

            return { slope, intercept };
        }

        // Draw regression line
        function updateRegressionLine() {
            // Remove any existing regression line and equation text
            if (regressionLine) {
                regressionLine.remove();
                equationText.remove();
            }

            // Get selected data
            const selectedData = allStatesChecked
                ? data // include all data if this box is chosen
                : data.filter(d => {
                    const sanitizedState = d.state.replace(/\s+/g, '-');
                    const checkbox = d3.select(`#checkbox-${sanitizedState}`);
                    return checkbox.node() && checkbox.property('checked');
                });

            const { slope, intercept } = linearRegression(selectedData);

            // Define the line function
            const lineFunction = d3.line()
                .x(d => xScale(d.pct_employed))
                .y(d => yScale(slope * d.pct_employed + intercept))
                .curve(d3.curveLinear);

            // Create regression line
            regressionLine = g.append('path')
                .datum([
                    { pct_employed: d3.min(selectedData, d => d.pct_employed) },
                    { pct_employed: d3.max(selectedData, d => d.pct_employed) }
                ])
                .attr('class', 'regression-line')
                .attr('d', lineFunction)
                .style('stroke', 'red')
                .style('stroke-width', 2)
                .style('fill', 'none');

            // Calculate the label position
            const xPosition = margins.left + innerWidth - 200;
            const yPosition = margins.top + 50;

            // Add the equation text
            equationText = svg.append('text')
                .attr('x', xPosition)
                .attr('y', yPosition)
                .style('font-size', '14px')
                .style('fill', 'red')
                .text(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`);
        }

        // Update chart based on checkbox selection
        function updateChart() {
            // Update points visibility
            points.style('display', d => {
                if (allStatesChecked) {
                    return 'initial'; // Show all points if "All States" is checked
                }

                const sanitizedState = d.state.replace(/\s+/g, '-');
                const checkbox = d3.select(`#checkbox-${sanitizedState}`);
                return checkbox.node() && checkbox.property('checked') ? 'initial' : 'none';
            });

            // Update the regression line
            updateRegressionLine();

            // Update the legend
            updateLegend();
        }

        updateChart();

    }).catch(function(error) {
        console.error('Error loading CSV file:', error);
    });

    // Dropdown button functionality
    d3.select('#dropdown-button').on('click', function() {
        const menu = d3.select('#dropdown-menu');
        const isVisible = menu.classed('visible');
        menu.classed('visible', !isVisible);
        d3.select('.arrow').classed('up', !isVisible).classed('down', isVisible);
    });

    // Close dropdown when clicking outside
    d3.select('body').on('click', function(event) {
        if (!d3.select('#dropdown').node().contains(event.target)) {
            d3.select('#dropdown-menu').classed('visible', false);
            d3.select('.arrow').classed('up', false).classed('down', true);
        }
    });
}

createChart('#chart-container', '#dropdown-menu');
