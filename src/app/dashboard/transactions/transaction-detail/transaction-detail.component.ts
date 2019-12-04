import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as transactionActions from '../../../shared/actions/transaction.actions';
import { Transaction } from '../../../shared/models';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  public transaction: Transaction = new Transaction({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this._store.dispatch(new transactionActions.FetchTransactionAction(params['id']));
      } else {
        this._router.navigate(['dashboard', 'transaction']);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentTransaction).subscribe(transaction => this.transaction = transaction);
  }
}
