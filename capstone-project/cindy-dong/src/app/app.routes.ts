import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    { path: 'first-viz', component: LineChartComponent },
    { path: 'second-viz', component: ScatterplotComponent },
    { path: 'third-viz', component: BarGraphComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
