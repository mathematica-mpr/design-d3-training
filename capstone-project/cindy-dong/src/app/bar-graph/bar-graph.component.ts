import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface GeographyData {
    COUNTY: string;
    [key: string]: number | string;
}

interface FormattedData {
    name: string;
    values: { year: Date; value: number }[];
}

@Component({
    selector: 'app-bar-graph',
    standalone: true,
    imports: [],
    templateUrl: './bar-graph.component.html',
    styleUrl: './bar-graph.component.scss',
})
export class BarGraphComponent implements OnInit {
    constructor(private router: Router) {}
    navigateToFirstViz() {
        this.router.navigate(['/first-viz']);
    }
    navigateToSecondViz() {
        this.router.navigate(['/second-viz']);
    }
    navigateToHome() {
        this.router.navigate(['/']);
    }
    geographyData: GeographyData[] = [];
    formattedData: FormattedData[] = [];
    url: string = '../../assets/geography.json';

    ngOnInit() {
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.geographyData = json.Geography;
                this.formatData();
                this.createChart();
                this.setupFilters();
                this.updateChart();
            });
    }
    formatData() {
        this.formattedData = this.geographyData.map((geoData) => {
            const name = geoData.COUNTY;
            const region = geoData['Region'];
            const values = Object.keys(geoData)
                .filter((key) => key !== 'COUNTY' && key !== 'Region')
                .map((year) => ({
                    year: new Date(year),
                    value: +geoData[year],
                    region: region,
                }));
            return { name, values };
        });
        console.log(this.formattedData);
    }
    createChart(_filteredData: GeographyData[] = this.geographyData) {
        const margin = { top: 20, right: 30, bottom: 110, left: 40 },
            width = 1350 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        d3.select('#chart').selectAll('*').remove();
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const sortedData = this.geographyData.sort((a, b) => {
            const countyA = a.COUNTY.replace(' County', '');
            const countyB = b.COUNTY.replace(' County', '');
            return countyA.localeCompare(countyB);
        });

        const x = d3
            .scaleBand()
            .padding(0.1)
            .domain(sortedData.map((d) => d.COUNTY.replace(' County', '')))
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.formattedData, (d) => d3.max(d.values, (v) => v.value)) as number])
            .range([height, 0])
            .nice();

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('font-size', '9px')
            .attr('transform', 'rotate(-90)')
            .style('text-anchor', 'end')
            .attr('y', '-5')
            .attr('x', '-10');

        svg.append('g').call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(this.geographyData)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.COUNTY.replace(' County', ''))!)
            .attr('y', (d) =>
                y(d3.max(this.formattedData.find((f) => f.name === d.COUNTY)!.values, (v) => v.value) as number)
            )
            .attr('width', x.bandwidth())
            .attr(
                'height',
                (d) =>
                    height -
                    y(d3.max(this.formattedData.find((f) => f.name === d.COUNTY)!.values, (v) => v.value) as number)
            )
            .attr('fill', (d) => (d['Region'] === 'inland' ? '#56AC2E' : '#178FA9'));
            
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + 100)
            .style('font-size', '15px')
            .text('Counties');
        
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
            .text('Percent of Population Uninsured in VA Counties by Coastal Zone');
    }
    setupFilters() {
        const selectCounty = d3.select('#select-county');
        const selectYear = d3.select('#select-year');
        const clearFilters = d3.select('#clear-filters');
        const selectedItems = d3.select('#selected-items'); // show the items selected

        //populates county and year
        const counties = Array.from(new Set(this.geographyData.map((d) => d.COUNTY)));
        counties.forEach((county) => {
            selectCounty.append('option').text(county).attr('value', county);
        });

        const years = Array.from(new Set(Object.keys(this.geographyData[0]).filter((key) => key !== 'COUNTY')));
        years.forEach((year) => {
            selectYear.append('option').text(year).attr('value', year);
        });

        // handles filter changes
        selectCounty.on('change', () => this.updateChart());
        selectYear.on('change', () => this.updateChart());

        // Handle clear filters
        clearFilters.on('click', () => {
            selectCounty.property('value', '');
            selectYear.property('value', '');
            this.updateChart();
        });
    }

    updateChart() {
        const selectedCounties = (d3.select('#select-county').property('value') as string) || '';
        const selectedYear = (d3.select('#select-year').property('value') as string) || '';

        const filteredData = this.geographyData.filter((d) => {
            return (
                (!selectedCounties || selectedCounties.includes(d.COUNTY)) &&
                (!selectedYear || Object.keys(d).some((key) => key.includes(selectedYear)))
            );
        });

        this.createChart(filteredData);
    }
}
