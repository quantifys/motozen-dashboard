import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';
import { Certificate } from '../../../shared/models';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent implements OnInit {

  public certificate: Certificate = new Certificate({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new certificateActions.FetchCertificateAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "devices"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentCertificate).subscribe(certificate => this.certificate = certificate);
  }

}
