import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as transactionActions from '../../../shared/actions/transaction.actions';
import { Transaction } from '../../../shared/models';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private transactionSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public transactions: Transaction[] = [];
  public loading = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params['page']) {
        this.pageEvent.pageIndex = +params['page'] - 1;
      }
      if (params['per_page']) {
        this.pageEvent.pageSize = +params['per_page'];
      }
      if (params['page'] && params['per_page']) {
        this.fetchInventories();
      }
    });
  }

  ngOnInit() {
    this.transactionSubscription$ = this._store.select(fromRoot.getAllTransactions).subscribe(transactions => {
      this.loading = false;
      this.transactions = transactions;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getTransactionPageStatus)
      .subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.transactionSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchInventories() {
    this.loading = true;
    this._store.dispatch(new transactionActions.FetchAllTransactionsAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(['dashboard', 'transactions'], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
