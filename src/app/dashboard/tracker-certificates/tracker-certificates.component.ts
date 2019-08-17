import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import * as fromRoot from '../../shared/reducers';
import * as trackerCertificateActions from '../../shared/actions/tracker-certificate.actions';
import { User } from '../../shared/models';
import { TrackerCertificateFilterComponent } from './tracker-certificate-filter/tracker-certificate-filter.component';
import { CsvReportService } from '../../shared/services/csv-report.service';

@Component({
  selector: 'app-tracker-certificates',
  templateUrl: './tracker-certificates.component.html',
  styleUrls: ['./tracker-certificates.component.scss']
})
export class TrackerCertificatesComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public searchForm: FormGroup;
  @ViewChild('search') searchField: ElementRef;

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private _csvReportService: CsvReportService
  ) {
    this.buildForm();
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role === 'manufacturer'
          || user.role === 'distributor'
          || user.role === 'dealer'
          || user.role === 'sales'
          || user.role === 'rto'
          || user.role === 'admin') {
          const newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams['status']) {
            newParams['status'] = 'can_modify';
          }
          if (!this._activatedRoute.snapshot.queryParams['page']) {
            newParams['page'] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams['per_page']) {
            newParams['per_page'] = 10;
          }
          if (
            this._activatedRoute.snapshot.queryParams['reg']
            || this._activatedRoute.snapshot.queryParams['serial_no']
            || this._activatedRoute.snapshot.queryParams['engine']
            || this._activatedRoute.snapshot.queryParams['cert']
          ) {
            this.search_type.patchValue(this._activatedRoute.snapshot.queryParams['reg']
              ? 'reg' : this._activatedRoute.snapshot.queryParams['cert'] ? 'cert' : 'serial', { emitEvent: false });
            this.search.patchValue(this._activatedRoute.snapshot.queryParams['reg']
              ? this._activatedRoute.snapshot.queryParams['reg'] : this._activatedRoute.snapshot.queryParams['cert']
                ? this._activatedRoute.snapshot.queryParams['cert'] : this._activatedRoute.snapshot.queryParams['engine']
                  ? this._activatedRoute.snapshot.queryParams['engine'] : this._activatedRoute.snapshot.queryParams['serial_no'],
              { emitEvent: false });
          }
          this._router.navigate(['dashboard', 'vts-certificates'],
            { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(['403-forbidden']);
        }
      }
    });
    this._csvReportService.subscribeToCertificateReport();
  }

  ngOnInit() {
    this.formListener();
    this._router.events.subscribe(events => this.searchField.nativeElement.focus());
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
    return { ...this._activatedRoute.snapshot.queryParams, status: type };
  }

  openFilters() {
    this.bottomSheet.open(TrackerCertificateFilterComponent);
  }

  formListener() {
    this.search.valueChanges.pipe(debounce(() => timer(400))).subscribe(value => this.makeSearchRequest());
    this.search_type.valueChanges.subscribe(value => this.makeSearchRequest());
  }

  makeSearchRequest() {
    this._router.navigate(['dashboard', 'vts-certificates'], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        reg: (this.search_type.value === 'reg' && this.search.value !== '') ? this.search.value : null,
        certificate_number: (this.search_type.value === 'cert' && this.search.value !== '') ? this.search.value : null,
        serial_no: (this.search_type.value === 'serial' && this.search.value !== '') ? this.search.value : null,
        engine_number: (this.search_type.value === 'engine' && this.search.value !== '') ? this.search.value : null
      }
    });
  }

  getSearchPlaceholder(): string {
    switch (this.search_type.value) {
      case 'reg':
        return 'Search by Registration No.';
      case 'serial':
        return 'Search by Serial No.';
      case 'engine':
        return 'Search by Engine No.';
      default:
        return 'Search by Certificate No.';
    }
  }

  exportCsv() {
    this._store.dispatch(new trackerCertificateActions.FetchTrackerCertificateCSVReportAction(this._activatedRoute.snapshot.queryParams));
  }
}
