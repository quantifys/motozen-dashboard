import { Injectable } from '@angular/core';

import { GoogleChartsBaseService } from './google-charts-base.service';

declare var google: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleBarChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildBarChart(elementId: string, data: any[], config: any): void {
    var chartFunc = () => {
      if (document.getElementById(elementId)) {
        return new google.charts.Bar(document.getElementById(elementId));
      }
      return null;
    };
    this.buildChart(data, chartFunc, config);
    $(window).resize(() => {
      if (document.getElementById(elementId)) {
        this.buildChart(data, chartFunc, config)
      }
    });
  }

}
