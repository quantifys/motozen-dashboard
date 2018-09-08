import { Injectable } from '@angular/core';
import { GoogleChartsBaseService } from './google-charts-base.service';
import { PieChartConfig } from '../models/chart.model';

declare var google: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    var options = {
      title: config.title,
      pieHole: config.pieHole,
      is3D: config.is3D,
      legend: {
        alignment: config.legend.position
      },
      colors: [
        "#FFB88C",
        "#E56590"
      ]
    };

    this.buildChart(data, chartFunc, options);
    $(window).resize(() => this.buildChart(data, chartFunc, options));
  }

}
