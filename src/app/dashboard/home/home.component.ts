import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as dashboardActions from '../../shared/actions/dashboard.actions';
import { State } from '../../shared/models';
import { RtoService } from '../../shared/services/rto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public certificateChartData: any[] = [];
  public barChartConfig: any;
  public certificateData: any[] = [];
  public certificateForm: FormGroup;
  public states: State[] = [];
  public periods: any[] = [
    {
      label: "Year",
      value: "year"
    },
    {
      label: "Month",
      value: "month"
    },
    {
      label: "Week",
      value: "week"
    }
  ];

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private _rtoService: RtoService
  ) {
    this._store.dispatch(new dashboardActions.FetchDashboardDataAction);
    this.barChartConfig = {
      bars: "vertical",
      colors: [
        "#FFB88C",
        "#00a8ff",
        "#E56590",
        "#4cd137"
      ],
      fontName: 'Varela Round',
      explorer: {
        axis: 'horizontal'
      }
    };
    this.states = this._rtoService.getStates();
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this._store.select(fromRoot.getDashboardCertificateGraphData).subscribe(data => {
      if (data) {
        this.certificateChartData = [];
        this.loadStockData(data);
      }
    });
  }

  loadStockData(data) {
    data["data"].map(item => this.certificateChartData.push(item));
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      period: null,
      states: [null]
    });
  }

  formListener() {
    this.certificateForm.valueChanges.subscribe(value => {
      this._store.dispatch(new dashboardActions.FetchMFGCertificateGraphDashboardDataAction(value));
    });
  }

}
