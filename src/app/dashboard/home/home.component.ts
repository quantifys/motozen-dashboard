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

  searchString;
  public certificateChartData: any[] = [];
  public certificateTableData: any[] = [];
  public barChartConfig: any;
  public certificateData: any[] = [];
  public certificateForm: FormGroup;
  public certificateTableForm: FormGroup;
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
  public tablePeriods: any[] = [
    {
      label: "All",
      value: "all"
    },
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
    },
    {
      label: "Today",
      value: "today"
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
        "#e84118",
        "#00a8ff",
        "#fbc531",
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
    this._store.select(fromRoot.getDashboardCertificateGraphData).subscribe(data => data ? this.certificateChartData = data["data"] : null);
    this._store.select(fromRoot.getDashboardCertificateTableData).subscribe(data => data ? this.certificateTableData = data["data"] : null);
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      period: null,
      states: [null]
    });
    this.certificateTableForm = this._fb.group({
      period: null,
      search: null
    });
  }

  formListener() {
    this.certificateForm.valueChanges.subscribe(value => {
      this._store.dispatch(new dashboardActions.FetchMFGCertificateGraphDashboardDataAction(value));
    });
    this.certificateTableForm.get('period').valueChanges.subscribe(value => {
      this._store.dispatch(new dashboardActions.FetchMFGCertificateTableDashboardDataAction({
        period: value
      }));
    });
  }

  getStateData(): any[] {
    if(!this.certificateTableData) return [];
    if(!this.searchString) return this.certificateTableData;
    return this.certificateTableData.filter(item => String(item[0]).toLowerCase().includes(this.searchString.toLowerCase()))
  }
}
