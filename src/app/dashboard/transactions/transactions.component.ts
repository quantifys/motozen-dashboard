import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as transactionActions from '../../shared/actions/transaction.actions';
import { User, Transaction } from '../../shared/models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  public loggedUser: User = new User({});
  private userSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private transactionSubscription$: Subscription = new Subscription();
  public transactions: Transaction[] = [];
  public queryParams: any = {};
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      this.checkParams();
    });
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"]) {
        this.fetchTransactions();
      }
    });
  }

  ngOnInit() {
    this.transactionSubscription$ = this._store.select(fromRoot.getAllTransactions).subscribe(transactions => {
      this.loading = false;
      this.transactions = transactions;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getTransactionPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.transactionSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  checkParams() {
    if (this.loggedUser.role) {
      if (this.loggedUser.role == 'manufacturer' || this.loggedUser.role == 'accounts') {
        let newParams: any = {};
        if (!this._activatedRoute.snapshot.queryParams["page"]) {
          newParams["page"] = 1;
        } else {
          this.pageEvent.pageIndex = +this._activatedRoute.snapshot.queryParams["page"] - 1;
        }
        if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
          newParams["per_page"] = 10;
        } else {
          this.pageEvent.pageSize = +this._activatedRoute.snapshot.queryParams["per_page"];
        }
        this._router.navigate(["dashboard", "transactions"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } })
      } else {
        this._router.navigate(["dashboard", "403-forbidden"]);
      }
    }
  }

  fetchTransactions() {
    this.loading = true;
    this._store.dispatch(new transactionActions.FetchAllTransactionsAction(this.queryParams));
  }

}
