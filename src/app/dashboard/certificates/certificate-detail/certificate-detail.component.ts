import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';
import { Certificate, User } from '../../../shared/models';
import { CertificateIssueComponent, CertificateDeleteComponent } from '../certificate-controls/certificate-controls.component';
import { CertificateService } from '../../../shared/services/certificate.service';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent implements OnInit {

  public certificate: Certificate = new Certificate({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet,
    private _certificateService: CertificateService
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
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  issueCertificate() {
    this.bottomSheet.open(CertificateIssueComponent);
  }

  deleteCertificate() {
    this.bottomSheet.open(CertificateDeleteComponent);
  }

  certificateAction(type: boolean) {
    this._certificateService.certificateActions(type);
  }

}
