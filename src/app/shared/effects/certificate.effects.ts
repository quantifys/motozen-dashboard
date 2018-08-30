import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators';

import * as fromCertificate from '../actions/certificate.actions';
import { Certificate } from '../models';

@Injectable()
export class CertificateEffects {

  private certificate: Certificate = new Certificate({});

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

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
    exhaustMap(id => this._tokenService.post(`certificates/${id}/issue`, null)
      .pipe(
        map(response => new fromCertificate.IssueCertificateCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.IssueCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.CREATE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.CreateCertificateAction) => action.payload),
    exhaustMap(body => this._tokenService.post('certificates', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "certificates", "view"], { queryParams: { id: response.json().message.id } });
          return new fromCertificate.CreateCertificateCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromCertificate.CreateCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteCertificate$: Observable<Action> = this._action$.ofType(fromCertificate.DELETE_CERTIFICATE_ACTION).pipe(
    map((action: fromCertificate.DeleteCertificateAction) => action.payload),
    exhaustMap(id => this._tokenService.delete(`certificates/${id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "certificates"]);
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
          this._router.navigate(["dashboard", "certificates", "view"], { queryParams: { id: response.json().message.id } });
          return new fromCertificate.UpdateCertificateCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromCertificate.UpdateCertificateFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchCertificateFormdata$: Observable<Action> = this._action$.ofType(fromCertificate.FETCH_CERTIFICATE_FORMDATA_ACTION).pipe(
    map((action: fromCertificate.FetchCertificateFormdataAction) => action),
    exhaustMap(() => this._tokenService.get("certificates/new")
      .pipe(
        map(response => new fromCertificate.FetchCertificateFormdataCompleteAction(response.json().message)),
        catchError(error => of(new fromCertificate.FetchCertificateFormdataFailedAction(error.json().message)))
      ))
  );

}