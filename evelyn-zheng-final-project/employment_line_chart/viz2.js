function createChart(elementId, dropdownContainerId) {
    // Container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 350, 
        bottom: 50,
        left: 50
    };

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
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let stateLines = {};
    let colorScale;

    d3.csv('pct_employ.csv').then(function(data) {

        data.forEach(d => {
            ['2016', '2017', '2018', '2019', '2020'].forEach(year => {
                d[year] = parseFloat(d[year].replace(/,/g, "")) || 0; 
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

        // Flatten data and prepare for line plotting
        const linesData = Object.keys(stateData).map(state => ({
            state: state,
            values: stateData[state]
        }));

        colorScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(Object.keys(stateData)); 

        // Define scales
        const xScale = d3.scalePoint()
            .domain(['2016', '2017', '2018', '2019', '2020'])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(Object.values(stateData).flat().map(d => d.value))]) // Adjust domain to cover all data values
            .nice()
            .range([innerHeight, 0]);

        svg.append('text')
            .attr('class', 'title-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth)
            .attr('y', margins.top / 2)
            .style('font-size', '14px')
            .text('Percentage of States that is Employed from 2016-2020');

        svg.append('text')
            .attr('class', 'x-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth / 2)
            .attr('y', height - margins.bottom / 3)
            .style('font-size', '14px')
            .text('Year');

        svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', -(innerHeight / 2 + margins.top))
            .attr('y', margins.left / 3)
            .attr('transform', 'rotate(-90)')
            .style('font-size', '14px')
            .text('Percent Employed');

        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.value))
            .curve(d3.curveLinear);

        // Draw country line
        const countryColor = colorScale('country'); // Get color for country
        const countryLine = g.append('path')
            .datum(stateData["country"])
            .attr('class', 'line')
            .attr('d', line)
            .style('stroke', countryColor) 
            .style('stroke-width', 2)
            .style('fill', 'none')
            .attr('data-state', 'country') 
            .style('visibility', 'hidden'); 

        // Add points for the country
        g.selectAll('.point-country')
            .data(stateData["country"])
            .enter()
            .append('circle')
            .attr('class', 'point-country')
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.value))
            .attr('r', 4)
            .style('fill', countryColor) // Use color scale for country points
            .style('visibility', 'hidden') // Initially hide
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
            const path = g.append('path')
                .datum(state.values)
                .attr('class', 'line')
                .attr('d', line)
                .style('stroke', colorScale(state.state)) 
                .style('stroke-width', 2)
                .style('fill', 'none')
                .attr('data-state', state.state) // Add a data attribute for identification
                .style('visibility', 'hidden'); 

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
                .style('fill', colorScale(state.state)) 
                .style('visibility', 'hidden') 
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

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        // Create dropdown menu
        const dropdownMenu = d3.select(dropdownContainerId);

        const createCheckboxItem = (value, text) => {
            const checkboxItem = dropdownMenu.append('div')
                .attr('class', 'checkbox-item')
                .style('display', 'flex') // Horizontal alignment
                .style('align-items', 'center')
                .style('margin-bottom', '5px'); 

            // Create and append checkbox
            checkboxItem.append('input')
                .attr('type', 'checkbox')
                .attr('id', value) 
                .attr('value', value)
                .on('change', updateChart); // Dropdown change event handle

            // Create and append label
            checkboxItem.append('label')
                .attr('for', value) // Link label to checkbox via for attribute
                .text(text);
        };

        // Add checkboxes and labels for each state
        Object.keys(stateData).filter(state => state !== 'country').forEach(state => {
            createCheckboxItem(state, state.replace(/-/g, ' ')); // For multiple worded states
        });

        // Add the Country option separately
        createCheckboxItem('country', 'Country');

        // Toggle dropdown menu visibility
        d3.select('#dropdown-button').on('click', function() {
            const menu = d3.select(dropdownContainerId);
            const isVisible = menu.classed('visible');
            menu.classed('visible', !isVisible);
            d3.select('.arrow').classed('up', !isVisible).classed('down', isVisible);
        });

        // Update the legend
        function updateLegend() {
            const legend = g.selectAll('.legend').data([0]); // Create a single legend container
            legend.enter().append('g').attr('class', 'legend')
                .merge(legend)
                .attr('transform', `translate(${innerWidth + 20}, 20)`);
            
            legend.selectAll('*').remove(); // Clear existing legend

            const selectedStates = Array.from(dropdownMenu.selectAll('input:checked').nodes()).map(node => node.value);

            // Color assignment
            const uniqueColorScale = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(selectedStates);

            const numColumns = 3;
            const numRows = Math.ceil(selectedStates.length / numColumns);

            // Append legend items
            selectedStates.forEach((state, index) => {
                const col = Math.floor(index / numRows); // Determine column index for legend order
                const row = index % numRows; // Determine row index

                legend.append('rect')
                    .attr('x', col * 100) 
                    .attr('y', row * 20) 
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', uniqueColorScale(state)); // Use color scale for the legend

                legend.append('text')
                    .attr('x', col * 100 + 15) 
                    .attr('y', row * 20 + 10) 
                    .text(state.replace(/-/g, ' ')) // Convert dashes back to spaces for display
                    .style('font-size', '12px')
                    .attr('alignment-baseline', 'middle');
            });
        }

        function updateChart() {
            // Get selected states from dropdown
            const selectedStates = Array.from(dropdownMenu.selectAll('input:checked').nodes()).map(node => node.value);

            // Update country line visibility
            const isCountryChecked = selectedStates.includes('country');
            countryLine.style('visibility', isCountryChecked ? 'visible' : 'hidden');
            g.selectAll('.point-country')
                .style('visibility', isCountryChecked ? 'visible' : 'hidden');

            // Update state lines visibility
            Object.keys(stateLines).forEach(state => {
                const isChecked = selectedStates.includes(state);
                stateLines[state].style('visibility', isChecked ? 'visible' : 'hidden');
                g.selectAll(`.point-${state}`)
                    .style('visibility', isChecked ? 'visible' : 'hidden');
            });

            // Update the legend
            updateLegend();
        }

        updateChart();
    }).catch(function(error) {
        console.error('Error loading CSV file:', error);
    });
}

d3.select('body').on('click', function(event) {
    if (!d3.select('#dropdown').node().contains(event.target)) {
        d3.select('#dropdown-menu').classed('visible', false);
        d3.select('.arrow').classed('up', false).classed('down', true);
    }
});

createChart('#chart-container', '#dropdown-menu');
