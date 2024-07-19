function createMap(elementId) {
    // container dimensions
    const height = 600;
    const width = 1000;
    const margins = {
        top: 50,
        right: 50,
        bottom: 100,
        left: 50,
    };

    // create svg element
    const svg = d3.select(elementId).append('svg').attr('height', height).attr('width', width);

    // create inner group element
    const g = svg
        .append('g')
        .attr('class', 'svg-group')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
    let stations;
    // read in data
    d3.json('us-states.json').then(function (geoJSONStates) {
        d3.csv('NSRDB_StationsMeta.csv', function(d) {
            return {
                stationClass: +d.CLASS,
                abb: d.ST,
                elevation: +d['NSRDB_ELEV (m)'],
                loc: [+d.longitude, +d.latitude]
            };
        }).then(function (loadedStations) {
            stations = loadedStations;
            draw(geoJSONStates, stations);
        });
    });

    function draw(geoJson, stations) {
        const projection = d3.geoAlbersUsa();
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        const radiusScale = d3.scaleLinear()
            .domain(d3.extent(stations, d => d.elevation))
            .range([2, 15]);
        const classes = [1, 2, 3];

        g.selectAll("path")
            .data(geoJson.features)
            .join("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("stroke", "#222222")
            .attr("stroke-width", "1")
            .attr("fill", "#d3d3d3");
        // part 1
        classes.forEach(function (classNum) {
            d3.select("#class" + classNum).on("change", function () {
                if (this.checked) {
                    g.selectAll("circle.class" + classNum)
                        .data(stations.filter(d => d.stationClass === classNum), d => d.loc)
                        .join(
                            enter => enter.append("circle")
                                .attr("class", "class" + classNum)
                                .filter(d => projection(d.loc))
                                .attr("cx", d => projection(d.loc) ? projection(d.loc)[0] : null)
                                .attr("cy", d => projection(d.loc) ? projection(d.loc)[1] : null)
                                .attr("r", 0) 
                                .attr("fill", d => colorScale(d.stationClass))
                                .attr("opacity", 0.6)
                                .transition() 
                                .attr("r", d => radiusScale(d.elevation)),
                            update => update,
                            exit => exit.transition() 
                                .attr("r", 0)
                                .remove()
                        );
                } else {
                    g.selectAll("circle.class" + classNum)
                        .transition()
                        .duration(1000)
                        .attr("r", 0)
                        .remove(); 
                }
            }).dispatch("change");
        });
        // part 2
        d3.select("#filter-button").on("click", function () {
            let minElevation = parseFloat(d3.select("#min-elevation").node().value);
            let maxElevation = parseFloat(d3.select("#max-elevation").node().value);
    
            if (isNaN(minElevation) || isNaN(maxElevation)) {
                alert("Please enter a number in both min and max elevation");
                return;
            }
            if (!minElevation && minElevation !== 0) {
                minElevation = d3.min(stations, d => d.elevation);
            }
            if (!maxElevation && maxElevation !== 0) {
                maxElevation = d3.max(stations, d => d.elevation);
            }

            const filteredStations = stations.filter(d => d.elevation >= minElevation && d.elevation <= maxElevation);

            const circles = g.selectAll("circle")
                .data(filteredStations, d => d.loc);

            circles.enter().append("circle")
                .attr("class", d => "class" + d.stationClass)
                .attr("cx", d => projection(d.loc) ? projection(d.loc)[0] : null) 
                .attr("r", d => radiusScale(d.elevation)) 
                .attr("fill", d => colorScale(d.stationClass))
                .attr("opacity", 0.6)
                .transition() 
                .duration(1000)
                .attr("cy", d => projection(d.loc) ? projection(d.loc)[1] : null); 

            circles.exit()
                .transition()
                .duration(1000)
                .attr("cy", height) 
                .remove();
        });
        // labels and legend
        g.append("text")
            .attr("x", width / 2)
            .attr("y", margins.top - 70)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("US Map with Solar Stations");

        g.append("text")
            .attr("x", width / 2)
            .attr("y", margins.top - 50)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .text("The radius of each dot is encoded to the elevation of the station");

        const legend = svg.selectAll(".legend")
            .data(colorScale.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => "translate(0," + (20 * i) + ")");

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colorScale);  

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(d => "Class " + d);  
    }    
}

createMap('#chart-container');
