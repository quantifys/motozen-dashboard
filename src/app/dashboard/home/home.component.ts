import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../shared/reducers';
import * as dashboardActions from '../../shared/actions/dashboard.actions';
import { State, PieChartConfig, User } from '../../shared/models';
import { RtoService } from '../../shared/services/rto.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private paramSubscription: Subscription = new Subscription();
  private loggedUserSubscription: Subscription = new Subscription();
  private certGraphSubscription: Subscription = new Subscription();
  private certTableSubscription: Subscription = new Subscription();
  private typeFormSubscription: Subscription = new Subscription();
  private graphFormSubscription: Subscription = new Subscription();
  private tableFormSubscription: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public pieChartConfig: PieChartConfig;
  public certificateChartData: any[] = [];
  public certificateTableData: any[] = [];
  public pieChartData: any[] = [];
  public barChartConfig: any;
  public distributorData: any;
  public certificateData: any[] = [];
  public certificateForm: FormGroup;
  public certificateTableForm: FormGroup;
  public typeForm: FormGroup;
  public states: State[] = [];
  public periods: any[] = [
    {
      label: 'This year',
      value: 'year'
    },
    {
      label: 'This month',
      value: 'month'
    },
    {
      label: 'This week',
      value: 'week'
    }
  ];
  public tablePeriods: any[] = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Year',
      value: 'year'
    },
    {
      label: 'Month',
      value: 'month'
    },
    {
      label: 'Week',
      value: 'week'
    },
    {
      label: 'Today',
      value: 'today'
    }
  ];

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private _rtoService: RtoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    const paramsType = this._activatedRoute.snapshot.queryParams['type'];
    if (!paramsType || (paramsType !== 'sld' && paramsType !== 'tracker')) {
      this._router.navigate(['dashboard', 'home'],
        { queryParams: { type: 'tracker' } });
    }
    this.paramSubscription = this._activatedRoute.queryParams.subscribe(params => this.type.patchValue(params['type']));
    this.loggedUserSubscription = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role === 'manufacturer') {
        this._store.dispatch(new dashboardActions.FetchDashboardDataAction('tracker'));
      }
      if (user.role === 'distributor' || user.role === 'dealer') {
        this._store.dispatch(new dashboardActions.FetchDistDashboardDataAction());
      }
    });
    this.barChartConfig = {
      bars: 'vertical',
      colors: [
        '#e84118',
        '#00a8ff',
        '#fbc531',
        '#4cd137'
      ],
      fontName: 'Varela Round',
      explorer: {
        axis: 'horizontal'
      },
      vAxis: {
        viewWindow: {
          min: 0
        }
      }
    };
    this.pieChartConfig = new PieChartConfig({
      is3D: true,
      legend: {
        position: 'bottom'
      }
    });
    this.states = this._rtoService.getStates();
  }

  ngOnInit() {
    this.formListener();
    this.certGraphSubscription = this._store.select(fromRoot.getDashboardCertificateGraphData).subscribe(data => {
      if (data) {
        this.certificateChartData = data['data'];
        this.certificateForm.get('period').patchValue(data['period'], { emitEvent: false });
        $('.right').css('height', $('.left .card').height());
      }
    });
    this.certTableSubscription = this._store.select(fromRoot.getDashboardCertificateTableData).subscribe(data => {
      if (data) {
        this.pieChartData = [['State', 'No. Issued'], ...data['data']];
        this.certificateTableData = data['data'];
        this.certificateTableForm.get('period').patchValue(data['period'], { emitEvent: false });
      }
    });
    this._store.select(fromRoot.getDistributorDashboardData).subscribe(data => this.distributorData = data);
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
    this.certGraphSubscription.unsubscribe();
    this.certTableSubscription.unsubscribe();
    this.typeFormSubscription.unsubscribe();
    this.graphFormSubscription.unsubscribe();
    this.tableFormSubscription.unsubscribe();
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
    this.typeForm = this._fb.group({
      type: ['tracker']
    });
  }

  get type(): FormControl {
    return this.typeForm.get('type') as FormControl;
  }

  formListener() {
    this.typeFormSubscription = this.type.valueChanges.subscribe(value => {
      this._router.navigate(['dashboard', 'home'],
        { queryParams: { type: value } });
      if (value === 'sld') {
        this._store.dispatch(new dashboardActions.FetchDashboardDataAction('sld'));
      } else {
        this._store.dispatch(new dashboardActions.FetchDashboardDataAction('tracker'));
      }
    });
    this.graphFormSubscription = this.certificateForm.valueChanges.subscribe(value => {
      if (this.type.value === 'sld') {
        this._store.dispatch(new dashboardActions.FetchMFGCertificateGraphDashboardDataAction(value));
      } else {
        this._store.dispatch(new dashboardActions.FetchMFGTrackerCertificateGraphDashboardDataAction(value));
      }
    });
    this.tableFormSubscription = this.certificateTableForm.get('period').valueChanges.subscribe(value => {
      if (this.type.value === 'sld') {
        this._store.dispatch(new dashboardActions.FetchMFGCertificateTableDashboardDataAction({
          period: value
        }));
      } else {
        this._store.dispatch(new dashboardActions.FetchMFGTrackerCertificateTableDashboardDataAction({
          period: value
        }));
      }
    });
  }

  getStateData(): any[] {
    if (!this.certificateTableData) {
      return [];
    }
    if (!this.certificateTableForm.get('search').value) {
      return this.certificateTableData;
    }
    return this.certificateTableData.filter(item => String(item[0]).toLowerCase()
      .includes(this.certificateTableForm.get('search').value.toLowerCase()));
  }

  getStateTotal(): number {
    let total = 0;
    this.certificateTableData.map(item => total += item[1]);
    return total;
  }
}
