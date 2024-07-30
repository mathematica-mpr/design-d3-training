import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scatterplot',
    standalone: true,
    imports: [],
    templateUrl: './scatterplot.component.html',
    styleUrl: './scatterplot.component.scss',
})
export class ScatterplotComponent {
    constructor(private router: Router) {}
    navigateToFirstViz() {
        this.router.navigate(['/first-viz']);
    }
    navigateToThirdViz() {
        this.router.navigate(['/third-viz']);
    }
}
