function createMap(elementId) {
    // container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
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

    let geoJson;
    let stations;
    let nonNullStations;
    let elevScale;
    let stationColorKey;

    // read in data
    Promise.all([
        d3.json('us-states.json'),
        d3.csv('NSRDB_StationsMeta.csv', d3.autoType)
    ]).then(function ([geoJSONData, stationData]) {
        geoJson = geoJSONData;
        stations = stationData;
        draw();
    });

    function draw() {
        const projection = d3.geoAlbersUsa().fitSize([innerWidth, innerHeight], geoJson);
        const path = d3.geoPath().projection(projection);

        // Draw states
        g.selectAll("path")
            .data(geoJson.features)
            .join("path")
            .attr("d", path)
            .attr("fill", "#ddd")
            .style("stroke", "#000000");

        // Process data on stations
        nonNullStations = stations.map(d => ({
            usaf: +d.USAF,
            stationClass: +d.CLASS,
            elevation: +d['NSRDB_ELEV (m)'],
            loc: [+d.longitude, +d.latitude]
        })).filter(s => projection(s.loc) != null);

        const stationClasses = [...new Set(nonNullStations.map(d => d.stationClass))];
        elevScale = d3.scaleLinear()
            .domain(d3.extent(nonNullStations, d => d.elevation))
            .range([2, 15]);

        stationColorKey = d3.scaleOrdinal()
            .domain(stationClasses)
            .range(d3.schemeSet2);

        // Draw stations initially
        drawStations(nonNullStations);

        // Create legend
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(30, 60)");

        const legendItem = legend.selectAll(".legend-item")
            .data(stationClasses)
            .enter().append("g")
            .attr("class", "legend-item")
            .attr("transform", (_, i) => `translate(0, ${i * 20})`);

        legendItem.append("rect")
            .attr("x", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", d => stationColorKey(d));

        legendItem.append("text")
            .attr("x", 15)
            .attr("y", 10)
            .text(d => `Class ${d}`);

        svg.append("text")
            .attr("x", (width / 2) - margins.left)
            .attr("y", margins.top / 2)
            .style("font-size", "20px")
            .text("Solar Stations in the United States");

        d3.selectAll("#checkbox-container input").on("change", updateStations);
        d3.select("#filter-button").on("click", handleFilter);
    }

    function drawStations(stations) {
        const projection = d3.geoAlbersUsa().fitSize([innerWidth, innerHeight], geoJson);

        const circles = g.selectAll(".station")
            .data(stations, d => d.usaf);

        circles.exit()
            .transition().duration(500)
            .attr("transform", `translate(0,${height})`) // move off screen down
            .style("opacity", 0)
            .remove();

        circles.enter().append("circle")
            .attr("class", "station")
            .attr("cx", d => projection(d.loc)[0])
            .attr("cy", d => -50) // start above the screen
            .attr("r", d => elevScale(d.elevation))
            .style("opacity", 0)
            .style("fill", d => stationColorKey(d.stationClass))
            .merge(circles) 
            .transition().duration(500)
            .style("opacity", 0.7)
            .attr("cx", d => projection(d.loc)[0])
            .attr("cy", d => projection(d.loc)[1]);

    }
    function drawStationsCheckbox(stations) {
        const projection = d3.geoAlbersUsa().fitSize([innerWidth, innerHeight], geoJson);
    
        const circles = g.selectAll(".station")
            .data(stations, d => d.usaf);
    
        circles.exit()
            .transition().duration(500)
            .attr("r", 0) // shrink to radius 0
            .style("opacity", 0)
            .remove();
    
        circles.enter().append("circle")
            .attr("class", "station")
            .attr("cx", d => projection(d.loc)[0])
            .attr("cy", d => projection(d.loc)[1])
            .attr("r", 0) 
            .style("opacity", 0)
            .style("fill", d => stationColorKey(d.stationClass))
            .merge(circles) 
            .transition().duration(500)
            .attr("r", d => elevScale(d.elevation)) // grow to appropriate size
            .style("opacity", 0.7)
            .attr("cx", d => projection(d.loc)[0])
            .attr("cy", d => projection(d.loc)[1]);
    }
    

    function updateStations() {
        const selectedClasses = new Set(
            d3.selectAll("#checkbox-container input:checked").nodes().map(d => +d.value)
        );

        const minElev = +d3.select("#min-elevation").property("value") || d3.min(nonNullStations, d => d.elevation);
        const maxElev = +d3.select("#max-elevation").property("value") || d3.max(nonNullStations, d => d.elevation);

        const filteredStations = nonNullStations.filter(d =>
            selectedClasses.has(d.stationClass) && d.elevation >= minElev && d.elevation <= maxElev
        );

        drawStationsCheckbox(filteredStations);
    }

    function handleFilter() {
        const minElev = +d3.select("#min-elevation").property("value");
        const maxElev = +d3.select("#max-elevation").property("value");

        if (isNaN(minElev) || isNaN(maxElev)) {
            alert('Input elevations must be numbers.');
            return;
        }

        const filteredStations = nonNullStations.filter(d =>
            d.elevation >= minElev && d.elevation <= maxElev
        );

        drawStations(filteredStations);
    }
}

createMap('#chart-container');
