function createChart(elementId, checkboxContainerId) {
    // Container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 370, // Increased right margin to accommodate legend
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

    let points, colorScale;

    // Load CSV data
    d3.csv('correlation_employed_insurance.csv').then(function(data) {
        console.log('Data loaded:', data); // Log data for debugging

        // Parse data
        data.forEach(d => {
            d.pct_employed = +d.pct_employed;
            d.pct_private = +d.pct_private;
            d.state = d.state || 'Unknown'; // Ensure state is not undefined
        });

        // Filter out invalid data points
        data = data.filter(d => d.pct_employed && d.pct_private && d.state !== 'Unknown');

        // Extract unique states
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
            .enter().append('circle')
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
            tooltip.html(`<strong>State:</strong> ${d.state}<br/><strong>County:</strong> ${d.county}<br/><strong>Employed (%):</strong> ${d.pct_employed.toFixed(2)}<br/><strong>Private Insurance (%):</strong> ${d.pct_private.toFixed(2)}`)
                .style('left', (event.pageX + 5) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        }).on('mouseout', function() {
            tooltip.transition().duration(500).style('opacity', 0);
        });

        // Create checkboxes
        const checkboxContainer = d3.select(checkboxContainerId);

        checkboxContainer.style('display', 'grid')
            .style('grid-template-columns', 'repeat(auto-fill, minmax(200px, 1fr))')
            .style('gap', '10px') // Space between checkboxes
            .style('align-items', 'center'); // Center align items vertically

        states.forEach(state => {
            const sanitizedState = state.replace(/\s+/g, '-'); // Replace spaces with dashes for IDs
            const checkboxId = `checkbox-${sanitizedState}`;
            
            // Create checkbox container
            const checkboxWrapper = checkboxContainer.append('div')
                .style('display', 'flex')
                .style('align-items', 'center');

            checkboxWrapper.append('input')
                .attr('type', 'checkbox')
                .attr('id', checkboxId)
                .property('checked', false) // Default unchecked
                .on('change', updateChart);

            checkboxWrapper.append('label')
                .attr('for', checkboxId)
                .text(state)
                .style('margin-left', '8px'); // Space between checkbox and label
        });

        // Add X and Y axes
        const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.format(".2f"));
        const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(d3.format(".2f"));

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .append('text')
            .attr('class', 'x-axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', margins.bottom - 10)
            .style('text-anchor', 'middle')
            .text('Percentage Employed');

        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -margins.left)
            .attr('y', innerHeight / 2)
            .attr('dy', '-3em')
            .style('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('Percentage with Private Insurance');

        // Create legend container
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${margins.left + innerWidth + 20}, ${margins.top})`);

        // Update the legend based on selected checkboxes
        function updateLegend() {
            legend.selectAll('*').remove(); // Clear existing legend

            const selectedStates = states.filter(state => {
                const checkbox = d3.select(`#checkbox-${state.replace(/\s+/g, '-')}`);
                return checkbox.node() && checkbox.property('checked');
            });

            const numColumns = 3; // Number of columns for the legend
            const itemWidth = 130; // Width of each legend item (increased for multi-word names)
            const itemHeight = 20; // Height of each legend item
            const numRows = Math.ceil(selectedStates.length / numColumns); // Number of rows

            // Append legend items
            selectedStates.forEach((state, index) => {
                const col = index % numColumns; // Determine column index
                const row = Math.floor(index / numColumns); // Determine row index

                legend.append('rect')
                    .attr('x', col * itemWidth) // Position by column
                    .attr('y', row * itemHeight) // Position by row
                    .attr('width', 15)
                    .attr('height', 15)
                    .style('fill', colorScale(state)); // Use color scale for the legend

                legend.append('text')
                    .attr('x', col * itemWidth + 20) // Position by column
                    .attr('y', row * itemHeight + 12) // Position by row
                    .text(state)
                    .style('font-size', '12px')
                    .style('text-anchor', 'start');
            });
        }

        // Update chart based on checkbox selection
        function updateChart() {
            // Update points visibility
            points.style('display', d => {
                const sanitizedState = d.state.replace(/\s+/g, '-');
                const checkbox = d3.select(`#checkbox-${sanitizedState}`);
                return checkbox.node() && checkbox.property('checked') ? 'initial' : 'none';
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

// Initialize the chart with the container ID and checkbox container ID
createChart('#chart-container', '#checkbox-container');
