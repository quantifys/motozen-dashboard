import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as vendorActions from '../../../shared/actions/vendor.actions';
import { Vendor, User } from '../../../shared/models';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  private routerSubscription$: Subscription = new Subscription();
  private vendorSubscription$: Subscription = new Subscription();
  public vendor: Vendor = new Vendor({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new vendorActions.FetchVendorAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "vendors"]);
      }
    });
  }

  ngOnInit() {
    this.vendorSubscription$ = this._store.select(fromRoot.getCurrentVendor).subscribe(vendor => this.vendor = vendor);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
    this.vendorSubscription$.unsubscribe();
  }

}
