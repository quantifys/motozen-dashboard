import { Component, OnInit, Input } from '@angular/core';

import { GooglePieChartService } from '../../../shared/services/google-pie-chart.service';
import { PieChartConfig } from '../../../shared/models/chart.model';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;

  constructor(private _pieChartService: GooglePieChartService) { }

  ngOnInit() {
    this._pieChartService.BuildPieChart(this.elementId, this.data, this.config);
  }

}
