import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/tracker-certificate.actions';
import { TrackerCertificate } from '../../../shared/models';

@Component({
  selector: 'app-tracker-certificate-table',
  templateUrl: './tracker-certificate-table.component.html',
  styleUrls: ['./tracker-certificate-table.component.scss']
})
export class TrackerCertificateTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private certificatesSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public trackerCertificates: TrackerCertificate[] = [];
  public loading = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params['page']) {
        this.pageEvent.pageIndex = +params['page'] - 1;
      }
      if (params['per_page']) {
        this.pageEvent.pageSize = +params['per_page'];
      }
      if (params['page'] && params['per_page'] && params['status']) {
        this.fetchTrackerCertificates();
      }
    });
  }

  ngOnInit() {
    this.certificatesSubscription$ = this._store.select(fromRoot.getAllTrackerCertificates).subscribe(certificates => {
      this.loading = false;
      this.trackerCertificates = certificates;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getTrackerCertificatePageStatus)
      .subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
    this.certificatesSubscription$.unsubscribe();
  }


  fetchTrackerCertificates() {
    this.loading = true;
    this._store.dispatch(new certificateActions.FetchAllTrackerCertificatesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(['dashboard', 'vts-certificates'], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}
