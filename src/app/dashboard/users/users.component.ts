import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role == 'manufacturer' || user.role == 'sales' || user.role == 'human_resource' || user.role == 'admin') {
          let newParams: any = {};
          if (user.role == 'sales') {
            (!this._activatedRoute.snapshot.queryParams["role"]) ? newParams["role"] = 'distributor' : null
            newParams["group"] = null;
          } else if (user.role == 'human_resource') {
            (!this._activatedRoute.snapshot.queryParams["role"]) ? newParams["role"] = 'store_purchases' : null
            newParams["group"] = null;
          } else {
            (!this._activatedRoute.snapshot.queryParams["group"]) ? newParams["group"] = 'employees' : null
            newParams["role"] = null;
          }
          if (!this._activatedRoute.snapshot.queryParams["page"]) {
            newParams["page"] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
            newParams["per_page"] = 10;
          }
          this._router.navigate(["dashboard", "users"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(["403-forbidden"]);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  getQueryParams(type: string): any {
    if (type == 'employees' || type == 'customers') {
      return { ...this._activatedRoute.snapshot.queryParams, group: type, role: null };
    } else {
      return { ...this._activatedRoute.snapshot.queryParams, role: type, group: null };
    }
  }

}
