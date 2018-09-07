import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PieChartComponent, BarChartComponent],
  exports: [PieChartComponent, BarChartComponent]
})
export class ChartsModule { }
