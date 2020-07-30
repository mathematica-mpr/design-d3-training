function buildChart(containerId) {
    // read in our data
    d3.json('data/climate.json', function(error, data) {
        // handle read errors
        if (error) {
            console.error('failed to read data');
            return;
        }
        console.log('raw', data);

        // coerce data to correct format 
        var parser = d3.timeParse("%Y");
        data.forEach(function(d) {
            d.temp = +d.temp;
            d.year = parser(d.year);
        });

        console.log('clean', data);
 
    // size globals
    var margin = {
        top: 50,
        right: 80,
        bottom: 50,
        left: 80
    };

    // calculate dimensions
    var width = 1000;
    var height = 500;
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    // create svg element
    var svg = d3
        .select(containerId)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // create inner group element
    var g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // scales
        var x = d3.scaleTime()
                  .domain(d3.extent(data, function(d) { 
                      return d.year; 
                    }))
                  .range([0, innerWidth]) ;

        var y = d3
            .scaleLinear()
            .domain([
                d3.min(data, function(d){
                    return d.temp*1.05;
                }),
                d3.max(data, function(d) {
                    return d.temp*1.05;
                })
            ])
            .range([innerHeight, 0]);

        // axes
        var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y"))

        g
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + innerHeight + ')')
            .call(xAxis.ticks(d3.timeYear, 2)) // displaying every year is crowded; display every other year
            .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

        var yAxis = d3.axisLeft(y).ticks(10);

        g
            .append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        // add path and points
        g
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("d", d3.line()
              .x(function(d) {return x(d.year)})
              .y(function(d) { return y(d.temp) })
            );
        g
            .selectAll(".dot")
            .data(data)
            .enter().append("circle") 
            .attr("fill", "steelblue") 
            .attr("stroke", "white") // Assign a class for styling
            .attr("cx", function(d) { return x(d.year)})
            .attr("cy", function(d) { return y(d.temp) })
            .attr("r", 3);

        // axis labels
        g
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -30)
            .attr('y', innerHeight / 2 - 20)
            .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ')')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 14)
            .text('Global annual mean temperature anomaly (\xB0C)');

        // title
        g
            .append('text')
            .attr('class', 'title')
            .attr('x', innerWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 20)
            .text('Global temperature anomaly');
    });
}

buildChart('#climate-chart');

