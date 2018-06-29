import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { User } from '../../../shared/models';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public users: User[] = [];
  public type: string = '';

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.type = params["type"];
      let formData: any = null;
      if (params["type"] == 'employees' || params["type"] == 'customers') {
        formData = {
          group: params["type"]
        }
      } else {
        formData = {
          role: params["type"]
        };
      }
      this._store.dispatch(new userActions.FetchAllUsersAction(formData));
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getUsers).subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

}
