import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/tracker-certificate.actions';
import { TrackerCertificate, User } from '../../../shared/models';
import {
  CertificateIssueComponent,
  CertificateDeleteComponent,
  CertificateRenewComponent
} from '../tracker-certificate-controls/tracker-certificate-controls.component';
import { TrackerCertificateService } from 'src/app/shared/services/tracker-certificate.service';

@Component({
  selector: 'app-tracker-certificate-details',
  templateUrl: './tracker-certificate-details.component.html',
  styleUrls: ['./tracker-certificate-details.component.scss']
})
export class TrackerCertificateDetailsComponent implements OnInit {

  public certificate: TrackerCertificate = new TrackerCertificate({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet,
    private _certificateService: TrackerCertificateService
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this._store.dispatch(new certificateActions.FetchTrackerCertificateAction(params['id']));
      } else {
        this._router.navigate(['dashboard', 'devices']);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentTrackerCertificate).subscribe(certificate => this.certificate = certificate);
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

  renewCertificate() {
    this.bottomSheet.open(CertificateRenewComponent);
  }

}
