function buildChart(containerId) {
    // read in our data
    d3.csv('data/air_quality.csv', function(error, data) {
        // handle read errors
        if (error) {
            console.error('failed to read data');
            return;
        }

        console.log('raw', data);

        // coerce data to numeric 
        data.forEach(function(d) {
            d.Emissions = parseFloat(d.Emissions.replace(/,/g, ''));
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
    var width = 1300;
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
        var x = d3
            .scaleBand()
            .domain(
                data.map(function(d) {
                    return d.State;
                })
            )
            .range([0, innerWidth])
            .padding(0.4);

        var y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, function(d) {
                    return d.Emissions*1.05;
                })
            ])
            .range([innerHeight, 0]);

        // axes
        var xAxis = d3.axisBottom(x)

        g
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + innerHeight + ')')
            .call(xAxis);

        var yAxis = d3.axisLeft(y).ticks(10);

        g
            .append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        // bars
        var colors = d3.scaleOrdinal()
            .domain(["West", "South", "Midwest", "Northeast"])
            .range(["#E69F00", "#009E73", "#56B4E9",  "#0072B2"]);

        g
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr("fill", function(d) {
                return colors(d.Region);
            })
            .attr('x', function(d) {
                return x(d.State);
            })
            .attr('y', function(d) {
                return y(d.Emissions);
            })
            .attr('width', x.bandwidth())
            .attr('height', function(d) {
                return innerHeight - y(d.Emissions);
            })
            .attr('stroke', 'none');


        var createHorizontalLine = function(y_pos, line_length){
            g
                .append("g")
                .attr("transform", "translate(0, "+ y(y_pos) +")")
                .append("line")
                .attr("x2", line_length)
                .style("stroke", "black")
                .style("stroke-width", "1px")
        };

        createHorizontalLine(0, innerWidth);

        // axis labels
        g
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -30)
            .attr('y', innerHeight / 2 - 40)
            .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ')')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 14)
            .text('Million metric tons of energy-related carbon dioxide');

        // title
        g
            .append('text')
            .attr('class', 'title')
            .attr('x', innerWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 20)
            .text('2019 Annual Emissions');
    });
}

buildChart('#air-quality-chart');

