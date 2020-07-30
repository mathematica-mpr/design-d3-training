function buildChart(containerId) {
    // read in our data
    d3.json('data/climate.json', function(error, data) {
        // handle read errors
        if (error) {
            console.error('failed to read data');
            return;
        }

        console.log('raw', data);

        // coerce data to numeric 
        data.forEach(function(d) {
            d.temp = +d.temp;
            d.year = +d.year;
        });

        //var parser = d3.timeParse("%Y");
        //data.year = parser(data.year);

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
                    return d.year;
                })
            )
            .range([0, innerWidth])
            .padding(0.4);

        console.log(x.domain(), x.range());

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

        //console.log(y.domain(), y.range());

        // axes
        var decades = x.domain().filter(function(d, i) { return !(i % 10); })
        var xAxis = d3.axisBottom(x)
            .tickValues(decades)

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
        var colors = d3.scaleLinear()
            .domain(decades)
            .range(["01015c", "#00008b","#17008b", "#2e008b",
                    "#5d008b", "#74008b", "#8b008b", "#8b0074",
                    "#8b005d", "#8b0045" ,"#8b002e", "#8b0017", 
                    "#8b0000", "#6e0301"]);
        console.log(colors)

        g
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr("fill", data=>colors(data.year))
            /*.attr("fill", function(d) {
                if (d.temp <= 0) {
                  return "red";
                } else  {
                  return "steelblue";
                }
              })*/
            .attr('x', function(d) {
                return x(d.year);
            })
            .attr('y', (d) => y(Math.max(0, d.temp)))
            .attr('width', x.bandwidth())
            .attr('height', d => Math.abs(y(d.temp) - y(0)))
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

