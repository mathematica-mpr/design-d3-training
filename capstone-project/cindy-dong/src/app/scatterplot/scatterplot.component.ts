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

    ngOnInit() {
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.populationData = json.Population;
                this.formatData();
                this.createChart();
                this.setupFilters();
                this.updateChart();
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

    createChart(_filteredData: PopulationData[] = this.populationData) {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 },
            width = 800 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        d3.select('#chart').selectAll('*').remove();

        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(this.formattedData, (d) => d3.max(d.values, (v) => v.xValue)) as number])
            .range([0, width]);
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.formattedData, (d) => d3.max(d.values, (v) => v.yValue)) as number])
            .range([height, 0])
            .nice();

        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append('g').call(d3.axisLeft(y));

        svg.selectAll('.circle')
            .data(this.formattedData)
            .join('circle')
            .attr('cx', (d) => x(d.values[0].xValue))
            .attr('cy', (d) => y(d.values[0].yValue))
            .attr('r', 3)
            .style('fill', '#12445b');
        // x axis
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + 30)
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
            .text('Percent of population Uninsured by Total Weighted Population in VA Counties');
    }
    setupFilters() {
        const selectCounty = d3.select('#select-county');
        const selectYear = d3.select('#select-year');
        const clearFilters = d3.select('#clear-filters');

        //populates county and year
        const counties = Array.from(new Set(this.populationData.map((d) => d.COUNTY)));
        counties.forEach((county) => {
            selectCounty.append('option').text(county).attr('value', county);
        });
        const years = Array.from(new Set(Object.keys(this.populationData[0]).filter((key) => key !== 'COUNTY')));
        years.forEach((year) => {
            selectYear.append('option').text(year).attr('value', year);
        });
        selectCounty.on('change', () => this.updateChart());
        selectYear.on('change', () => this.updateChart());

        clearFilters.on('click', () => {
            selectCounty.property('value', '');
            selectYear.property('value', '');
            this.updateChart();
        });
    }
    updateChart() {
        const selectedCounties = (d3.select('#select-county').property('value') as string) || '';
        const selectedYear = (d3.select('#select-year').property('value') as string) || '';
        const filteredData = this.populationData.filter((d) => {
            return (
                (!selectedCounties || selectedCounties.includes(d.COUNTY)) &&
                (!selectedYear || Object.keys(d).some((key) => key.includes(selectedYear)))
            );
        });
        this.createChart(filteredData);
    }
}
