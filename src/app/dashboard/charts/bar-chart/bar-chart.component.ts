import { Component, OnInit, Input } from '@angular/core';
import { BarChartConfig } from '../../../shared/models';
import { GoogleBarChartService } from '../../../shared/services/google-bar-chart.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: BarChartConfig;
  @Input() elementId: string;

  constructor(private _barChartService: GoogleBarChartService) { }

  ngOnInit() {
    this._barChartService.BuildBarChart(this.elementId, this.data, this.config);
  }

}
