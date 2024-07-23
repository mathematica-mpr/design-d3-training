function createChart(elementId) {
  
    // container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 70,
        bottom: 50,
        left: 70,
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
  // read in air quality data
  d3.csv('air_quality.csv').then(function(data) {
    // parse data
    data.forEach(function(d) {
        d.State = d.State;
        d.Emissions = +d.Emissions.replace(/,/g, '');
        d.Region = d.Region;
    });

    // map and transitions code goes here
    const stateScale = d3.scaleBand()
        .domain(data.map(d => d.State))
        .range([0, innerWidth])
        .padding(0.1);
    const emissionsScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Emissions)])
        .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.Region))
        .range(d3.schemeCategory10);
    const xAxis = d3.axisBottom(stateScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(emissionsScale).ticks(d3.max(data, d=> d.Emissions)/ 5000);
    g.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => stateScale(d.State))
        .attr("y", d => emissionsScale(d.Emissions))
        .attr("width", stateScale.bandwidth())
        .attr("height", d => innerHeight - emissionsScale(d.Emissions)) 
        .attr("fill", d => colorScale(d.Region));

    //x axis
    g.append('g')
        .attr("class", "x axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
    // y axis
    g.append('g')
        .attr("transform", `translate(0,0)`)
        .call(yAxis);
    // labels for x and y axis and graph title
    g.append("text")
        .attr("x", innerWidth / 2.5)
        .attr("y", innerHeight - margins.bottom + 100)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("States");
    
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margins.left + 12)
        .attr("x", 0 - (innerHeight / 2))
        .attr("dy", "0.05em")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Emissions");
    
    g.append("text")
      .attr("x", innerWidth / 2.5)
      .attr("y", margins.top / 100)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Emissions by State ");
    
    // legend for regions
    const legend = svg.append("g")
      .attr("transform", `translate(${margins.left + 120},${margins.top})`);
    const regions = Array.from(new Set(data.map(d => d.Region)));
    regions.forEach((region, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0,${i * 20})`); 
      legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", colorScale(region));
  
      legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(region);
    });
    // create bars
    let bars = g.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar");

  // add event listeners for the radio buttons
    d3.selectAll('input[name="sort"]').on('change', function() {
        let sortOrder;
        if (this.value === 'state') {
        sortOrder = (a, b) => d3.ascending(a.State, b.State);
        } else if (this.value === 'emissions-desc') {
        sortOrder = (a, b) => d3.descending(a.Emissions, b.Emissions);
        } else if (this.value === 'emissions-asc') {
        sortOrder = (a, b) => d3.ascending(a.Emissions, b.Emissions);
        }

        // sort data
        data.sort(sortOrder);

        // update scales
        stateScale.domain(data.map(d => d.State));
        emissionsScale.domain([0, d3.max(data, d => d.Emissions)]);

        // transition bars
        bars.transition()
        .duration(1500)
        .delay((_d, i) => i * Number(d3.select('#delay').node().value))
        .attr("x", d => stateScale(d.State))
        .attr("y", d => emissionsScale(d.Emissions))
        .attr("height", d => innerHeight - emissionsScale(d.Emissions));

        g.select('.x.axis')
            .transition()
            .duration(1500)
            .call(xAxis);

        if(isNaN(d3.select('#delay').node().value)) {
            alert("Please enter a number for the delay");
            return;
        }
    
    });  
  });
};

createChart('#chart-container');
