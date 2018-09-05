import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';

@Component({
  templateUrl: './certificate-controls.component.html',
})
export class CertificateDeleteComponent {

  public type: string = "delete";

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<CertificateDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new certificateActions.DeleteCertificateAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './certificate-controls.component.html',
})
export class CertificateIssueComponent {

  public type: string = "issue";

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<CertificateIssueComponent>
  ) { }

  action() {
    this._store.dispatch(new certificateActions.IssueCertificateAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}