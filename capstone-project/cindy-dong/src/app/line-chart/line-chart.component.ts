import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
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
}
