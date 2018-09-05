import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as incomeActions from '../../../shared/actions/income.actions';
import { Cost } from '../../../shared/models';

@Component({
  selector: 'income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.scss']
})
export class IncomeTableComponent implements OnInit {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private incomeSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public incomes: Cost[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["category"]) {
        this.fetchCosts();
      }
    });
  }

  ngOnInit() {
    this.incomeSubscription$ = this._store.select(fromRoot.getAllIncomes).subscribe(incomes => {
      this.loading = false;
      this.incomes = incomes;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getIncomePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.incomeSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchCosts() {
    this.loading = true;
    this._store.dispatch(new incomeActions.FetchAllIncomesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "incomes"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
