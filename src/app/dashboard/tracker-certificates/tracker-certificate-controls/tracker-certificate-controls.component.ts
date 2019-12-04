import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/tracker-certificate.actions';

@Component({
  templateUrl: './tracker-certificate-controls.component.html',
})
export class CertificateDeleteComponent {

  public type = 'delete';

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<CertificateDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new certificateActions.DeleteTrackerCertificateAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './tracker-certificate-controls.component.html',
})
export class CertificateIssueComponent {

  public type = 'issue';

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<CertificateIssueComponent>
  ) { }

  action() {
    this._store.dispatch(new certificateActions.IssueTrackerCertificateAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}

@Component({
  templateUrl: './tracker-certificate-controls.component.html',
})
export class CertificateRenewComponent {

  public type = 'renew';

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<CertificateRenewComponent>
  ) { }

  action() {
    this._store.dispatch(new certificateActions.RenewTrackerCertificateAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
