import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as expenseActions from '../../../shared/actions/expense.actions';
import { Cost } from '../../../shared/models';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

  public expense: Cost = new Cost({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new expenseActions.FetchExpenseAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "expense"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentExpense).subscribe(expense => this.expense = expense);
  }

}
