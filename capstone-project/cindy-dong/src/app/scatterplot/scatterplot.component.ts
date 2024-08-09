import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface PopulationData {
    [key: string]: number | string;
    COUNTY: string;
}

interface FormattedData {
    name: string;
    values: { year: Date; yValue: number; xValue: number }[];
}

@Component({
    selector: 'app-scatterplot',
    standalone: true,
    imports: [],
    templateUrl: './scatterplot.component.html',
    styleUrl: './scatterplot.component.scss',
})
export class ScatterplotComponent implements OnInit {
    constructor(private router: Router) {}
    navigateToFirstViz() {
        this.router.navigate(['/first-viz']);
    }
    navigateToThirdViz() {
        this.router.navigate(['/third-viz']);
    }
    navigateToHome() {
        this.router.navigate(['/']);
    }
    formattedData: FormattedData[] = [];
    populationData: PopulationData[] = [];

    url: string = '../../assets/population.json';
    defaultYear: string = '2020';

    ngOnInit() {
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.populationData = json.Population;
                this.formatData();
                this.setupFilters();
                this.updateSelectedItems;
                this.updateChart(this.defaultYear);
            });
    }

    formatData() {
        this.formattedData = this.populationData.map((countyData) => {
            const name = countyData.COUNTY;
            const values = Object.keys(countyData)
                .filter((key) => key !== 'COUNTY')
                .map((year) => {
                    const [yValue, xValue] = (countyData[year] as string).split(',').map(Number);
                    return {
                        year: new Date(year),
                        yValue,
                        xValue,
                    };
                });
            return { name, values };
        });
    }

    createChart(filteredData: PopulationData[]) {
        const margin = { top: 20, right: 30, bottom: 40, left: 40 },
            width = 800 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        d3.select('#chart').selectAll('*').remove();
        d3.select('#legend').selectAll('*').remove();

        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(filteredData, (d) =>
                    d3.max(
                        Object.keys(d)
                            .filter((key) => key !== 'COUNTY')
                            .map((year) => {
                                const [_, xValue] = (d[year] as string).split(',').map(Number);
                                return xValue;
                            })
                    )
                ) as number,
            ])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(filteredData, (d) =>
                    d3.max(
                        Object.keys(d)
                            .filter((key) => key !== 'COUNTY')
                            .map((year) => {
                                const [yValue, _] = (d[year] as string).split(',').map(Number);
                                return yValue;
                            })
                    )
                ) as number,
            ])
            .range([height, 0])
            .nice();

        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append('g').call(d3.axisLeft(y));

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const tooltip = d3.select('#tooltip');

        filteredData.forEach((county) => {
            const countyName = county.COUNTY;
            const data = Object.keys(county)
                .filter((key) => key !== 'COUNTY')
                .map((year) => {
                    const [yValue, xValue] = (county[year] as string).split(',').map(Number);
                    return { year: new Date(year), yValue, xValue };
                });

            svg.selectAll(`.circle-${countyName.replace(/\s+/g, '-')}`)
                .data(data)
                .join('circle')
                .attr('class', `circle-${countyName.replace(/\s+/g, '-')}`)
                .attr('cx', (d) => x(d.xValue))
                .attr('cy', (d) => y(d.yValue))
                .attr('r', 5)
                .style('fill', color(countyName))
                .on('mouseover', (event, d) => {
                    tooltip.transition().duration(200).style('opacity', 0.9);
                    tooltip
                        .html(`County: ${countyName}<br>Population: ${d.xValue}<br>Percent: ${d.yValue}%`)
                        .style('left', event.pageX + 'px')
                        .style('top', event.pageY - 28 + 'px');
                })
                .on('mouseout', () => {
                    tooltip.transition().duration(500).style('opacity', 0);
                });
        });

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + 35)
            .style('font-size', '12px')
            .text('Total Weighted Population');

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left + 11)
            .attr('x', -height / 2 + 10)
            .style('font-size', '12px')
            .text('Percentage of population uninsured (%)');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -2)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .text('Percent of population uninsured by total weighted population in VA counties');

        const legend = d3
            .select('#legend')
            .append('svg')
            .attr('width', 200)
            .attr('height', filteredData.length * 25)
            .selectAll('.legend-item')
            .data(filteredData.map((d) => d.COUNTY))
            .join('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => `translate(0, ${i * 25})`);

        legend
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d) => color(d));

        legend
            .append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '0.35em')
            .style('text-anchor', 'start')
            .text((d) => d);
    }

    setupFilters() {
        const selectCounty = d3.select('#select-county');
        const selectYear = d3.select('#select-year');
        const clearFilters = d3.select('#clear-filters');

        const counties = Array.from(new Set(this.populationData.map((d) => d.COUNTY)));
        counties.forEach((county) => {
            selectCounty.append('option').text(county).attr('value', county);
        });
        const years = Array.from(new Set(Object.keys(this.populationData[0]).filter((key) => key !== 'COUNTY')));
        years.forEach((year) => {
            selectYear.append('option').text(year).attr('value', year);
        });

        selectYear.property('value', this.defaultYear);

        selectCounty.on('change', () => this.updateChart());
        selectYear.on('change', () => this.updateChart());

        clearFilters.on('click', () => {
            selectCounty.property('value', '');
            selectYear.property('value', this.defaultYear);
            this.updateChart(this.defaultYear, true);
            const selectedItems = d3.select('#selected-items');
            selectedItems.selectAll('*').remove();
        });
    }

    updateChart(selectedYear?: string, reset: boolean = false) {
        let filteredData = this.populationData;

        if (reset) {
            filteredData = filteredData.map((d) => {
                const filteredEntry: any = { COUNTY: d.COUNTY };
                filteredEntry[this.defaultYear] = d[this.defaultYear];
                return filteredEntry;
            });
            this.createChart(filteredData);
            return;
        }

        const selectedCounties = Array.from(
            d3.select('#select-county').property('selectedOptions'),
            (option: any) => option.value
        );
        const year = selectedYear || (d3.select('#select-year').property('value') as string) || this.defaultYear;

        if (selectedCounties.length > 0) {
            filteredData = filteredData.filter((d) => selectedCounties.includes(d.COUNTY));
        }

        if (year) {
            filteredData = filteredData.map((d) => {
                const filteredEntry: any = { COUNTY: d.COUNTY };
                if (d[year]) {
                    filteredEntry[year] = d[year];
                } else {
                    filteredEntry[year] = null;
                }
                return filteredEntry;
            });
        }

        this.createChart(filteredData);
        this.updateSelectedItems(selectedCounties);
    }

    updateSelectedItems(selectedCounties: string[]) {
        const selectedItems = d3.select('#selected-items');
        selectedItems.selectAll('*').remove();
        selectedCounties.forEach((county) => {
            const item = selectedItems.append('div').attr('class', 'selected-item').text(county);
            item.on('click', () => {
                d3.select(`#select-county option[value="${county}"]`).property('selected', false);
                this.updateChart();
            });
        });
    }
}
