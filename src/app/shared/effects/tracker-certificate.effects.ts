import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromTrackerCertificate from '../actions/tracker-certificate.actions';
import { TrackerCertificate } from '../models';

@Injectable()
export class TrackerCertificateEffects {

  private tracker_certificate: TrackerCertificate = new TrackerCertificate({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentTrackerCertificate).subscribe(tracker_certificate =>
      this.tracker_certificate = tracker_certificate);
  }

  @Effect()
  fetchTrackerCertificates$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.FETCH_ALL_TRACKER_CERTIFICATES_ACTION).pipe(
    map((action: fromTrackerCertificate.FetchAllTrackerCertificatesAction) => action.payload),
    exhaustMap(body => this._tokenService.post('tracker_certificates/list', body)
      .pipe(
        map(response => new fromTrackerCertificate.FetchAllTrackerCertificatesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromTrackerCertificate.FetchAllTrackerCertificatesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.FETCH_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.FetchTrackerCertificateAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`tracker_certificates/${id}`)
      .pipe(
        map(response => new fromTrackerCertificate.FetchTrackerCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromTrackerCertificate.FetchTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  issueTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.ISSUE_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.IssueTrackerCertificateAction) => action.payload),
    exhaustMap(() => this._tokenService.post(`tracker_certificates/${this.tracker_certificate.id}/issue`, null)
      .pipe(
        map(response => new fromTrackerCertificate.IssueTrackerCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromTrackerCertificate.IssueTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  renewTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.RENEW_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.RenewTrackerCertificateAction) => action.payload),
    exhaustMap(() => this._tokenService.post(`tracker_certificates/${this.tracker_certificate.id}/renew`, null)
      .pipe(
        map(response => new fromTrackerCertificate.RenewTrackerCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromTrackerCertificate.RenewTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCreateTrackerCertificate$: Observable<Action> =
    this._action$.ofType(fromTrackerCertificate.FETCH_CREATE_TRACKER_CERTIFICATE_ACTION).pipe(
      map((action: fromTrackerCertificate.FetchCreateTrackerCertificateAction) => action.payload),
      exhaustMap(id => this._tokenService.get(`devices/${id}/tracker_certificate/new`)
        .pipe(
          map(response => new fromTrackerCertificate.FetchCreateTrackerCertificateCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerCertificate.FetchCreateTrackerCertificateFailedAction(error.json().message)))
        ))
    );

  @Effect()
  createNewTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.CREATE_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.CreateTrackerCertificateAction) => action.payload),
    exhaustMap(body => this._tokenService.post('tracker_certificates', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'vts-certificates', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromTrackerCertificate.CreateTrackerCertificateCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromTrackerCertificate.CreateTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.DELETE_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.DeleteTrackerCertificateAction) => action),
    exhaustMap(() => this._tokenService.delete(`tracker_certificates/${this.tracker_certificate.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'tracker_certificates']);
          return new fromTrackerCertificate.DeleteTrackerCertificateCompleteAction(this.tracker_certificate.id);
        }),
        catchError(error => of(new fromTrackerCertificate.DeleteTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateTrackerCertificate$: Observable<Action> = this._action$.ofType(fromTrackerCertificate.UPDATE_TRACKER_CERTIFICATE_ACTION).pipe(
    map((action: fromTrackerCertificate.UpdateTrackerCertificateAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`tracker_certificates/${this.tracker_certificate.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'tracker_certificates', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromTrackerCertificate.UpdateTrackerCertificateCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromTrackerCertificate.UpdateTrackerCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchTrackerCertificateFormdata$: Observable<Action> =
    this._action$.ofType(fromTrackerCertificate.FETCH_TRACKER_CERTIFICATE_FORMDATA_ACTION).pipe(
      map((action: fromTrackerCertificate.FetchTrackerCertificateFormdataAction) => action.payload),
      exhaustMap(id => (!id ? this._tokenService.get('tracker_certificates/new') :
        this._tokenService.get(`tracker_certificates/${id}/edit`))
        .pipe(
          map(response => new fromTrackerCertificate.FetchTrackerCertificateFormdataCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerCertificate.FetchTrackerCertificateFormdataFailedAction(error.json().message)))
        ))
    );

  @Effect()
  fetchTrackerCertificateFilterFormdata$: Observable<Action> =
    this._action$.ofType(fromTrackerCertificate.FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_ACTION).pipe(
      map((action: fromTrackerCertificate.FetchTrackerCertificateFilterFormdataAction) => action),
      exhaustMap(() => this._tokenService.get('tracker_certificates/list/filter-data')
        .pipe(
          map(response => new fromTrackerCertificate.FetchTrackerCertificateFilterFormdataCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerCertificate.FetchTrackerCertificateFilterFormdataFailedAction(error.json().message)))
        ))
    );

  @Effect()
  fetchTrackerCertificateCSVReport$: Observable<Action> =
    this._action$.ofType(fromTrackerCertificate.FETCH_TRACKER_CERTIFICATE_CSV_REPORT_ACTION).pipe(
      map((action: fromTrackerCertificate.FetchTrackerCertificateCSVReportAction) => action.payload),
      exhaustMap(body => this._tokenService.post('tracker_certificates/list/for-report', body)
        .pipe(
          map(response => new fromTrackerCertificate.FetchTrackerCertificateCSVReportCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerCertificate.FetchTrackerCertificateCSVReportFailedAction(error.json().message)))
        ))
    );

  @Effect()
  checkTrackerCertificateUnique$: Observable<Action> =
    this._action$.ofType(fromTrackerCertificate.TRACKER_CERTIFICATE_CHECK_UNIQUE_ACTION).pipe(
      map((action: fromTrackerCertificate.TrackerCertificateCheckUniqueAction) => action.payload),
      exhaustMap(body => this._tokenService.post('tracker_certificates/check-unique', body)
        .pipe(
          map(response => new fromTrackerCertificate.TrackerCertificateCheckUniqueCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerCertificate.TrackerCertificateCheckUniqueFailedAction(error.json().message)))
        ))
    );

}
