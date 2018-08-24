import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as requisitionOrderActions from '../../../shared/actions/requisition-order.actions';
import { RequisitionOrder, User } from '../../../shared/models';
import { RequisitionOrderOpenComponent, RequisitionOrderCloseComponent, RequisitionOrderDeleteComponent } from '../requisition-order-controls/requisition-order-controls.component';

@Component({
  selector: 'app-requisition-order-detail',
  templateUrl: './requisition-order-detail.component.html',
  styleUrls: ['./requisition-order-detail.component.scss']
})
export class RequisitionOrderDetailComponent implements OnInit {

  private userSubscription$: Subscription = new Subscription();
  private routerSubscription$: Subscription = new Subscription();
  private requisitionOrderSubscription$: Subscription = new Subscription();
  public requisitionOrder: RequisitionOrder = new RequisitionOrder({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new requisitionOrderActions.FetchRequisitionOrderAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "requisition-orders"]);
      }
    });
  }

  ngOnInit() {
    this.requisitionOrderSubscription$ = this._store.select(fromRoot.getCurrentRequisitionOrder).subscribe(requisitionOrder => this.requisitionOrder = requisitionOrder);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
    this.requisitionOrderSubscription$.unsubscribe();
  }

  openRequisitionOrder() {
    this.bottomSheet.open(RequisitionOrderOpenComponent);
  }

  closeRequisitionOrder() {
    this.bottomSheet.open(RequisitionOrderCloseComponent);
  }

  deleteRequisitionOrder() {
    this.bottomSheet.open(RequisitionOrderDeleteComponent);
  }

}
