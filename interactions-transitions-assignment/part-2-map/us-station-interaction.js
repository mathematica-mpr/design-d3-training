function createMap(elementId) {
    // container dimensions
    const height = 600;
    const width = 900;
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
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle');

    // read in data
    d3.json('us-states.json').then(function (geoJSONStates) {
        d3.csv('NSRDB_StationsMeta.csv').then(function (stations) {
            draw(geoJSONStates, stations);
        });
    });

    function draw(geoJson, stations) {
        const mapSpacing = {
            width: 800,
            height: 600,
            margin: 5
        };

        const projection = d3.geoAlbersUsa()
            .fitExtent([[mapSpacing.margin, mapSpacing.margin],
                [mapSpacing.width - mapSpacing.margin, mapSpacing.height - mapSpacing.margin]],
                geoJson);
        const path = d3.geoPath().projection(projection);

        const applicableStations = stations.map(d => ({
            name: d.STATION,
            class: d.CLASS,
            elevation: +d['NSRDB_ELEV (m)'],
            loc: [+d.longitude, +d.latitude]
        })).filter(s => projection(s.loc));
        
        const scaleOrdinal = d3.scaleOrdinal()
            .domain([...new Set(applicableStations.map(d => d.class))])
            .range(d3.schemeTableau10);
        
        const radiusScale = d3.scaleLinear()
            .domain([d3.min(applicableStations, station => station.elevation),
                d3.max(applicableStations, station => station.elevation)])
            .range([2, 15]);
        
        const map = g.append('g');
        map.selectAll('path')
            .data(geoJson.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', '#999999')
            .attr('stroke-width', '.5');

        map.selectAll('circle')
            .data(applicableStations)
            .join('circle')
            .style("mix-blend-mode", "multiply")
                .attr('r', d => radiusScale(d.elevation))
                .attr('cx', d => projection(d.loc)[0])
                .attr('cy', d => projection(d.loc)[1])
                .attr('fill', d => scaleOrdinal(d.class));
        
        const legendHeight = 40;
        const legendSpacing = 2;
        const legendBlockNum = scaleOrdinal.domain().length;
        const legendBlockSize = (legendHeight - ((legendBlockNum - 1) * legendSpacing)) / legendBlockNum;
          
        const legend = g.append('g')
            .attr('transform',
                `translate(${mapSpacing.width - 30}, ${mapSpacing.height / 2})`);
        legend.selectAll('rect')
            .data(scaleOrdinal.domain())
            .join('rect')
            .attr('height', legendBlockSize)
            .attr('width', legendBlockSize)
            .attr('stroke', 'black')
              .attr('y', (_, i) => i * (legendBlockSize+legendSpacing))
              .attr('fill', d => scaleOrdinal(d));
        
        legend.selectAll('text')
            .data(scaleOrdinal.domain())
            .join('text')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .style('font-size', legendBlockSize)
            .style('fill', 'black')
            .attr('x', legendBlockSize + 4)
              .attr('y', (_, i) => i * (legendBlockSize+legendSpacing))
              .text(d => d);
        
        legend.append('text')
            .style('font-size', legendBlockSize + 1)
            .style('fill', 'black')
            .attr('x', 6)
            .attr('y', -legendBlockSize)
            .text('Class');
        
        const radiusLegend = g.append('g')
            .attr('transform',
                `translate(0, ${mapSpacing.height / 2})`);
          
        radiusLegend.selectAll('circle')
            .data(radiusScale.range())
            .join('circle')
            .attr('fill', 'black')
            .attr('cy', (d, i) => i * 3 * d)
            .attr('r', d => d);
        
        radiusLegend.append('text')
            .style('font-size', 10)
            .style('fill', 'black')
            .attr('y', -radiusScale.range()[0] - 9)
            .text('Min. Elevation = ' + radiusScale.domain()[0])
        
        radiusLegend.append('text')
            .style('font-size', 10)
            .style('fill', 'black')
            .attr('y', 3 * radiusScale.range()[1] -radiusScale.range()[1] - 9)
            .text('Max. Elevation = ' + radiusScale.domain()[1]);
            
        g.append('text')
            .style('font-size', 30)
            .style('fill', 'black')
            .attr('x', mapSpacing.width / 2)
            .attr('y', 10)
            .text('Stations in the USA (Organized by Class and Elevation)');

        d3.selectAll('#class-checkbox-container input').on('change', filterByClass);
        d3.select('#elevation-submit-button').on('click', filterByElevation);
        const range = radiusScale.domain();

        const filteredData = _ => {
            const checkboxes = Array.from(document.getElementsByName('class-checkbox'));
            const checkedBoxes = checkboxes.filter(box => box.checked).map(box => box.id);
            return applicableStations
            .filter(station =>
                checkedBoxes.includes(station.class) &&
                station.elevation >= range[0] &&
                station.elevation <= range[1]
            );
        }
        function filterByClass() {
            const t = svg.transition().duration(500);
            
            const updatedDots = map.selectAll('circle')
                .data(filteredData(), d => d.name);
            updatedDots.enter()
                .append('circle')
                .style("mix-blend-mode", "multiply")
                    .attr('cx', d => projection(d.loc)[0])
                    .attr('cy', d => projection(d.loc)[1])
                    .attr('fill', d => scaleOrdinal(d.class))
                    .attr('r', 0)
                .transition(t)
                    .attr('r', d => radiusScale(d.elevation));
            updatedDots.exit()
                .transition(t)
                    .attr('r', 0)
                .remove();
        };

        function filterByElevation() {
            const inputBoxes = Array.from(document.getElementsByName('elevation-input'));
            inputBoxes.forEach((box, i) => {
                if (!(box.value.trim() === "")) range[i] = +box.value;
                else range[i] = radiusScale.domain()[i];
            });
            
            if (isNaN(range[0]) || isNaN(range[1]) || range[0] > range[1])
                alert("Input invalid");
            
            const updatedDots = map.selectAll('circle')
                .data(filteredData(), d => d.name);
            updatedDots.enter()
                .append('circle')
                .style("mix-blend-mode", "multiply")
                    .attr('cx', d => projection(d.loc)[0])
                    .attr('fill', d => scaleOrdinal(d.class))
                    .attr('r', d => radiusScale(d.elevation))
                    .attr('cy', 0)
                .transition()
                    .duration(d=> projection(d.loc)[1])
                    .delay((_,i) => i/2)
                    .attr('cy', d => projection(d.loc)[1]);
            updatedDots.exit()
                .transition()
                    .duration(d=> projection(d.loc)[1])
                    .delay((_,i) => i/2)
                    .attr('cy', height)
                .remove();
        };
        return svg.node();
    }
}

createMap('#chart-container');
