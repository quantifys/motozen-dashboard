import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import * as fromRoot from '../../shared/reducers';
import * as certificateActions from '../../shared/actions/certificate.actions';
import { User } from '../../shared/models';
import { CertificateFilterComponent } from './certificate-filter/certificate-filter.component';
import { CsvReportService } from '../../shared/services/csv-report.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public searchForm: FormGroup;

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private _csvReportService: CsvReportService
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role == 'manufacturer' || user.role == 'distributor' || user.role == 'dealer' || user.role == 'sales' || user.role == 'rto' || user.role == 'admin') {
          let newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams["status"]) {
            newParams["status"] = "can_modify";
          }
          if (!this._activatedRoute.snapshot.queryParams["page"]) {
            newParams["page"] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
            newParams["per_page"] = 10;
          }
          if (this._activatedRoute.snapshot.queryParams["reg"] || this._activatedRoute.snapshot.queryParams["sld"] || this._activatedRoute.snapshot.queryParams["cert"]) {
            this.search_type.patchValue(this._activatedRoute.snapshot.queryParams["reg"] ? "reg" : this._activatedRoute.snapshot.queryParams["cert"] ? "cert" : "sld", { emitEvent: false });
            this.search.patchValue(this._activatedRoute.snapshot.queryParams["reg"] ? this._activatedRoute.snapshot.queryParams["reg"] : this._activatedRoute.snapshot.queryParams["cert"] ? this._activatedRoute.snapshot.queryParams["cert"] : this._activatedRoute.snapshot.queryParams["sld"], { emitEvent: false });
          }
          this._router.navigate(["dashboard", "certificates"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(["403-forbidden"]);
        }
      }
    });
    this._csvReportService.subscribeToCertificateReport();
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this._csvReportService.unsubscribe();
  }

  buildForm() {
    this.searchForm = this._fb.group({
      search: '',
      search_type: 'cert'
    });
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  get search_type(): FormControl {
    return this.searchForm.get('search_type') as FormControl;
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type }
  }

  openFilters() {
    this.bottomSheet.open(CertificateFilterComponent);
  }

  formListener() {
    this.search.valueChanges.pipe(debounce(() => timer(400))).subscribe(value => this.makeSearchRequest());
    this.search_type.valueChanges.subscribe(value => this.makeSearchRequest());
  }

  makeSearchRequest() {
    this._router.navigate(["dashboard", "certificates"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        reg: (this.search_type.value == 'reg' && this.search.value != '') ? this.search.value : null,
        certificate_number: (this.search_type.value == 'cert' && this.search.value != '') ? this.search.value : null,
        sld: (this.search_type.value == 'sld' && this.search.value != '') ? this.search.value : null
      }
    });
  }

  getSearchPlaceholder(): string {
    switch (this.search_type.value) {
      case 'reg':
        return "Search by Registration No.";
      case 'sld':
        return "Search by SLD No.";
      default:
        return "Search by Certificate No.";
    }
  }

  exportCsv() {
    this._store.dispatch(new certificateActions.FetchCertificateCSVReportAction(this._activatedRoute.snapshot.queryParams));
  }

}
