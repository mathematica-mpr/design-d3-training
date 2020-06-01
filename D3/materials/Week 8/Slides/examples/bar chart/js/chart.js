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
    d3.csv('data/wins.csv', function(error, data) {
        // handle read errors
        if (error) {
            console.error('failed to read data');
            return;
        }

        console.log('raw', data);

        // coerce data to numeric
        data.forEach(function(d) {
            d.wins = +d.wins;
        });

        console.log('clean', data);

        // scales
        var x = d3
            .scaleBand()
            .domain(
                data.map(function(d) {
                    return d.team;
                })
            )
            .range([0, innerWidth])
            .padding(0.2);

        console.log(x.domain(), x.range());

        var y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, function(d) {
                    return d.wins;
                })
            ])
            .range([innerHeight, 0]);

        console.log(y.domain(), y.range());

        // axes
        var xAxis = d3.axisBottom(x);

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
        g
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) {
                return x(d.team);
            })
            .attr('y', function(d) {
                return y(d.wins);
            })
            .attr('width', x.bandwidth())
            .attr('height', function(d) {
                return innerHeight - y(d.wins);
            })
            .attr('fill', 'steelblue')
            .attr('stroke', 'none');

        // axis labels
        g
            .append('text')
            .attr('class', 'x-axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 30)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'hanging')
            .text('Team');

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
            .text('Wins for AL East Teams in 1998');

        // transition
        d3.select('#win-loss-select').on('input', function() {
            var winOrLoss = this.value;

            g
                .selectAll('.bar')
                .transition()
                .duration(1000)
                .attr('y', function(d) {
                    return y(d[winOrLoss]);
                })
                .attr('height', function(d) {
                    return innerHeight - y(d[winOrLoss]);
                })
                .attr('fill', function() {
                    if (winOrLoss === 'wins') {
                        return 'steelblue';
                    } else {
                        return '#C62D42';
                    }
                });
        });
    });
}

buildChart('#chart-holder');
