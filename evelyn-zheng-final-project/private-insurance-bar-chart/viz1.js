function createChart(elementId, yearDropdownId) {
    // Container dimensions
    const height = 600;
    const width = 1000;
    const margins = { top: 50, right: 300, bottom: 120, left: 100 };

    const xTicks = 10; 

    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;

    // Create SVG element
    const svg = d3.select(elementId)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // Create inner group element
    const g = svg.append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    // Create tooltip element
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        

    // Create year dropdown
    const yearDropdown = d3.select(yearDropdownId);
    const years = ['2016', '2017', '2018', '2019', '2020'];

    yearDropdown.selectAll('option')
        .data(years)
        .join('option')
        .attr('value', d => d)
        .text(d => `Year ${d}`);

    d3.csv('private_insurance_county.csv').then(data => {
        const stateData = {};

        data.forEach(d => {
            years.forEach(year => {
                const stateKey = `state_${year}`;
                const pctKey = `pct_${year}`;
                if (d[stateKey] && d[pctKey]) {
                    const stateName = d[stateKey].trim();
                    if (!stateData[stateName]) {
                        stateData[stateName] = {};
                    }
                    stateData[stateName][year] = parseFloat(d[pctKey].replace(/,/g, ""));
                }
            });
        });

        let selectedYear = years[0];

        function calculateStats() {
            let countryAveragePercentage = 0;
            const stateAverages = {};
            for (const state in stateData) {
                const average = stateData[state][selectedYear] || 0;
                stateAverages[state] = average;
                countryAveragePercentage += average;
            }
            countryAveragePercentage /= Object.keys(stateData).length;
            const stateDeviations = {};
            for (const state in stateData) {
                stateDeviations[state] = stateAverages[state] - countryAveragePercentage;
            }

            return Object.keys(stateDeviations).map(state => ({
                state,
                deviation: stateDeviations[state]
            }));
        }

        let chartData = calculateStats();

        const colorScale = d3.scaleOrdinal(d3.schemeSet2)
            .domain(chartData.map(d => d.state));

        // Populate checkboxes
        const dropdownMenu = d3.select('#dropdown-menu');

        // Remove existing items to avoid duplication
        dropdownMenu.selectAll('*').remove();


        const allStatesDiv = dropdownMenu.append('div')
        .attr('class', 'checkbox-item')
        .style('display', 'flex') 
        .style('align-items', 'center')
        .style('margin-bottom', '5px'); 

        allStatesDiv.append('input')
        .attr('type', 'checkbox')
        .attr('id', 'all-states-checkbox')
        .attr('value', 'All States')
        .on('change', function() {
            updateChart();
        });

        allStatesDiv.append('label')
        .attr('for', 'all-states-checkbox')
        .text('All States');


        // Add individual state checkboxes
        dropdownMenu.selectAll('div.checkbox-item')
            .data(chartData)
            .enter()
            .append('div')
            .attr('class', 'checkbox-item')
            .style('display', 'flex')
            .style('align-items', 'center') 
            .style('margin-bottom', '5px') 
            .each((d) => {
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

        // Create scales and axes
        const yScale = d3.scaleBand()
            .domain(chartData.map(d => d.state))
            .range([0, innerHeight])
            .padding(0.1);

        const xScale = d3.scaleLinear()
            .domain([-50, 50])
            .nice()
            .range([0, innerWidth]);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).ticks(xTicks).tickFormat(d => d.toFixed(0)));

        g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));

        svg.append('text')
            .attr('class', 'title-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth / 2)
            .attr('y', margins.top / 2)
            .style('font-size', '14px')
            .text('Average Deviation (%) of Each State in the US from the Average Percentage of the Country Population with Private Insurance');

        svg.append('text')
            .attr('class', 'x-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left + innerWidth / 2)
            .attr('y', height - margins.bottom / 2)
            .style('font-size', '14px')
            .text('Deviation from Country Average (%)');

        svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', margins.left - 40)
            .attr('y', margins.top + innerHeight / 2)
            .attr('transform', 'rotate(-90)')
            .style('font-size', '14px')
            .text('State');

        g.append('line')
            .attr('class', 'zero-line')
            .attr('x1', xScale(0))
            .attr('x2', xScale(0))
            .attr('y1', 0)
            .attr('y2', innerHeight)
            .attr('stroke', '#000')
            .attr('stroke-width', 1);

            const legendRectSize = 15;
            const legendItemSpacing = 130; 
            const legendLabelSpacing = 10; 
            const verticalSpacing = 30; 
            const maxLegendColumns = 3; 

        function updateLegend(selectedStates) {
            svg.select('.legend').remove();

            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${margins.left + innerWidth + 30}, ${margins.top})`);

            const legendStates = selectedStates.map((state, i) => ({
                label: state,
                color: colorScale(state),
                index: i
            }));

            const numRows = Math.ceil(legendStates.length / maxLegendColumns);

            // Adjust SVG width if needed
            svg.attr('width', Math.max(width, margins.left + innerWidth + (legendRectSize + legendItemSpacing) * maxLegendColumns + margins.right));

            legend.selectAll('rect')
                .data(legendStates)
                .enter()
                .append('rect')
                .attr('x', d => (d.index % maxLegendColumns) * (legendRectSize + legendItemSpacing))
                .attr('y', d => Math.floor(d.index / maxLegendColumns) * verticalSpacing)
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .attr('fill', d => d.color);

            legend.selectAll('text')
                .data(legendStates)
                .enter()
                .append('text')
                .attr('x', d => (d.index % maxLegendColumns) * (legendRectSize + legendItemSpacing) + legendRectSize + legendLabelSpacing)
                .attr('y', d => Math.floor(d.index / maxLegendColumns) * verticalSpacing + legendRectSize / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'start')
                .text(d => d.label)
                .style('font-size', '13px');
        }

        function updateChart() {
            const allStatesChecked = document.getElementById('all-states-checkbox').checked;
            const selectedStates = allStatesChecked ? chartData.map(d => d.state) :
                Array.from(document.querySelectorAll('#dropdown-menu input:checked'))
                .map(checkbox => checkbox.value);

            const filteredData = chartData.filter(d => selectedStates.includes(d.state));

            if (filteredData.length === 0) {
                g.selectAll('.bar').remove();
                return;
            }

            yScale.domain(filteredData.map(d => d.state));

            g.selectAll('.bar')
                .data(filteredData, d => d.state)
                .join(
                    enter => enter.append('rect')
                        .attr('class', 'bar')
                        .attr('x', d => xScale(Math.min(0, d.deviation)))
                        .attr('y', d => yScale(d.state))
                        .attr('height', yScale.bandwidth())
                        .attr('width', d => Math.abs(xScale(d.deviation) - xScale(0)))
                        .attr('fill', d => colorScale(d.state))
                        .on('mouseover', function(event, d) {
                            tooltip.transition().duration(200).style('opacity', .9);
                            tooltip.html(`<strong>${d.state}</strong><br>Deviation: ${d.deviation.toFixed(2)}`)
                                .style('left', `${event.pageX + 10}px`)
                                .style('top', `${event.pageY - 28}px`);
                        })
                        .on('mousemove', function(event) {
                            tooltip.style('left', `${event.pageX + 10}px`)
                                .style('top', `${event.pageY - 28}px`);
                        })
                        .on('mouseout', function() {
                            tooltip.transition().duration(500).style('opacity', 0);
                        }),
                    update => update
                        .attr('x', d => xScale(Math.min(0, d.deviation)))
                        .attr('y', d => yScale(d.state))
                        .attr('height', yScale.bandwidth())
                        .attr('width', d => Math.abs(xScale(d.deviation) - xScale(0))),
                    exit => exit.remove()
                );

            g.select('.x-axis').call(d3.axisBottom(xScale).ticks(xTicks).tickFormat(d => d.toFixed(0)));
            g.select('.y-axis').call(d3.axisLeft(yScale));
            g.select('.zero-line')
                .attr('x1', xScale(0))
                .attr('x2', xScale(0))
                .attr('y1', 0)
                .attr('y2', innerHeight);

            updateLegend(selectedStates);
        }

        yearDropdown.on('change', function() {
            selectedYear = this.value;
            chartData = calculateStats();
            updateChart();
        });

        // Toggle dropdown visibility when clicking the button
        document.getElementById('dropdown-button').addEventListener('click', function() {
            const dropdownMenu = document.getElementById('dropdown-menu');
            dropdownMenu.classList.toggle('visible');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdownMenu = document.getElementById('dropdown-menu');
            const dropdownButton = document.getElementById('dropdown-button');

            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('visible');
            }
        });

        updateChart();
    }).catch(error => {
        console.error("Error loading CSV data:", error);
    });
}

createChart('#chart-container', '#year-dropdown');
