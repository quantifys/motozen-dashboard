import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromCertificate from '../actions/certificate.actions';
import { Certificate } from '../models';

@Injectable()
export class CertificateEffects {

  private certificate: Certificate = new Certificate({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentCertificate).subscribe(certificate => this.certificate = certificate);
  }

  @Effect()
  fetchCertificates$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_ALL_CERTIFICATES_ACTION).pipe(
    map((action: fromCertificate.FetchAllCertificatesAction) => action.payload),
    exhaustMap(body => this._tokenService.post('certificates/list', body)
      .pipe(
        map(response => new fromCertificate.FetchAllCertificatesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromCertificate.FetchAllCertificatesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.FetchCertificateAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`certificates/${id}`)
      .pipe(
        map(response => new fromCertificate.FetchCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  issueCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.ISSUE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.IssueCertificateAction) => action.payload),
    exhaustMap(() => this._tokenService.post(`certificates/${this.certificate.id}/issue`, null)
      .pipe(
        map(response => new fromCertificate.IssueCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.IssueCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCreateCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CREATE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.FetchCreateCertificateAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`devices/${id}/certificate/new`)
      .pipe(
        map(response => new fromCertificate.FetchCreateCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCreateCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.CREATE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.CreateCertificateAction) => action.payload),
    exhaustMap(body => this._tokenService.post('certificates', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'certificates', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromCertificate.CreateCertificateCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromCertificate.CreateCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.DELETE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.DeleteCertificateAction) => action),
    exhaustMap(() => this._tokenService.delete(`certificates/${this.certificate.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'certificates']);
          return new fromCertificate.DeleteCertificateCompleteAction(this.certificate.id);
        }),
        catchError(error => of(new fromCertificate.DeleteCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.UPDATE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.UpdateCertificateAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`certificates/${this.certificate.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'certificates', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromCertificate.UpdateCertificateCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromCertificate.UpdateCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCertificateFormdata$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CERTIFICATE_FORMDATA_ACTION).pipe(
    map((action: fromCertificate.FetchCertificateFormdataAction) => action.payload),
    exhaustMap(id => (!id ? this._tokenService.get('certificates/new') : this._tokenService.get(`certificates/${id}/edit`))
      .pipe(
        map(response => new fromCertificate.FetchCertificateFormdataCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCertificateFormdataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCertificateFilterFormdata$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CERTIFICATE_FILTER_FORMDATA_ACTION).pipe(
    map((action: fromCertificate.FetchCertificateFilterFormdataAction) => action),
    exhaustMap(() => this._tokenService.get('certificates/list/filter-data')
      .pipe(
        map(response => new fromCertificate.FetchCertificateFilterFormdataCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCertificateFilterFormdataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCertificateCSVReport$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CERTIFICATE_CSV_REPORT_ACTION).pipe(
    map((action: fromCertificate.FetchCertificateCSVReportAction) => action.payload),
    exhaustMap(body => this._tokenService.post('certificates/list/for-report', body)
      .pipe(
        map(response => new fromCertificate.FetchCertificateCSVReportCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCertificateCSVReportFailedAction(error.json().message)))
      ))
  );

  @Effect()
  checkCertificateUnique$: Observable<Action> = this._action$.ofType(fromCertificate.CERTIFICATE_CHECK_UNIQUE_ACTION).pipe(
    map((action: fromCertificate.CertificateCheckUniqueAction) => action.payload),
    exhaustMap(body => this._tokenService.post('certificates/check-unique', body)
      .pipe(
        map(response => new fromCertificate.CertificateCheckUniqueCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.CertificateCheckUniqueFailedAction(error.json().message)))
      ))
  );

}
