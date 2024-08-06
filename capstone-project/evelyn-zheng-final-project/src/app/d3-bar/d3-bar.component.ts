import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

// Define interfaces
interface DataRow {
  state: string;
  pct: string;
}

interface StateData {
  [key: string]: number[];
}

interface StateAverages {
  [key: string]: number;
}

interface StateDeviations {
  [key: string]: number;
}

@Component({
  selector: 'app-d3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.css']
})
export class D3BarComponent implements OnInit, AfterViewInit {
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private width: number = 800;
  private height: number = 600;
  private innerWidth: number = this.width - 100;
  private innerHeight: number = this.height - 100;
  private tooltip!: d3.Selection<HTMLDivElement, unknown, null, undefined>;
  private stateData: StateData = {};
  private stateAverages: StateAverages = {};
  private stateDeviations: StateDeviations = {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Load and process CSV data
    d3.csv<DataRow>('percent_insurance.csv').then(data => {
      data.forEach((d: DataRow) => {
        // Convert pct to number and handle potential commas
        const pctValue = parseFloat(d.pct.replace(/,/g, ""));
        if (!isNaN(pctValue)) {
          if (!this.stateData[d.state]) {
            this.stateData[d.state] = [];
          }
          this.stateData[d.state].push(pctValue);
        }
      });

      // Compute averages and deviations
      Object.keys(this.stateData).forEach(state => {
        const pcts = this.stateData[state];
        const validPcts = pcts.filter((value: number) => !isNaN(value));
        const sum = validPcts.reduce((a: number, b: number) => a + b, 0);
        const average = sum / validPcts.length;
        this.stateAverages[state] = average;
        this.stateDeviations[state] = Math.sqrt(
          validPcts.reduce((a: number, b: number) => a + Math.pow(b - average, 2), 0) / validPcts.length
        );
      });

      // Update visualization after data processing
      this.updateChart();
    }).catch(error => {
      console.error('Error loading CSV data:', error);
    });
  }

  ngAfterViewInit() {
    // Initialize SVG and tooltip
    this.svg = d3.select(this.elementRef.nativeElement).select<SVGSVGElement>('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  updateChart() {
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(this.stateDeviations)) || 0])
      .range([0, this.innerWidth]);

    const yScale = d3.scaleBand()
      .domain(Object.keys(this.stateDeviations))
      .range([0, this.innerHeight])
      .padding(0.1);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Remove existing bars
    this.svg.selectAll('rect').remove();

    // Add new bars
    this.svg.selectAll('rect')
      .data(Object.entries(this.stateDeviations))
      .enter()
      .append('rect')
      .attr('x', d => xScale(Math.min(0, d[1])))
      .attr('y', d => yScale(d[0]) || 0)
      .attr('width', d => Math.abs(xScale(d[1]) - xScale(0)))
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d[0]))
      .on('mouseover', (event: MouseEvent, d: [string, number]) => {
        this.tooltip.transition().duration(200).style('opacity', .9);
        this.tooltip.html(`${d[0]}: ${d[1].toFixed(2)}`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.transition().duration(500).style('opacity', 0);
      });
  }
}
