import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material';
import swal from 'sweetalert2';

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
  private pageSubscription$: Subscription = new Subscription();
  private certificatesSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public certificates: Certificate[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["status"]) {
        this.fetchCertificates();
      }
    });
  }

  ngOnInit() {
    this.certificatesSubscription$ = this._store.select(fromRoot.getAllCertificates).subscribe(certificates => {
      this.loading = false;
      this.certificates = certificates;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getCertificatePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
    this.certificatesSubscription$.unsubscribe();
  }


  fetchCertificates() {
    this.loading = true;
    this._store.dispatch(new certificateActions.FetchAllCertificatesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "certificates"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
