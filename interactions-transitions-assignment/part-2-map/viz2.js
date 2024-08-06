function createChart(elementId, checkboxContainerId) {
    // Container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 350, // Increased right margin to accommodate legend
        bottom: 50,
        left: 50
    };

    // Calculate dimensions without margins
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;

    // Create SVG element
    const svg = d3.select(elementId)
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('border', '1px solid black'); // Add border for visibility

    // Create inner group element
    const g = svg.append('g')
        .attr('class', 'svg-group')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    // Create a tooltip element
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'lightgrey')
        .style('border', '1px solid black')
        .style('padding', '5px')
        .style('border-radius', '3px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    let stateLines = {};
    let countryLine;
    let colorScale;

    // Load CSV data
    d3.csv('pct_employ.csv').then(function(data) {
        console.log('Data loaded:', data); // Log data for debugging

        // Parse pct columns to float
        data.forEach(d => {
            ['2016', '2017', '2018', '2019', '2020'].forEach(year => {
                d[year] = parseFloat(d[year].replace(/,/g, "")) || 0; // Ensure default value for missing or non-numeric data
            });
        });

        // Aggregate data by state
        const stateData = {};
        const countryTotals = { count: 0, sum: { '2016': 0, '2017': 0, '2018': 0, '2019': 0, '2020': 0 } };

        data.forEach(d => {
            const stateName = d.state.replace(/\s+/g, '-'); // Convert spaces to dashes for ID
            if (!stateData[stateName]) {
                stateData[stateName] = { '2016': 0, '2017': 0, '2018': 0, '2019': 0, '2020': 0, count: 0 };
            }
            ['2016', '2017', '2018', '2019', '2020'].forEach(year => {
                stateData[stateName][year] += d[year];
            });
            stateData[stateName].count++;

            // Update country totals
            countryTotals.count++;
            ['2016', '2017', '2018', '2019', '2020'].forEach(year => {
                countryTotals.sum[year] += d[year];
            });
        });

        // Convert sums to averages for each state
        Object.keys(stateData).forEach(state => {
            const averages = ['2016', '2017', '2018', '2019', '2020'].map(year => ({
                year: year,
                value: stateData[state][year] / stateData[state].count
            }));
            stateData[state] = averages;
        });

        // Calculate the country average
        const averageCountryData = ['2016', '2017', '2018', '2019', '2020'].map(year => ({
            year: year,
            value: countryTotals.sum[year] / countryTotals.count
        }));
        stateData["country"] = averageCountryData;

        console.log('State Data:', stateData); // Log stateData to check if all states have data

        // Flatten data and prepare for line plotting
        const linesData = Object.keys(stateData).map(state => ({
            state: state,
            values: stateData[state]
        }));

        console.log('Lines Data:', linesData); // Log linesData to check if it contains all states

        // Define color scale with sufficient colors
        colorScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(Object.keys(stateData).filter(state => state !== 'country'));

        // Define scales
        const xScale = d3.scalePoint()
            .domain(['2016', '2017', '2018', '2019', '2020'])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(Object.values(stateData).flat().map(d => d.value))]) // Adjust domain to cover all data values
            .nice()
            .range([innerHeight, 0]);

        // Create line generator
        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.value))
            .curve(d3.curveLinear); // Use linear interpolation for smooth lines

        // Draw country line
        countryLine = g.append('path')
            .datum(stateData["country"])
            .attr('class', 'line')
            .attr('d', line)
            .style('stroke', 'black') // Different color for the country line
            .style('stroke-width', 2)
            .style('fill', 'none')
            .attr('data-state', 'country') // Add a data attribute for identification
            .style('visibility', 'hidden'); // Initially hide the country line

        // Add points for the country
        g.selectAll('.point-country')
            .data(stateData["country"])
            .enter()
            .append('circle')
            .attr('class', 'point-country')
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.value))
            .attr('r', 4)
            .style('fill', 'black') // Different color for country points
            .style('visibility', 'hidden') // Initially hide all points
            .on('mouseover', function(event, d) {
                tooltip.transition().duration(200).style('opacity', .9);
                tooltip.html(`State: Country<br>Year: ${d.year}<br>Percent: ${d.value.toFixed(2)}%`)
                    .style('left', `${event.pageX + 5}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', function() {
                tooltip.transition().duration(500).style('opacity', 0);
            });

        // Draw state lines and create a mapping to control visibility
        linesData.forEach(state => {
            if (state.state === "country") return; // Skip country line here
            console.log(`Drawing line for state: ${state.state}`, state.values); // Debugging each state’s line data
            const path = g.append('path')
                .datum(state.values)
                .attr('class', 'line')
                .attr('d', line)
                .style('stroke', colorScale(state.state)) // Use color scale for different states
                .style('stroke-width', 2)
                .style('fill', 'none')
                .attr('data-state', state.state) // Add a data attribute for identification
                .style('visibility', 'hidden'); // Initially hide all lines

            stateLines[state.state] = path;

            // Add points for each year
            g.selectAll(`.point-${state.state}`)
                .data(state.values)
                .enter()
                .append('circle')
                .attr('class', `point-${state.state}`)
                .attr('cx', d => xScale(d.year))
                .attr('cy', d => yScale(d.value))
                .attr('r', 4)
                .style('fill', colorScale(state.state)) // Use color scale for different states
                .style('visibility', 'hidden') // Initially hide all points
                .on('mouseover', function(event, d) {
                    tooltip.transition().duration(200).style('opacity', .9);
                    tooltip.html(`State: ${state.state.replace(/-/g, ' ')}<br>Year: ${d.year}<br>Percent: ${d.value.toFixed(2)}%`)
                        .style('left', `${event.pageX + 5}px`)
                        .style('top', `${event.pageY - 28}px`);
                })
                .on('mouseout', function() {
                    tooltip.transition().duration(500).style('opacity', 0);
                });
        });

        // Create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Append x-axis
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        // Append y-axis
        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        // Create checkboxes
        const checkboxContainer = d3.select(checkboxContainerId);

        // Style checkbox container as a grid
        checkboxContainer.style('display', 'grid')
            .style('grid-template-columns', 'repeat(10, 1fr)')
            .style('gap', '10px'); // Space between checkboxes

        // Create the Country checkbox first
        checkboxContainer.append('div')
            .append('input')
            .attr('type', 'checkbox')
            .attr('id', 'checkbox-country')
            .property('checked', false) // Default unchecked
            .on('change', updateChart); // Checkbox change event handler
        
        checkboxContainer.append('label')
            .attr('for', 'checkbox-country')
            .text('Country');

        // Checkboxes for state lines
        Object.keys(stateData).forEach(state => {
            if (state === "country") return; // Skip country here
            checkboxContainer.append('div')
                .append('input')
                .attr('type', 'checkbox')
                .attr('id', `checkbox-${state}`)
                .property('checked', false) // Default unchecked
                .on('change', updateChart); // Checkbox change event handler
            
            checkboxContainer.append('label')
                .attr('for', `checkbox-${state}`)
                .text(state.replace(/-/g, ' ')); // Convert dashes back to spaces for display
        });

        // Add a legend
        const legend = svg.append('g')
            .attr('transform', `translate(${margins.left + innerWidth + 20}, ${margins.top})`)
            .style('display', 'grid')
            .style('grid-template-columns', 'repeat(3, 1fr)') // Three columns
            .style('grid-auto-rows', '20px') // Fixed row height
            .style('gap', '5px'); // Space between legend items

        // Update the legend based on selected checkboxes
        function updateLegend() {
            legend.selectAll('*').remove(); // Clear existing legend

            const selectedStates = Object.keys(stateLines).filter(state => 
                d3.select(`#checkbox-${state}`).property('checked')
            );

            // Ensure unique color assignment
            const uniqueColorScale = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(selectedStates);

            const numColumns = 3;
            const numRows = Math.ceil(selectedStates.length / numColumns);

            // Append legend items
            selectedStates.forEach((state, index) => {
                const col = Math.floor(index / numRows); // Determine column index
                const row = index % numRows; // Determine row index

                legend.append('rect')
                    .attr('x', col * 100) // Position by column
                    .attr('y', row * 20) // Position by row
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', colorScale(state)); // Use color scale for the legend

                legend.append('text')
                    .attr('x', col * 100 + 15) // Position by column
                    .attr('y', row * 20 + 10) // Position by row
                    .text(state.replace(/-/g, ' ')) // Convert dashes back to spaces for display
                    .style('font-size', '12px')
                    .attr('alignment-baseline', 'middle');
            });
        }

        // Update chart based on checkbox selection
        function updateChart() {
            // Update country line visibility
            const isCountryChecked = d3.select('#checkbox-country').property('checked');
            countryLine.style('visibility', isCountryChecked ? 'visible' : 'hidden');
            g.selectAll('.point-country')
                .style('visibility', isCountryChecked ? 'visible' : 'hidden');

            // Update state lines visibility
            Object.keys(stateLines).forEach(state => {
                const isChecked = d3.select(`#checkbox-${state}`).property('checked');
                stateLines[state].style('visibility', isChecked ? 'visible' : 'hidden');
                g.selectAll(`.point-${state}`)
                    .style('visibility', isChecked ? 'visible' : 'hidden');
            });

            // Update the legend
            updateLegend();
        }

        // Initial update to ensure chart is updated
        updateChart();
    }).catch(function(error) {
        console.error('Error loading CSV file:', error);
    });
}

createChart('#chart-container', '#checkbox-container');
