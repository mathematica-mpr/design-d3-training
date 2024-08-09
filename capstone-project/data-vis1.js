export function createChart(elementId) {
    d3.select(elementId).select('svg').remove();

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

    const countyToolTip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', 3)
        .style('visibility', 'hidden')
        .style('background', '#fff')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.1)');
    // read in data
    d3.csv('data1.csv').then(data => {
        // tidy data
        data.forEach(d => {
            d.SAIPE_PCT_POV_0_17 = +d.SAIPE_PCT_POV_0_17/100;
            d.ACS_PCT_LT_HS = +d.ACS_PCT_LT_HS/100;
            d.COUNTYFIPS = d.COUNTYFIPS.split(" ")[0];
        });

        const chartMargins = {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
        };
        const graph = g.append('g')
            .attr('class', 'graph')
            .attr('transform', `translate(${chartMargins.left}, ${chartMargins.top})`)
            .attr('height', g.attr('height') -  chartMargins.top - chartMargins.bottom)
            .attr('width', g.attr('width') - chartMargins.left - chartMargins.right);
        
        const y = d3.scaleLinear()
            .domain([0, .35])
            .range([graph.attr('height'), 0]);
            
        const x = d3.scaleBand()
            .domain(data.map(d => d.COUNTYFIPS))
            .rangeRound([0, graph.attr('width')])
            .padding(.3);

        const subgroups = data.columns.slice(1,3);
        const xSubGroup = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding(.01);

        const scaleOrdinal = d3.scaleOrdinal()
            .domain(subgroups)
            .range(d3.schemeTableau10);

        const bottomAxis = graph.append('g')
            .attr('transform', `translate(0,${graph.attr('height')})`)
            .call(
                d3.axisBottom(x)
                .tickFormat('')
                .tickSize(0)
            );
        bottomAxis.append('text')
            .attr('font-size', 15)
            .attr('x', graph.attr('width') / 2)
            .attr('y', 25)
            .style('fill', 'black')
            .text('New York Counties');

        graph.append('g')
            .call(
                d3.axisLeft(y)
                .ticks(5, "%")
            );

        const legendHeight = 30;
        const legendSpacing = 2;
        const legendBlockNum = scaleOrdinal.domain().length;
        const legendBlockSize = (legendHeight - ((legendBlockNum - 1) * legendSpacing)) / legendBlockNum;

        const legendBackground = g.append('g')
            .attr('transform', `translate(${graph.attr('width') - 130}, 51)`);

        legendBackground.append('rect')
            .attr('width', 208)
            .attr('height', legendHeight + 8)
            .attr('fill', '#f0f0f0')
            .attr('stroke', 'gray');

        const legend = g.append('g')
            .attr('transform', `translate(${graph.attr('width') - 125}, 55)`);

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
            .style('font-size', legendBlockSize * .6)
            .style('fill', 'black')
            .attr('x', legendBlockSize + 4)
            .attr('y', (_, i) => i * (legendBlockSize+legendSpacing) + 5)
            .text(d => {
                if(d === "ACS_PCT_LT_HS")
                    return "Percentage w/ Less than High School Education";
                else return "Percentage of Pop. in Poverty"
            });

        const title = [
            'Relationship Between Percentage of Children w/ Less than High School Education',
            'and Percentage of Children in Poverty across New York State (2020)'
        ];
        g.append('g')
            .attr('class', 'title-container')
            .attr('transform', `translate(${(graph.attr('width')) / 2}, 25)`)
            .attr('font-size', 20);
        d3.select(elementId).select('.title-container').selectAll('text')
            .data(title)
            .join('text')
            .text(d => d)
            .attr('y', (_, i) => i * 22);

        
        const radioButtons = Array.from(document.getElementsByName('sort'));
        radioButtons.forEach(button => {
            button.addEventListener('change', _ => {
                const activeButton = radioButtons.find(button => button.checked);
                switch(activeButton.id) {
                    case "sort-ascending":
                        data = d3.sort(data, county => county.ACS_PCT_LT_HS + county.SAIPE_PCT_POV_0_17);
                        break;
                    case "sort-county":
                        data = d3.sort(data, county => county.COUNTYFIPS);
                        break;
                    case "sort-descending":
                        data = d3.reverse(d3.sort(data, county => county.ACS_PCT_LT_HS + county.SAIPE_PCT_POV_0_17));
                        break;
            }
            x.domain(data.map(d => d.COUNTYFIPS));
            svg.node().update();
            });
        });

        svg.node().update = _ => {
            console.log('New Domain...');
            console.log(x.domain());
            const t = svg.transition()
                .duration(1500);
        
            const barGroups = graph.selectAll('g.bar-group')
                .data(data)
                .join(
                    enter => enter.append('g')
                        .attr('class', 'bar-group')
                        .attr('transform', d => `translate(${x(d.COUNTYFIPS)}, 0)`)
                        .on('mouseover', (event, d) => {
                            graph.selectAll('rect')
                                .attr('fill', '#E8E8E8');
                            d3.select(event.currentTarget).selectAll('rect')
                                .attr('fill', d => scaleOrdinal(d.key))
                                    .attr('x', d => xSubGroup(d.key) - 2)
                                    .attr('y', d => y(d.value) - 2)
                                    .attr('width', xSubGroup.bandwidth() + 2)
                                    .attr('height', d => graph.attr('height') - y(d.value) + 2);
                                
                            let env = "";
                            const inhabitantsPerSquareKm = d.ACS_TOT_POP_WT / d.AREA;
                            if (inhabitantsPerSquareKm > 1500 && d.ACS_TOT_POP_WT > 50000)
                                env = "City";
                            else if (inhabitantsPerSquareKm > 300 &&  d.ACS_TOT_POP_WT > 5000)
                                env = "Town";
                            else env = "Rural";

                            countyToolTip.style('visibility', 'visible')
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
                            countyToolTip.style('left', `${event.pageX + 10}px`)
                                .style('top', `${event.pageY - 20}px`);
                        })
                        .on('mouseout', event => {
                            graph.selectAll('rect')
                                .attr('fill', d => scaleOrdinal(d.key));
                            d3.select(event.currentTarget).selectAll('rect')
                                    .attr('x', d => xSubGroup(d.key))
                                    .attr('y', d => y(d.value))
                                    .attr('width', xSubGroup.bandwidth())
                                    .attr('height', d => graph.attr('height') - y(d.value));
                            countyToolTip.style('visibility', 'hidden');
                        }),
                    update => update,
                    exit => exit.remove()
                );
            barGroups.selectAll('rect')
                .data(d => subgroups.map(key => {return {key: key, value: d[key]}}))
                .join(
                    enter => enter.append('rect')
                        .attr('x', d => xSubGroup(d.key))
                        .attr('y', d => y(d.value))
                        .attr('width', xSubGroup.bandwidth())
                        .attr('height', d => graph.attr('height') - y(d.value))
                        .attr('fill', d => scaleOrdinal(d.key))
                        .style("mix-blend-mode", "multiply"),
                    update => update.transition(t)
                        .attr('x', d => xSubGroup(d.key))
                        .attr('y', d => y(d.value))
                        .attr('width', xSubGroup.bandwidth())
                        .attr('height', d => graph.attr('height') - y(d.value)),
                    exit => exit.remove()
                );
            
            d3.selectAll('g.bar-group')
                
            barGroups.transition(t)
                .attr('transform', d =>
                    `translate(${x(d.COUNTYFIPS)}, 0)`);
        }
        svg.node().update();
    });
    return svg.node();
}