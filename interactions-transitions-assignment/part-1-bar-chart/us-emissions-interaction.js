function createChart(elementId) {
    const toNum = stringNum => {
        if (typeof stringNum === "string")
            return +(stringNum.replace(/,/g, ''))
        return stringNum;
    };

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
    d3.csv('air_quality.csv').then( function(data) {


        // bar chart and transitions code goes here

        // const minEmissions = d3.min(data, d => +d.Emissions);
        const maxEmissions = d3.max(data, d => toNum(d.Emissions));
        const y = d3.scaleLinear()
            .domain([0, maxEmissions])
            .range([innerHeight, 0]);
        const x = d3.scaleBand()
            .domain(data.map(d => d.State))
            .rangeRound([0, innerWidth])
            .padding(0.1);

        const regions = data.reduce((arr, state) => {
            if (!arr.includes(state.Region)) arr.push(state.Region);
            return arr;
        }, new Array());

        const scaleOrdinal = d3.scaleOrdinal()
            .domain(regions)
            .range(d3.schemeTableau10);

        const chart = g.selectAll('g')
            .data(data)
            .join('g')
            .attr('transform', d =>
                `translate(${x(d.State)}, ${y(toNum(d.Emissions))})`);

        const bars = chart.append('rect')
            .attr('width', x.bandwidth())
            .attr('fill', d => scaleOrdinal(d.Region))
            .attr('height', d => innerHeight - y(toNum(d.Emissions)));

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

        // Add interactivity
        // document.getElementsByName()

        // console.log(maxEmissions);
    });
    
    return svg.node();
}

createChart('#chart-container');
