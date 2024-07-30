import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bar-graph',
    standalone: true,
    imports: [],
    templateUrl: './bar-graph.component.html',
    styleUrl: './bar-graph.component.scss',
})
export class BarGraphComponent {
    constructor(private router: Router) {}
    navigateToFirstViz() {
        this.router.navigate(['/first-viz']);
    }
    navigateToSecondViz() {
        this.router.navigate(['/second-viz']);
    }
}
