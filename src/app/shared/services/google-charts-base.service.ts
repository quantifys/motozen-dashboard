import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleChartsBaseService {

  constructor() {
    google.charts.load('current', { 'packages': ['corechart', 'bar'] });
  }

  protected buildChart(data: any[], chartFunc: any, options: any): void {
    var funcCore = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    };
    var funcBar = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, google.charts.Bar.convertOptions(options));
    };
    var callbackCore = () => funcCore(chartFunc, options);
    google.charts.setOnLoadCallback(callbackCore);
    var callbackBar = () => funcBar(chartFunc, options);
    google.charts.setOnLoadCallback(callbackBar);
  }

}
