import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as expenseActions from '../../../shared/actions/expense.actions';
import { Cost } from '../../../shared/models';

@Component({
  selector: 'expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private expenseSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public expenses: Cost[] = [];
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
    this.expenseSubscription$ = this._store.select(fromRoot.getAllExpenses).subscribe(expenses => {
      this.loading = false;
      this.expenses = expenses;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getExpensePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.expenseSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchCosts() {
    this.loading = true;
    this._store.dispatch(new expenseActions.FetchAllExpensesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "expenses"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
