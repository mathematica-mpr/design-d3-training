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
        const margin = { top: 20, right: 30, bottom: 50, left: 40 },
            width = 1350 - margin.left - margin.right,
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
            .scaleBand()
            .padding(0.1)
            .domain(this.geographyData.map((d) => d.COUNTY.replace(' County', '')))
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
            .attr('font-size', '8px')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');
    
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
    
}
