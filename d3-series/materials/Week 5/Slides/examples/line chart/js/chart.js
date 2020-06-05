function buildChart(containerId) {
    // size globals
    var width = 960;
    var height = 500;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // calculate dimensions without margins
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

    // read in our data
    d3.csv('data/Teams.csv', function(error, data) {
        // handle read errors
        if (error) {
            console.error('failed to read data');
            return;
        }

        console.log('raw', data);

        // coerce data to numeric
        var parseTime = d3.timeParse('%Y');

        data.forEach(function(d) {
            d.W = +d.W;
            d.date = parseTime((+d.yearID).toString());
        });

        // filter data
        data = data.filter(d => {
            return d.name === 'New York Yankees' || d.name === 'Boston Red Sox';
        });

        console.log('clean', data);

        // scales
        var x = d3
            .scaleTime()
            .domain(
                d3.extent(data, function(d) {
                    return d.date;
                })
            )
            .range([0, innerWidth]);

        console.log(x.domain(), x.range());

        var y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, function(d) {
                    return d.W;
                }) + 5
            ])
            .range([innerHeight, 0]);

        console.log(y.domain(), y.range());

        // axes
        var xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(10));

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

        // line generator
        var line = d3
            .line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.W);
            });
        // .defined(function(d) {
        //     return +d.yearID !== 1994 && +d.yearID !== 1995;
        // });

        // // add line
        // g
        //     .append('path')
        //     .datum(data)
        //     .attr('class', 'win-line')
        //     .attr('fill', 'none')
        //     .attr('stroke', 'blue')
        //     .attr('stroke-width', 1.5)
        //     .attr('d', line);

        // // add points
        // g
        //     .selectAll('.win-point')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .attr('class', 'win-point')
        //     .attr('fill', 'blue')
        //     .attr('stroke', 'none')
        //     .attr('cx', function(d) {
        //         return x(d.date);
        //     })
        //     .attr('cy', function(d) {
        //         return y(d.W);
        //     })
        //     .attr('r', 2);

        // multiple lines
        var teams = ['New York Yankees', 'Boston Red Sox'];
        var colors = ['blue', 'red'];

        var colorScale = d3
            .scaleOrdinal()
            .domain(teams)
            .range(colors);

        var groups = g
            .selectAll('.team')
            .data(teams)
            .enter()
            .append('g')
            .attr('class', 'team');

        groups
            .append('path')
            .datum(function(d) {
                return data.filter(function(r) {
                    return r.name === d;
                });
            })
            .attr('class', 'win-line')
            .attr('fill', 'none')
            .attr('stroke', function(d) {
                return colorScale(d[0].name);
            })
            .attr('stroke-width', 1.5)
            .attr('d', line);

        groups
            .selectAll('.win-point')
            .data(function(d) {
                return data.filter(function(r) {
                    return r.name === d;
                });
            })
            .enter()
            .append('circle')
            .attr('class', 'win-point')
            .attr('fill', function(d) {
                return colorScale(d.name);
            })
            .attr('stroke', 'none')
            .attr('cx', function(d) {
                return x(d.date);
            })
            .attr('cy', function(d) {
                return y(d.W);
            })
            .attr('r', 2);

        // axis labels
        g
            .append('text')
            .attr('class', 'x-axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 30)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'hanging')
            .text('Season');

        g
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -30)
            .attr('y', innerHeight / 2)
            .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ')')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .text('Wins');

        // title
        g
            .append('text')
            .attr('class', 'title')
            .attr('x', innerWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 24)
            .text('Year-by-Year Wins');
    });
}

buildChart('#chart-holder');
