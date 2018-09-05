import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as salarySlipActions from '../../../shared/actions/salary-slip.actions';
import { SalarySlip } from '../../../shared/models';

@Component({
  selector: 'salary-slip-table',
  templateUrl: './salary-slip-table.component.html',
  styleUrls: ['./salary-slip-table.component.scss']
})
export class SalarySlipTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private salarySlipSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public salarySlips: SalarySlip[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["status"]) {
        this.fetchSalarySlips();
      }
    });
  }

  ngOnInit() {
    this.salarySlipSubscription$ = this._store.select(fromRoot.getAllSalarySlips).subscribe(salarySlips => {
      this.loading = false;
      this.salarySlips = salarySlips;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getSalarySlipPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.salarySlipSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchSalarySlips() {
    this.loading = true;
    this._store.dispatch(new salarySlipActions.FetchAllSalarySlipsAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "salary-slips"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
