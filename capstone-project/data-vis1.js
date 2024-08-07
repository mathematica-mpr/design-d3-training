function createChart(elementId) {

    const frame = document.getElementById('frame');
    const style = window.getComputedStyle(frame);

    // container dimensions
    const height = parseFloat(style.height);
    const width = parseFloat(style.width);

    const margins = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };

    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;
    console.log("innerHeight = " + innerHeight);
    console.log("innerWidth = " + innerWidth);

    // create svg element
    const svg = d3.select('#chart')
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // create inner group element
    const g = svg
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
        .attr('class', 'svg-group')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle');

    let countyToolTip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('z-index', 3)
        .style('visibility', 'hidden')
        .style('background', '#fff')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '4px')
        .style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.1)')
        .text('a simple tooltip');

    // read in air quality data
    d3.csv('data1.csv').then(data => {
        // bar chart and transitions code goes here

        // tidy data
        data.forEach(d => {
            d.SAIPE_PCT_POV = +d.SAIPE_PCT_POV/100;
            d.ACS_PCT_LT_HS = +d.ACS_PCT_LT_HS/100;
            d.COUNTYFIPS = d.COUNTYFIPS.split(" ")[0];
        });

        // need to leave room for data viz title, sort option, and legend
        const chartMargins = 40;

        let subgroups = data.columns.slice(1,3);

        const graph = g.append('g')
            .attr('transform', d => 
                `translate(${chartMargins}, ${chartMargins})`)
            .attr('height', innerHeight - 2 * chartMargins)
            .attr('width', innerWidth - 2 * chartMargins);
        
        console.log("graphHeight = " + graph.attr('height'));
        console.log("graphWidth = " + graph.attr('width'));

        const y = d3.scaleLinear()
            .domain([0, .3])
            .range([graph.attr('height'), 0]);

        const x = d3.scaleBand()
            .domain(data.map(d => d.COUNTYFIPS))
            .rangeRound([0, graph.attr('width')])
            .padding(.3);

        const xSubGroup = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding(.01);

        const scaleOrdinal = d3.scaleOrdinal()
            .domain(subgroups)
            .range(d3.schemeTableau10);

        const bottomAxis = graph.append('g')
            .attr('transform', `translate(0,${graph.attr('height')})`);
        bottomAxis.append('g')
            .call(
                d3.axisBottom(x)
                .tickFormat('')
                .tickSize(0)
            );
        bottomAxis.append('text')
            .attr('font-size', 15)
            .attr('x', graph.attr('width') / 2)
            .attr('y', 25)
            .text('New York Counties');

        const leftAxis = graph.append('g');
        leftAxis.append('g')
            .call(
                d3.axisLeft(y)
                .ticks(5, "%")
            );


        const legendHeight = 30;
        const legendSpacing = 2;
        const legendBlockNum = scaleOrdinal.domain().length;
        const legendBlockSize = (legendHeight - ((legendBlockNum - 1) * legendSpacing)) / legendBlockNum;

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

        const title = g.append('g')
        // `translate(${graph.attr('width') - 125}, 55)
            .attr('transform', `translate(${(graph.attr('width')) / 2}, 30)`)
            .attr('font-size', 20);
        title.append('text')
            .text('Relationship Between Percentage of Pop. w/ Adequate Education')
        title.append('text')
            .attr('y', 20)
            .text('and Percentage of Pop. in Poverty across New York State');

        
        const radioButtons = Array.from(document.getElementsByName('sort'));
        radioButtons.forEach(button => {
            button.addEventListener('change', _ => updateSort());
        });

        const updateSort = _ => {
            const activeButton = radioButtons.find(button => button.checked);
            switch(activeButton.id) {
                case "sort-ascending":
                    data = d3.sort(data, county => county.ACS_PCT_LT_HS + county.SAIPE_PCT_POV);
                    console.log('test');
                    break;
                case "sort-county":
                    data = d3.sort(data, county => county.COUNTYFIPS);
                    break;
                case "sort-descending":
                    data = d3.reverse(d3.sort(data, county => county.ACS_PCT_LT_HS + county.SAIPE_PCT_POV));
                    break;
            }
            x.domain(data.map(d => d.COUNTYFIPS));
            svg.node().update();
        };

        svg.node().update = _ => {
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
                            d3.select(event.currentTarget).selectAll('rect')
                                .attr('fill', 'orange');
                                
                            let env = "";
                            const inhabitantsPerSquareKm = d.ACS_TOT_POP_WT / d.AREA;
                            if (inhabitantsPerSquareKm > 1500 && d.ACS_TOT_POP_WT > 50000)
                                env = "City";
                            else if (inhabitantsPerSquareKm > 300 &&  d.ACS_TOT_POP_WT > 5000)
                                env = "Town";
                            else env = "Rural";

                            countyToolTip.style('visibility', 'visible')
                                .html(
                                    `${d.COUNTYFIPS} County<br>
                                    Percent of pop. with less than high school education (ages >= 25): ${(d.ACS_PCT_LT_HS * 100).toFixed(2)}%<br>
                                    Estimated percentage of people in poverty: ${(d.SAIPE_PCT_POV*100).toFixed(2)}%<br>
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
                            d3.select(event.currentTarget).selectAll('rect')
                                .attr('fill', d => scaleOrdinal(d.key));
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
        };
        

        updateSort();
    });
    
    return svg.node();
}

createChart('#viz1');
