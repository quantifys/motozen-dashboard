import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { GoogleBarChartService } from '../../../shared/services/google-bar-chart.service';

declare var $: any;

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() config: any;
  @Input() elementId: string;
  public chartHeight: number = 0;

  constructor(private _barChartService: GoogleBarChartService) {
    this.checkHeight();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data.length > 1) {
      this._barChartService.BuildBarChart(this.elementId, this.data, this.config);
    }
  }

  checkHeight() {
    this.chartHeight = $(window).height()/2 > 350 ? $(window).height()/1.8 : 350
  }

}
