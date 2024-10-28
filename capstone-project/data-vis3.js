export function createChart(elementId) {
    d3.select(elementId).select('svg').remove();

    // svg.node().update();

    const frame = document.getElementById('frame');
    const style = window.getComputedStyle(frame);

    // container dimensions
    const height = parseFloat(style.height);
    const width = parseFloat(style.width);
    // create svg element
    const svg = d3.select(elementId).selectChild('#chart')
        .append('svg')
        .attr('height', height)
        .attr('width', width);
    
    const margins = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };
    // create inner group element
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;
    const g = svg
        .append('g')
        .attr('transform', `translate(${margins.left}, ${margins.top})`)
        .attr('class', 'svg-group')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('height', innerHeight)
        .attr('width', innerWidth);
    
    const radioButtons = Array.from(document.getElementsByName('filter'));
    
    const toolTip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', 3)
        .style('visibility', 'hidden')
        .style('background', '#fff')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.1)');

    d3.json('counties-10m.json').then((us) => {
        d3.csv('data1.csv').then((data) => {
            data.forEach((d) => {
                d.SAIPE_PCT_POV_0_17 = +d.SAIPE_PCT_POV_0_17 / 100;
                d.ACS_PCT_LT_HS = +d.ACS_PCT_LT_HS / 100;
                d.COUNTYFIPS = d.COUNTYFIPS.replace(' County', '');
            });
            const geoJSON = topojson.feature(us, us.objects.counties);

            radioButtons.forEach(button => {
                button.addEventListener('change', _ => {
                    console.log('radio button change');
                    const activeButton = radioButtons.find(button => button.checked);
                    d3.select('g').selectChildren('g').remove();
                    draw(geoJSON, data, activeButton.id);
                });
            });

            draw(geoJSON, data);
        });
    });

    const draw = (geoJSON, data, filter='ACS_PCT_LT_HS') => {
        const chartMargins = {
            top: 60,
            right: 40,
            bottom: 40,
            left: 40,
        };

        const graph = g.append('g')
            .attr('class', 'graph')
            .attr('transform', `translate(${chartMargins.left}, ${chartMargins.top})`)
            .attr('height', g.attr('height') -  chartMargins.top - chartMargins.bottom)
            .attr('width', g.attr('width') - chartMargins.left - chartMargins.right);

        let interpolator = null;
        let title = null;
        switch(filter) {
            case 'ACS_PCT_LT_HS':
                interpolator = d3.interpolateBlues;
                title = ['Percentage of Population', 'w/out a High School Education Across NY (2020)'];
                break;
            case 'SAIPE_PCT_POV_0_17':
                interpolator = d3.interpolateOranges;
                title = ['Percentage of Population', 'in Poverty Across NY (2020)'];
                break;
        }
        const colorScale = d3.scaleSequential()
            .domain([0,.35])
            .interpolator(interpolator);
        
        const legendBackground = g.append('g')
            .attr('transform', `translate(${graph.attr('width') - 160}, 46)`);
        legendBackground.append('rect')
            .attr('width', 218)
            .attr('height', 45)
            .attr('fill', '#f0f0f0')
            .attr('stroke', 'gray');
        
        const legend = d3.legendColor()
            .cells(5)
            .shapeWidth(40)
            .scale(colorScale)
            .orient('horizontal')
            .labelFormat('.0%')
            .labelAlign('middle');

        g.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${graph.attr('width') - 155}, 50)`)
            .call(legend);

        g.append('g')
            .attr('class', 'title-container')
            .attr('transform', `translate(${(graph.attr('width')) / 2 - 275}, 30)`)
            .attr('font-size', 20);
            d3.select(elementId).select('.title-container').selectAll('text')
            .data(title)
            .join('text')
            .text(d => d)
            .attr('y', (_, i) => i * 22);
        
        
        const projection = d3.geoAlbersUsa()
        .fitExtent([
            [0, 0],
            [graph.attr('width')*6.65, graph.attr('height')*6.65]
            // [graph.attr('width')*7.6, graph.attr('height')*7.6] // for inspect view and dev work
        ], geoJSON);
        const path = d3.geoPath().projection(projection);

        const ny = geoJSON.features.filter(county => 
            county.id.slice(0,2) === '36'
        );

        const map = graph.append('g')
            .attr('transform', 'translate(-4700,-500)');
            // .attr('transform', 'translate(-2900,-720)'); // for inspect view and dev work
        map.selectAll('path')
            .data(ny)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', feature => {
                const currCounty = data.find(county =>
                    county.COUNTYFIPS === feature.properties.name
                );
                return colorScale(currCounty[`${filter}`]);
            })
            .attr('stroke', 'black')
            .attr('stroke-width', '.1')
            .on('mouseover', (event, feature) => {
                map.selectAll('path')
                    .attr('fill', 'grey');
                d3.select(event.currentTarget)
                .attr('fill', feature => {
                    const currCounty = data.find(county =>
                        county.COUNTYFIPS === feature.properties.name
                    );
                    return colorScale(currCounty[`${filter}`]);
                });

                let env = "";
                const d = data.find(county =>
                    county.COUNTYFIPS === feature.properties.name
                );
                const inhabitantsPerSquareKm = d.ACS_TOT_POP_WT / d.AREA;
                if (inhabitantsPerSquareKm > 1500 && d.ACS_TOT_POP_WT > 50000)
                    env = "City";
                else if (inhabitantsPerSquareKm > 300 &&  d.ACS_TOT_POP_WT > 5000)
                    env = "Town";
                else env = "Rural";

                toolTip.style('visibility', 'visible')
                    .html(
                        `<strong>${d.COUNTYFIPS} County</strong><br>
                        Percent of pop. with less than high school education (ages >= 25): ${(d.ACS_PCT_LT_HS * 100).toFixed(2)}%<br>
                        Percentage of pop. in poverty (ages 0-17): ${(d.SAIPE_PCT_POV_0_17*100).toFixed(2)}%<br>
                        Population: ${d.ACS_TOT_POP_WT}<br>
                        Size: ${d.AREA} km²<br>
                        Area Type: ${env}`
                    )
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 20}px`)
                    .style('font-size', '12px');
            })
            .on('mousemove', event => {
                toolTip.style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 20}px`);
            })
            .on('mouseout', _ => {
                map.selectAll('path')
                    .attr('fill', feature => {
                        const currCounty = data.find(county =>
                            county.COUNTYFIPS === feature.properties.name
                        );
                    return colorScale(currCounty[`${filter}`]);
                    });
                toolTip.style('visibility', 'hidden');
            });
    }
    return svg.node();
}

