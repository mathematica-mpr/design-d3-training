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
    const svg = d3.select(elementId).append('svg').attr('height', height).attr('width', width);

    // create inner group element
    const g = svg
        .append('g')
        .attr('class', 'svg-group')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle');

    // read in air quality data
    d3.csv('air_quality.csv').then( data => {
        // bar chart and transitions code goes here

        // tidy data
        data.forEach(d => 
            d.Emissions = +(d.Emissions.replace(/,/g, ''))
        );

        const maxEmissions = d3.max(data, d => d.Emissions);
        const y = d3.scaleLinear()
            .domain([0, maxEmissions])
            .range([innerHeight, 0]);

        const x = d3.scaleBand()
            .domain(data.map(d => d.State))
            .rangeRound([0, innerWidth - 10])
            .padding(0.1);

        const regions = data.reduce((arr, state) => {
            if (!arr.includes(state.Region)) arr.push(state.Region);
            return arr;
        }, []);

        const scaleOrdinal = d3.scaleOrdinal()
            .domain(regions)
            .range(d3.schemeTableau10);

        const chart = g.selectAll('g')
            .data(data)
            .join('g')
            .attr('transform', d =>
                `translate(${x(d.State)}, ${y(d.Emissions)})`);

        const bars = chart.append('rect')
            .style("mix-blend-mode", "multiply")
            .attr('width', x.bandwidth())
            .attr('fill', d => scaleOrdinal(d.Region))
            .attr('height', d => innerHeight - y(d.Emissions));

        const legendHeight = 50;
        const legendSpacing = 2;
        const legendBlockNum = scaleOrdinal.domain().length;
        const legendBlockSize = (legendHeight - ((legendBlockNum - 1) * legendSpacing)) / legendBlockNum;

        const legend = g.append('g')
            .attr('transform', `translate(${innerWidth - 10}, 10)`);

        legend.selectAll('rect')
            .data(scaleOrdinal.domain())
            .join('rect')
            .attr('height', legendBlockSize)
            .attr('width', legendBlockSize)
            .attr('stroke', 'black')
            .attr('y', (_, i) => i * (legendBlockSize+legendSpacing))
            .attr('fill', d => scaleOrdinal(d));

        legend.selectAll('text')
            .data(scaleOrdinal.domain())
            .join('text')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .style('font-size', legendBlockSize)
            .style('fill', 'black')
            .attr('x', legendBlockSize + 4)
            .attr('y', (_, i) => i * (legendBlockSize+legendSpacing))
            .text(d => d);

        legend.append('text')
            .style('font-size', legendBlockSize + 1)
            .style('fill', 'black')
            .attr('x', 6)
            .attr('y', -legendBlockSize)
            .text('Class');


        const bottomAxis = g.append('g')
            .attr('transform', `translate(0,${innerHeight})`);

        bottomAxis.append('g')
            .call(d3.axisBottom(x));
        bottomAxis.append('text')
            .attr('font-size', 15)
            .attr('x', +svg.attr('width') / 2)
            .attr('y', 35)
            .text('States');

        const leftAxis = g.append('g');
            leftAxis.append('g')
            .call(d3.axisLeft(y));
        leftAxis.append('text')
            .attr('font-size', 15)
            .attr('y', -10)
            .text('Emissions');

        const title = g.append('text')
            .attr('font-size', 25)
            .attr('x', (width - margins.left) / 2)
            .attr('y', -10)
            .text('Gas Emissions in 2020 Across the US');

        const radioButtons = Array.from(document.getElementsByName('sort'));
        radioButtons.forEach(button => {
            button.addEventListener('change', _ => updateSort());
        });

        const updateSort = _ => {
            const activeButton = radioButtons.find(button => button.checked);
            switch(activeButton.id) {
                case "sort-ascending":
                    data = d3.sort(data, state => state.Emissions);
                    break;
                case "sort-state":
                    data = d3.sort(data, state => state.State);
                    break;
                case "sort-descending":
                    data = d3.reverse(d3.sort(data, state => state.Emissions));
                    break;
            }
            x.domain(data.map(d => d.State));
            svg.node().update();
        };

        svg.node().update = _ => {
            const t = svg.transition()
                .duration(1500);
            const delay = +document.getElementById("delay-input").value;
            if (isNaN(delay)) alert("Can not accept input. Must be a number.");
        
            chart.data(data, d => d.State)
                .order()
              .transition(t)
                .delay((_, i) => i * delay)
                .attr('transform', d =>
                    `translate(${x(d.State)}, ${y(d.Emissions)})`);
        
            bottomAxis.transition(t)
                .call(d3.axisBottom(x))
              .selectAll(".tick")
                .delay((_, i) => i * delay);
        };
    });
    
    return svg.node();
}

createChart('#chart-container');
