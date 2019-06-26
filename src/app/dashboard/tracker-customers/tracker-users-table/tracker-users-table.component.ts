import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as vtsUsersActions from '../../../shared/actions/vts-user.actions';
import { VtsUser } from '../../../shared/models';

@Component({
  selector: 'app-tracker-users-table',
  templateUrl: './tracker-users-table.component.html',
  styleUrls: ['./tracker-users-table.component.scss']
})
export class TrackerUsersTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private userSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public users: VtsUser[] = [];
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
        this.fetchUsers();
      }
    });
  }

  ngOnInit() {
    this.userSubscription$ = this._store.select(fromRoot.getAllVtsUsers).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getVtsUserPageStatus)
      .subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.userSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchUsers() {
    this.loading = true;
    this._store.dispatch(new vtsUsersActions.FetchAllVtsUsersAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(['dashboard', 'vts-users'], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
