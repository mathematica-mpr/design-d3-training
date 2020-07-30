
function buildChart(containerId) {
    // read in our data
   d3.csv('data/NSRDB_StationsMeta.csv', function(error, data){
        if (error) {
            console.error('failed to read data');
            return;
        }
        d3.json('data/us-states.json', function(error, json){
            if (error) {
                console.error('failed to read json data');
                return;
            }

            data.forEach(function(d) {
                d.latitude = +d.latitude;
                d.longitude = +d.longitude;
                d.elev = +d['NSRDB_ELEV (m)'];
            });
            console.log('data', data);
            console.log('json', json);

            // define projection
            var projection = d3.geoAlbersUsa();
            var path = d3.geoPath().projection(projection);

            // size globals
            var margin = {
                top: 50,
                right: 80,
                bottom: 50,
                left: 120
            };

            var width = 1000;
            var height = 800;
            var innerWidth = width - margin.left - margin.right;
            var innerHeight = height - margin.top - margin.bottom;
        
            var g = d3.select(containerId)
                      .append('svg')
                      .attr('height', height)
                      .attr('width', width)
                      .append('g')
                      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // title
            g
                .append('text')
                .attr('class', 'title')
                .attr('x', innerWidth / 2)
                .attr('y', 0)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'baseline')
                .style('font-size', 20)
                .text('Solar Stations');

            // add json
            g.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .style("fill", "#FFFFFF")
               .style("stroke", "#000000")
               .style("stroke-width", 2);
         
            // add points
            var minElev = Math.floor(d3.min(data, function(d) { return d.elev; })/100)*100
            var meanElev = Math.ceil(d3.mean(data, function(d) { return d.elev; })/100)*100
            var maxElev = Math.ceil(d3.max(data, function(d) { return d.elev; })/100)*100

            var scale = d3.scaleLinear()
                .domain([minElev, maxElev])
                .range([ 0, 20]);

            g.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d) {if(projection([d.longitude, d.latitude])) {
                 return projection([d.longitude, d.latitude])[0];
                 } else {
                   return null;
                 }})
                 .attr("cy", function(d) {if(projection([d.longitude, d.latitude])){
                 return projection([d.longitude, d.latitude])[1];
                 } else{
                   return null; 
                 }})
               .attr("r", function(d) {return scale(d.elev)})
               .style("fill", "#FFC145")
               .style("opacity", function(d) {
                   // hide points that don't project; is there a better way to do this...?
                    if(projection([d.longitude, d.latitude])) {
                        return 0.8
                    } else{
                        return 0
                    }
               })
               .style("stroke", "black")

            // add legend using d3-legend module legendSize
            g.append("g")
                .attr("class", "legendSize")
                .style("fill", "#FFC145")
                .style("stroke", "black")
		        .attr("transform", "translate("+innerWidth/2+", "+(innerHeight-30)+")");             

		    var legendSize = d3.legendSize()
		      .scale(scale)
		      .shape('circle')
		      .shapePadding(50)
              .labelOffset(20)
              .cells(3) // min is so small it doesn't show up! :(
              .labels([minElev,meanElev,maxElev])
              .title("Station Elevation (m)")
		      .orient('horizontal');
    
		    g.select(".legendSize")
		      .call(legendSize);
                         
        });
    });    
}



buildChart('#solar-stations');
