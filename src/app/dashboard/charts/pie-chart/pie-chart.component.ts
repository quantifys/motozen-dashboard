import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { GooglePieChartService } from '../../../shared/services/google-pie-chart.service';
import { PieChartConfig } from '../../../shared/models/chart.model';

declare var $: any;

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;
  public chartWidth: number = 0;

  constructor(private _pieChartService: GooglePieChartService) {
    this.checkWidth();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data.length > 1) {
      this._pieChartService.BuildPieChart(this.elementId, this.data, this.config);
    }
  }

  checkWidth() {
    this.chartWidth = $('.right .card-body').width()
  }

}
