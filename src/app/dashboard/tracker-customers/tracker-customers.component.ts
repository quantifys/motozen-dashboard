import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';

@Component({
  selector: 'app-tracker-customers',
  templateUrl: './tracker-customers.component.html',
  styleUrls: ['./tracker-customers.component.scss']
})
export class TrackerCustomersComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role === 'distributor' || user.role === 'dealer') {
          const newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams['page']) {
            newParams['page'] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams['per_page']) {
            newParams['per_page'] = 10;
          }
          this._router.navigate(['dashboard', 'vts-users'],
            { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(['403-forbidden']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

}
