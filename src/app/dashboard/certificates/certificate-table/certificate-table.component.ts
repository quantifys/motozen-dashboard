import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';
import { Certificate, PageData } from '../../../shared/models';

@Component({
  selector: 'certificate-table',
  templateUrl: './certificate-table.component.html',
  styleUrls: ['./certificate-table.component.scss']
})
export class CertificateTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public certificates: Certificate[] = [];
  public pageData: BehaviorSubject<PageData> = new BehaviorSubject(new PageData({}));
  public loading: boolean = false;
  public config: PaginationInstance = {
    id: 'certificatesPaginate',
    itemsPerPage: this.pageData.value.per_page,
    currentPage: 1,
    totalItems: this.certificates.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.pageData.subscribe(data => {
      this.config.itemsPerPage = data.per_page;
      this.config.totalItems = data.total;
    });
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
    this._store.select(fromRoot.getCertificatePageStatus).subscribe(pageData => this.pageData.next(pageData));
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }


  fetchCertificates() {
    let formData: any = {
      status: this.queryParams["status"] ? this.queryParams["status"] : null,
      page: this.config.currentPage,
      per_page: 15
    };
    this._store.dispatch(new certificateActions.FetchAllCertificatesAction(formData));
  }

  deleteCertificate(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete certificate!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new certificateActions.DeleteCertificateAction(id));
      }
    });
  }

  getPage(page: number) {
    this.config.currentPage = page;
    this.fetchCertificates();
  }

}
