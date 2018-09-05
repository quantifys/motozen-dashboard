import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';

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
    public bottomSheet: MatBottomSheet,
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

  deleteExpense() {
    this.bottomSheet.open(ExpenseDeleteComponent);
  }

}

@Component({
  template: `<div class="container-fluid mt-3">
  <h5 class="text-center border-bottom mb-3 pb-2">Are you sure you want to delete this expense?</h5>
  <div class="text-center mb-3">
    <button mat-stroked-button color="warn" (click)="action()">Yes</button>
    <button class="ml-1" mat-button (click)="close()">No</button>
  </div>
</div>`
})
export class ExpenseDeleteComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<ExpenseDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new expenseActions.DeleteExpenseAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}