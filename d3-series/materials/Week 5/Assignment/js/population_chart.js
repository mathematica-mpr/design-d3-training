function buildChart(containerId) {
    // read in our data
    /*
     Use `pop.json` to create a multi-line  chart that shows pop by country. Your chart should meet the following criteria:
    - Use a D3 time scale for x axis and d3 linear scale for y axis
    - There should be two lines on the chart one representing each country. In addition, you should write your render code in a way that could scale to 15 countries easily. You should not use a for loop and you should not have to rely on copying and pasting code.
    - Each line should be its own color and the chart should be accompanied by a legend indicating which line represents which country. 
    - The chart should have a title, axes, and axis labels
    */ 
   d3.json('data/population.json', function(error, data) {
    if (error) {
        console.error('failed to read data');
        return;
    }
        console.log('raw', data);

        // filter out 2017 b/c pop is null
        data = data.filter(function(d){
            return d.year != "January-2017"
        });

        // coerce data to correct format 
        var parser = d3.timeParse("%B-%Y");
        data.forEach(function(d) {
            d.county = d.country;
            d.pop = +d.pop;
            d.year = parser(d.year);
        });

        console.log('clean', data);
 
        // nest data
        var nested = d3.nest() 
            .key(function(d) { return d.country;})
            .entries(data);

        console.log('nested', nested);

        // size globals
        var margin = {
            top: 50,
            right: 80,
            bottom: 50,
            left: 120
        };

        // calculate dimensions
        var width = 1000;
        var height = 500;
        var innerWidth = width - margin.left - margin.right;
        var innerHeight = height - margin.top - margin.bottom;
    
        // create svg element
        var g = d3.select(containerId)
                  .append('svg')
                  .attr('height', height)
                  .attr('width', width)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
         // scales
         var x = d3.scaleTime()
                  .domain(d3.extent(data, function(d) { 
                      return d.year; 
                    }))
                  .range([0, innerWidth]) ;
    
        var y = d3.scaleLinear()
                  .domain([
                     0,
                     d3.max(data, function(d) {
                         return d.pop*1.05;
                     })
                  ])
                  .range([innerHeight, 0]);
        
        // axes
        var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y"))
        
        g
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + innerHeight + ')')
            .call(xAxis.ticks(d3.timeYear, 1))
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

        // colors
        var countries = data.map(function(d){ return d.key })
        var color= d3.scaleOrdinal()
            .domain(countries)
            .range(["#E69F00", "#009E73"]);

       // add lines
       var popLine = d3.line()
                       .x(function(d) { return x(d.year); })
                       .y(function(d) { return y(d.pop); })
                
       g.selectAll(".line")
           .data(nested) //, function(d) { return d.key; }
           .enter()
           .append("path")
             .attr("fill", "none")
             .attr("stroke", function(d){ return color(d.key) })
             .attr("stroke-width", 1.5)
             .attr("d", function(d){ return popLine(d.values);});

        // axis labels
        g
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -45)
            .attr('y', innerHeight / 2 - 75)
            .attr('transform', 'rotate(-90,-30,' + innerHeight / 2 + ')')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 14)
            .text('Population');

        // title
        g
            .append('text')
            .attr('class', 'title')
            .attr('x', innerWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'baseline')
            .style('font-size', 20)
            .text('Country Population, by Year');
    });
}

buildChart('#population-chart');

