var processingSpeedLoaded = false;
Reveal.addEventListener( 'processing-speed', function() {
    if (!processingSpeedLoaded) {
        var data = [
            { year: "2000", sales: 45 },
            { year: "2001", sales: 56 },
            { year: "2002", sales: 36 },
            { year: "2003", sales: 58 },
            { year: "2004", sales: 75 },
            { year: "2005", sales: 62 }
        ];

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var parseTime = d3.timeParse("%Y");

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var valueline = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.sales); });

        var svg = d3.select(".processing-speed .viz").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function(d) {
            d.year = parseTime(d.year);
        });

        console.log(data)

        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain([0, d3.max(data, function(d) { return d.sales; })]);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Sales ($)");

        processingSpeedLoaded = true;
    }
});
