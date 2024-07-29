import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LineChartComponent } from './line-chart/line-chart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    { path: 'first-viz', component: LineChartComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
