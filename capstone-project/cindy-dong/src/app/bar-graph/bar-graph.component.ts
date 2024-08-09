import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

interface GeographyData {
    COUNTY: string;
    [key: string]: number | string;
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
    currentSortOrder: 'asc' | 'desc' | null = null;  // Track current sort order
    url: string = '../../assets/geography.json';

    ngOnInit() {
        const defaultYear = '2020';
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.geographyData = json.Geography;
                this.geographyData.sort((a, b) => {
                    const countyA = a.COUNTY.replace(' County', '');
                    const countyB = b.COUNTY.replace(' County', '');
                    return countyA.localeCompare(countyB);
                });
                this.populateYearDropdown();
                this.createChart(defaultYear);
            });
    }

    populateYearDropdown() {
        const years = Object.keys(this.geographyData[0]).filter((key) => !['COUNTY', 'Region'].includes(key));
        const selectYear = document.getElementById('select-year') as HTMLSelectElement;
        years.forEach((year) => {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            selectYear.appendChild(option);
        });
        selectYear.value = '2020';

        selectYear.addEventListener('change', () => {
            const selectedYear = selectYear.value;
            this.createChart(selectedYear, this.currentSortOrder);
        });
    }

    sortData(order: 'asc' | 'desc') {
        this.currentSortOrder = order;  
        const selectedYear = (document.getElementById('select-year') as HTMLSelectElement).value || '2020';
        
        this.geographyData.sort((a, b) => {
            const valueA = +a[selectedYear];
            const valueB = +b[selectedYear];
            return order === 'asc' ? valueA - valueB : valueB - valueA;
        });
        
        this.createChart(selectedYear, order);
    }

    resetChart() {
        const selectedYear = (document.getElementById('select-year') as HTMLSelectElement).value || '2020';
    
        this.geographyData.sort((a, b) => {
            const countyA = a.COUNTY.replace(' County', '');
            const countyB = b.COUNTY.replace(' County', '');
            return countyA.localeCompare(countyB);
        });
    
        this.currentSortOrder = null;
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radioButton) => {
            (radioButton as HTMLInputElement).checked = false;
        });
    
        this.createChart(selectedYear);
    }

    createChart(selectedYear: string, sortOrder: 'asc' | 'desc' | null = null) {
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
    
        const tooltip = d3.select('#tooltip');
    
        if (sortOrder) {
            this.geographyData.sort((a, b) => {
                const valueA = +a[selectedYear];
                const valueB = +b[selectedYear];
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });
        }

        const x = d3
            .scaleBand()
            .padding(0.1)
            .domain(this.geographyData.map((d) => d.COUNTY.replace(' County', '')))
            .range([0, width]);
    
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.geographyData, (d) => +d[selectedYear]) as number])
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
            .attr('y', height)
            .attr('width', x.bandwidth())
            .attr('height', 0)
            .attr('fill', (d) => (d['Region'] === 'inland' ? '#56AC2E' : '#178FA9'))
            .on('mouseover', (event, d) => {
                const county = d.COUNTY;
                const value = d[selectedYear];
                tooltip
                    .style('opacity', 1)
                    .html(`County: ${county}<br>Percent: ${value}%`)
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0);
            })
            .transition()
            .duration(1500)
            .attr('y', (d) => y(+d[selectedYear]))
            .attr('height', (d) => height - y(+d[selectedYear]));
    
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
            .text(`Percent of population uninsured in VA counties (${selectedYear}) by coastal zone`);
    
        const legend = svg.append('g')
            .attr('transform', `translate(${width - 100}, 0)`);
    
        legend.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', '#56AC2E');
    
        legend.append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '0.35em')
            .text('Inland');
    
        legend.append('rect')
            .attr('x', 0)
            .attr('y', 24)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', '#178FA9');
    
        legend.append('text')
            .attr('x', 24)
            .attr('y', 33)
            .attr('dy', '0.35em')
            .text('Coastal');
    }
}
