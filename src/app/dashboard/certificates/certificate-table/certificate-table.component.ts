import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';
import { Certificate } from '../../../shared/models';

@Component({
  selector: 'certificate-table',
  templateUrl: './certificate-table.component.html',
  styleUrls: ['./certificate-table.component.scss']
})
export class CertificateTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public certificates: Certificate[] = [];
  public loading: boolean = false;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.certificates.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.fetchCertificates();
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getAllCertificates).subscribe(certificates => {
      this.loading = false;
      this.certificates = certificates;
    });
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }


  fetchCertificates() {
    let formData: any = {
      status: this.queryParams["status"] ? this.queryParams["status"] : null,
    };
    this._store.dispatch(new certificateActions.FetchAllCertificatesAction(formData));
  }

}
