import { Injectable } from '@angular/core';

import { BarChartConfig } from '../models';
import { GoogleChartsBaseService } from './google-charts-base.service';

declare var google: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleBarChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildBarChart(elementId: string, data: any[], config: BarChartConfig): void {
    var chartFunc = () => { return new google.charts.Bar(document.getElementById(elementId)); };
    var options = {
      bars: 'vertical',
      legend: {
        position: "none"
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
