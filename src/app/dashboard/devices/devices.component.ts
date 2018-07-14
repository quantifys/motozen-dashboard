import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as deviceActions from '../../shared/actions/device.actions';
import { Device, User } from '../../shared/models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromRoot.State>
  ) {
    this._store.dispatch(new deviceActions.FetchAllDevicesAction);
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (!this._activatedRoute.snapshot.queryParams["status"]) {
        if (user.role == 'manufacturer') {
          this._router.navigate(["dashboard", "devices"], {queryParams: {status: 'unsold'}});
        } else if (user.role == 'distributor' || user.role == 'dealer') {
          this._router.navigate(["dashboard", "devices"], {queryParams: {status: 'sold'}});
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

}
