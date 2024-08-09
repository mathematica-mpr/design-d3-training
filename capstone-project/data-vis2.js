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

    // read in data
    d3.csv('data2.csv').then(data => {
        // tidy data
        data.reverse();
        const parseYear = d3.timeParse('%Y');
        const formatYear = d3.timeFormat('%Y');
        data.forEach(d => {
            d.SAIPE_PCT_POV_0_17 = +d.SAIPE_PCT_POV_0_17/100;
            d.ACS_PCT_LT_HS = +d.ACS_PCT_LT_HS/100;
            d.YEAR = parseYear(d.YEAR);
        });

        const subgroups = data.columns.slice(1);
        const scaleOrdinal = d3.scaleOrdinal()
            .domain(subgroups)
            .range(d3.schemeTableau10);

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

        const [firstYear, lastYear] = d3.extent(data, d => d.YEAR);
        const x = d3.scaleTime()
            .domain([firstYear, lastYear])
            .range([0, graph.attr('width')]);

        const maxPercent = d3.max(
            [d3.max(data, d => d.ACS_PCT_LT_HS),
            d3.max(data, d => d.SAIPE_PCT_POV_0_17)]
        );
        const y = d3.scaleLinear()
            .domain([0, maxPercent + .1])
            .range([graph.attr('height'), 0]);
        
        graph.selectAll('lines.x')
            .data(d3.map(data, d => d.YEAR))
            .join('line')
            .style('stroke-width', 1)
            .style('stroke', '#E8E8E8')
            .attr('x1', d => x(d))
            .attr('x2', d => x(d))
            .attr('y1', 20)
            .attr('y2', graph.attr('height'));
        graph.selectAll('lines.y')
            .data(Array.from({length: Math.floor(y.domain()[1] * 100 / 5)}, (_, i) => (i + 1) * 5))
            .join('line')
            .style('stroke-width', 1)
            .style('stroke', '#E8E8E8')
            .attr('x1', 0)
            .attr('x2', graph.attr('width'))
            .attr('y1', d => y(d/100))
            .attr('y2', d => y(d/100));

        const xAxis = graph.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${graph.attr('height')})`)
            .call(d3.axisBottom(x));
        xAxis.append('text')
            .attr('font-size', 15)
            .attr('x', graph.attr('width') / 2)
            .attr('y', 35)
            .style('fill', 'black')
            .text('Years');
        
        graph.append('g')
            .call(
                d3.axisLeft(y)
                .ticks(5, "%")
            );

        const lines = [
            {
                key: 'ACS_PCT_LT_HS',
                line: d3.line()
                    .x(d => x(d.YEAR))
                    .y(d => y(d.ACS_PCT_LT_HS))
            },
            {
                key: 'SAIPE_PCT_POV_0_17',
                line: d3.line()
                    .x(d => x(d.YEAR))
                    .y(d => y(d.SAIPE_PCT_POV_0_17))
            }
        ];
            
        lines.forEach(({key, line}) => {
            graph.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', scaleOrdinal(key))
                .attr('stroke-width', 1.5)
                .attr('d', line)
                .call(path =>
                    path.transition()
                        .duration(2000)
                        .ease(d3.easeLinear)
                        .attrTween('stroke-dasharray', function() {
                            const length = this.getTotalLength();
                            return d3.interpolate(`0,${length}`, `${length},${length}`);
                        })
                    );
        });
        
        const circleConfigs = [
            {
                key: 'ACS_PCT_LT_HS',
                tooltipHtml: d => `
                    <strong>${formatYear(d.YEAR)}</strong><br>
                    Percent of pop. w/ less than high school education (ages >= 25): ${(d.ACS_PCT_LT_HS * 100).toFixed(2)}%`
            },
            {
                key: 'SAIPE_PCT_POV_0_17',
                tooltipHtml: d => `
                    <strong>${formatYear(d.YEAR)}</strong><br>
                    Percentage of pop. in poverty (ages 0-17): ${(d.SAIPE_PCT_POV_0_17 * 100).toFixed(2)}%`
            }
        ];
            
        circleConfigs.forEach(({key, tooltipHtml}) => {
            graph.selectAll(`circle.${key}`)
                .data(data)
                .join('circle')
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('r', 6)
                .attr('fill', scaleOrdinal(key))
                .attr('cx', d => x(d.YEAR))
                .attr('cy', d => y(d[key]))
                .on('mouseover', (event, d) => {
                    d3.select(event.currentTarget).attr('fill', 'black');
                    toolTip.style('visibility', 'visible')
                        .html(tooltipHtml(d))
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 20}px`)
                        .style('font-size', '12px');
                })
                .on('mousemove', event => {
                    toolTip.style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 20}px`);
                })
                .on('mouseout', event => {
                    d3.select(event.currentTarget).attr('fill', scaleOrdinal(key));
                    toolTip.style('visibility', 'hidden');
                });
            });
        
        const legendHeight = 30;
        const legendSpacing = 2;
        const legendBlockNum = scaleOrdinal.domain().length;
        const legendBlockSize = (legendHeight - ((legendBlockNum - 1) * legendSpacing)) / legendBlockNum;

        // Append a background rectangle for the legend
        const legendBackground = g.append('g')
            .attr('transform', `translate(${graph.attr('width') - 130}, 46)`);

        legendBackground.append('rect')
            .attr('width', 208)
            .attr('height', legendHeight + 8)
            .attr('fill', '#f0f0f0')
            .attr('stroke', 'gray');

        const legend = g.append('g')
            .attr('transform', `translate(${graph.attr('width') - 125}, 50)`);
        
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
            'Percentage of Children w/ Less than High School Education',
            'and Percentage of Children in Poverty in New York State (2009-2020)'
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

    });
    
    return svg.node();
}

