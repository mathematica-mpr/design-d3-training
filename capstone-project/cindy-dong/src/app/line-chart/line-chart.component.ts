import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface YearsData {
    COUNTY: string;
    [key: string]: number | string;
}

interface FormattedData {
    name: string;
    values: { year: Date; value: number }[];
}

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
    constructor(private router: Router) {}
    navigateToSecondViz() {
        this.router.navigate(['/second-viz']);
    }
    navigateToThirdViz() {
        this.router.navigate(['/third-viz']);
    }
    navigateToHome() {
        this.router.navigate(['/']);
    }
    yearsData: YearsData[] = [];
    url: string = '../../assets/years.json';
    width = 800 - 40 - 30; // Define width as a class property
    
    ngOnInit() {
        //lifecycle hook, part of OnInit interface
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.yearsData = json.Years;
                this.createChart();
                this.setupFilters();
                this.updateChart();
            });
    }

    createChart(filteredData: YearsData[] = this.yearsData, x?: d3.ScaleTime<number, number>) {
        const data: YearsData[] = filteredData;
    
        const margin = { top: 20, right: 30, bottom: 40, left: 40 },
            width = this.width,
            height = 450 - margin.top - margin.bottom;
    
        d3.select('#chart').selectAll('*').remove();
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const parseYear = d3.timeParse('%Y');
    
        const allGroup: string[] = data.map((d) => d.COUNTY);
    
        const formattedData: FormattedData[] = allGroup.map((group: string) => {
            return {
                name: group,
                values: Object.keys(data[0])
                    .filter((key) => key.includes('Percentage'))
                    .map((key) => {
                        const yearMatch = key.match(/\((\d{4})\)/);
                        const year = yearMatch ? parseYear(yearMatch[1]) : null;
                        const dataEntry = data.find((d) => d.COUNTY === group);
                        const value = dataEntry ? +dataEntry[key] : 0;
                        return { year, value };
                    })
                    .filter((d) => d.year !== null) as { year: Date; value: number }[],
            };
        });
    
        if (!x) {
            x = d3
                .scaleTime()
                .domain(d3.extent(formattedData[0].values, (d) => d.year) as [Date, Date])
                .range([0, width]);
        }
        svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(formattedData, (d) => d3.max(d.values, (v) => v.value)) as number])
            .range([height, 0])
            .nice();
        svg.append('g').call(d3.axisLeft(y));
    
        const color = d3.scaleOrdinal(d3.schemeCategory10).domain(allGroup);
    
        const line = d3
            .line<{ year: Date; value: number }>()
            .x((d) => x!(d.year))
            .y((d) => y(d.value));
    
        const selectedCounties = allGroup.filter((county) =>
            filteredData.some((d) => d.COUNTY === county)
        );
    
        svg.selectAll('.line')
            .data(formattedData)
            .join('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', (d) => (selectedCounties.length > 0 ? color(d.name) : 'black'))
            .attr('stroke-width', 1.2)
            .attr('d', (d) => line(d.values))
            .on('mouseover', function (event, d) {
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip.html(d.name)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mousemove', function (event, d) {
                const tooltip = d3.select('#tooltip');
                tooltip.style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function (d) {
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(500).style('opacity', 0);
            });
    
        svg.selectAll('.circle')
            .data(formattedData.flatMap((d) => d.values.map((v) => ({ ...v, name: d.name }))))
            .join('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => x!(d.year))
            .attr('cy', (d) => y(d.value))
            .attr('r', 3)
            .attr('fill', (d) => (selectedCounties.length > 0 ? color(d.name) : 'black'))
            .on('mouseover', function (event, d) {
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip.html(`${d.name}: ${d.value}%`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mousemove', function (event, d) {
                const tooltip = d3.select('#tooltip');
                tooltip.style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function (d) {
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(500).style('opacity', 0);
            });
    
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + 35)
            .style('font-size', '12px')
            .text('Year');
    
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
            .text('Percent of population Uninsured from 2009-2020 in VA Counties');
    
        // Clear existing legend
        d3.select('#legend').selectAll('*').remove();
    
        if (selectedCounties.length > 0) {
            const legend = d3
                .select('#legend')
                .selectAll('.legend')
                .data(selectedCounties)
                .join('div')
                .attr('class', 'legend-item')
                .style('display', 'flex');
    
            legend
                .append('div')
                .style('width', '18px')
                .style('height', '18px')
                .style('background-color', color);
    
            legend
                .append('span')
                .style('margin-bottom', '20px')
                .style('margin-left', '10px')
                .text((d) => d);
        }
    }
    
    
    

    setupFilters() {
        const selectCounty = d3.select('#select-county');
        const selectYear = d3.select('#select-year');
        const clearFilters = d3.select('#clear-filters');
    
        // Populates county and year
        const counties = Array.from(new Set(this.yearsData.map((d) => d.COUNTY)));
        counties.forEach((county) => {
            selectCounty.append('option').text(county).attr('value', county);
        });
    
        const years = Object.keys(this.yearsData[0])
            .filter((key) => key.includes('Percentage'))
            .map((key) => key.match(/\((\d{4})\)/)?.[1]);
        years.forEach((year) => {
            if (year) {
                selectYear.append('option').text(year).attr('value', year);
            }
        });
    
        selectCounty.on('change', () => this.updateChart());
        selectYear.on('change', () => {
            const selectedYear = selectYear.property('value');
            const parseYear = d3.timeParse('%Y');
            const startYear = parseYear(selectedYear);
            const endYear = parseYear((parseInt(selectedYear) + 1).toString());
    
            if (startYear && endYear) {
                const x = d3
                    .scaleTime()
                    .domain([startYear, endYear])
                    .range([0, this.width]);
    
                this.updateChart(x);
            } else {
                console.error('Invalid year selected');
            }
        });

        clearFilters.on('click', () => {
            selectCounty.property('value', '');
            selectYear.property('value', '');
            this.createChart();
        const selectedItems = d3.select('#selected-items');
        selectedItems.selectAll('*').remove();
        });
    }
    
    updateChart(x?: d3.ScaleTime<number, number>) {
        const selectedCounties = Array.from(d3.select('#select-county').property('selectedOptions'), (option: HTMLOptionElement) => option.value);
        const selectedYear = (d3.select('#select-year').property('value') as string) || '';
    
        const filteredData = this.yearsData.filter((d) => {
            return (
                (selectedCounties.length === 0 || selectedCounties.includes(d.COUNTY)) &&
                (!selectedYear || Object.keys(d).some((key) => key.includes(selectedYear)))
            );
        });
    
        this.createChart(filteredData, x);
  
        const selectedItems = d3.select('#selected-items');
        selectedItems.selectAll('*').remove();
        selectedCounties.forEach((county) => {
            const item = selectedItems.append('div').attr('class', 'selected-item').text(county);
            item.on('click', () => {
                const index = selectedCounties.indexOf(county);
                if (index > -1) {
                    selectedCounties.splice(index, 1);
                    d3.select(`#select-county option[value="${county}"]`).property('selected', false);
                    this.updateChart(x);
                }
            });
        });
    }
    
    
}