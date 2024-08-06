import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarChartComponent } from './d3-bar/d3-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'evelyn-zheng-final-project';
}
