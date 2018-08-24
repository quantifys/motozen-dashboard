import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as requisitionOrderActions from '../../../shared/actions/requisition-order.actions';

@Component({
  templateUrl: './requisition-order-controls.component.html',
})
export class RequisitionOrderDeleteComponent {

  public type: string = "delete";

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<RequisitionOrderDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new requisitionOrderActions.DeleteRequisitionOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './requisition-order-controls.component.html',
})
export class RequisitionOrderOpenComponent {

  public type: string = "open";

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<RequisitionOrderOpenComponent>
  ) { }

  action() {
    this._store.dispatch(new requisitionOrderActions.OpenRequisitionOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './requisition-order-controls.component.html',
})
export class RequisitionOrderCloseComponent {

  public type: string = "close";

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<RequisitionOrderCloseComponent>
  ) { }

  action() {
    this._store.dispatch(new requisitionOrderActions.CloseRequisitionOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
