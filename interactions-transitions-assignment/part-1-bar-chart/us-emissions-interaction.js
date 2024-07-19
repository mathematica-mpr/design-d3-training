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
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
    
    const sortData = [
        {
            key: 'sort-state',
            comp: (a,b) => d3.ascending(a.State, b.State)
        },
        {
            key: 'sort-emissions-asc',
            comp: (a,b) => d3.ascending(a.Emissions, b.Emissions)
        },
        {
            key: 'sort-emissions-des',
            comp: (a,b) => d3.descending(a.Emissions, b.Emissions)
        }
    ]
    // read in air quality data
    d3.csv('air_quality.csv').then(function (data) {
        data.forEach(d => {
            d.Emissions = parseFloat(d.Emissions.replace(/,/g, ""));
        });

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.State))
            .range([0,width*0.8])
            .padding(0.2)

        const yScale = d3.scaleLinear()
            .domain([0,d3.max(data, d => +d.Emissions)])
            .range([height,0]);

        const regionKey = d3.scaleOrdinal()
            .domain(data.map(d => d.Region))
            .range(d3.schemeSet2);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr("transform", `translate(${margins.left}, -${margins.bottom})`)
            .attr('x', d => xScale(d.State))
            .attr('y', d => yScale(+d.Emissions))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(+d.Emissions))
            .attr('fill', d => regionKey(d.Region))
    
        svg.append('g')
            .attr("transform", `translate(${margins.left}, ${height - margins.bottom})`)
            .call(d3.axisBottom(xScale))
            .attr("class", "x-axis")
            .attr("font-size","7px")

        svg.append('g')
            .attr("transform", `translate(${margins.left}, -${margins.bottom})`)
            .call(d3.axisLeft(yScale))
            .attr('class','y-axis')

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width/2)
            .attr("y", height)
            .text("State")
        .style("font-size","13px")
        
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -100)
            .attr("y", height)
            .attr("transform", `translate(-${width/2},100) rotate(-90)`)
            .text("Emissions")
        .style("font-size","13px");
        
        svg.append("text")
            .attr("class", "title")
            .attr("text-anchor", "end")
            .attr("x", (width/2)+margins.left)
            .attr("y", 10)
            .text("Emissions in the United States")
            .style("font-size","14px")


        const legendRectSize = 15
        const legendSpacing = 5

        const legend = svg.append("g")
            .attr("class","legend")
            .attr("transform",`translate(${width-margins.right}`)

        const legendRegions = regionKey.domain().map((d,i) => ({
            label: d,
            color: regionKey(d),
            y: i*(legendRectSize + legendSpacing)
            }))

        legend.selectAll("rect")
            .data(legendRegions)
            .enter()
            .append("rect")
            .attr("x", 120)
            .attr("y", d => d.y)
            .attr("width", legendRectSize)
            .attr("height", legendRectSize)
            .attr("fill", d => d.color)

        legend.selectAll("text")
            .data(legendRegions)
            .enter()
            .append("text")
            .attr("x", legendRectSize + legendSpacing + 120)
            .attr("y", d => d.y + legendRectSize - 4)
            .attr("text-anchor","start")
            .text(d => d.label)
            .style("font-size","13px")

        d3.selectAll('.inputSort').on('input', ()=> {
            const s = sortData.filter(d => d.key == this.id)[0]
            data.sort(s.comp)
            xScale.domain(data.map(d => d.State))
        })
            });
}

createChart('#chart-container');
