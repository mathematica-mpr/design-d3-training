function createChart(elementId) {

    // container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };
  
    // calculate dimensions without margins
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;
  
    // create svg element
    const svg = d3
      .select(elementId)
      .append('svg')
      .attr('height', height)
      .attr('width', width);
  
    // create inner group element
    const g = svg
      .append('g')
      .attr('class', 'svg-group')
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
  

    // Read in air quality data
    d3.csv('air_quality.csv').then(function (data) {
        
        data.forEach(d => {
            d.Emissions = parseFloat(d.Emissions.replace(/,/g, ""));
        });

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.State))
            .range([0, innerWidth])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.Emissions)])
            .nice()
            .range([innerHeight, 0]);

        const regionKey = d3.scaleOrdinal()
            .domain(data.map(d => d.Region))
            .range(d3.schemeSet2);

        const bars = g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.State))
            .attr('y', d => yScale(d.Emissions))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.Emissions))
            .attr('fill', d => regionKey(d.Region));

    
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .attr('text-anchor', 'end')
                .attr('dx', '-0.8em')
                .attr('dy', '0.15em');

       
        g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));

        // Labels
        g.append('text')
            .attr('class', 'x label')
            .attr('text-anchor', 'end')
            .attr('x', innerWidth / 2)
            .attr('y', height)
            .text('State')
            .style('font-size', '13px');

        g.append('text')
            .attr('class', 'y label')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margins.left + 5) 
            .attr('x', -innerHeight / 2)
            .text('Emissions')
            .style('font-size', '13px');

        g.append('text')
            .attr('class', 'title')
            .attr('text-anchor', 'end')
            .attr('x', (width / 2) + margins.left)
            .attr('y', 10)
            .text('Emissions in the United States')
            .style('font-size', '14px');

        // Legend
        const legendRectSize = 15;
        const legendSpacing = 5;

        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${width - margins.right*2}, ${margins.top})`);

        const legendRegions = regionKey.domain().map((d, i) => ({
            label: d,
            color: regionKey(d),
            y: i * (legendRectSize + legendSpacing)
        }));

        legend.selectAll('rect')
            .data(legendRegions)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', d => d.y)
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .attr('fill', d => d.color);

        legend.selectAll('text')
            .data(legendRegions)
            .enter()
            .append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', d => d.y + legendRectSize - 4)
            .attr('text-anchor', 'start')
            .text(d => d.label)
            .style('font-size', '13px');

        // Sort 
        d3.selectAll('.sortTypes').on('input', function () {
            function findComp(id) {
                if (id === 'sort-states') {
                    return (a, b) => d3.ascending(a.State, b.State);
                } else if (id === 'sort-emissions-asc') {
                    return (a, b) => d3.ascending(a.Emissions, b.Emissions);
                } else {
                    return (a, b) => d3.descending(a.Emissions, b.Emissions);
                }
            }
            
            data.sort(findComp(this.id));
            xScale.domain(data.map(d => d.State));

            const delay = +d3.select('#delay-input').node().value || 0;
            if (isNaN(delay)) {
                alert(`Please enter a valid number`);
            } else {
                bars.transition()
                    .duration(1500)
                    .attr('x', d => xScale(d.State))
                    .delay((d, i) => i * delay);

                g.select('.x-axis')
                    .transition()
                    .duration(1500)
                    .call(xAxis)
                    .selectAll('text') // rotate and adjust text labels
                        .attr('transform', 'rotate(-45)')
                        .attr('text-anchor', 'end')
                        .attr('dx', '-0.7em')
                        .attr('dy', '0.15em')
                    .delay((d, i) => i * delay);
            }
        });
    });
}

createChart('#chart-container');
