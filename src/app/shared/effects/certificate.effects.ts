import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromCertificate from '../actions/certificate.actions';

@Injectable()
export class CertificateEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  fetchCertificates$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.FETCH_ALL_CERTIFICATES_ACTION),
    mergeMap((action: fromCertificate.FetchAllCertificatesAction) => this._tokenService.post('certificates/list', action.payload)
      .pipe(map(response => new fromCertificate.FetchAllCertificatesCompleteAction(response.json().message),
        catchError(error => of(new fromCertificate.FetchAllCertificatesFailedAction(error.json().message)))))));

  @Effect()
  fetchCertificate$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.FETCH_CERTIFICATE_ACTION),
    mergeMap((action: fromCertificate.FetchCertificateAction) => this._tokenService.get(`certificates/${action.payload}`)
      .pipe(map(response => new fromCertificate.FetchCertificateCompleteAction(response.json().message),
        catchError(error => of(new fromCertificate.FetchCertificateFailedAction(error.json().message)))))));

  @Effect()
  filterCertificate$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.ISSUE_CERTIFICATE_ACTION),
    mergeMap((action: fromCertificate.IssueCertificateAction) => this._tokenService.post(`certificates/${action.payload}/issue`, null)
      .pipe(map(response => new fromCertificate.IssueCertificateCompleteAction(response.json().message),
        catchError(error => of(new fromCertificate.IssueCertificateFailedAction(error.json().message)))))));

  @Effect()
  createNewCertificate$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.CREATE_CERTIFICATE_ACTION),
    mergeMap((action: fromCertificate.CreateCertificateAction) => this._tokenService.post('certificates', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "certificates", "view"], { queryParams: { id: response.json().message.id } })
        return new fromCertificate.CreateCertificateCompleteAction(response.json().message)
      },
        catchError(error => of(new fromCertificate.CreateCertificateFailedAction(error.json().message)))))));

  @Effect()
  deleteCertificate$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.DELETE_CERTIFICATE_ACTION),
    mergeMap((action: fromCertificate.DeleteCertificateAction) => this._tokenService.delete(`certificates/${action.payload}`)
      .pipe(map(response => new fromCertificate.DeleteCertificateCompleteAction(response.json().message),
        catchError(error => of(new fromCertificate.DeleteCertificateFailedAction(error.json().message)))))));

  @Effect()
  updateCertificate$: Observable<Action> = this._action$.pipe(ofType(fromCertificate.UPDATE_CERTIFICATE_ACTION),
    mergeMap((action: fromCertificate.UpdateCertificateAction) => this._tokenService.patch(`certificates/${action.payload.certificate_item.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "certificates", "view"], { queryParams: { id: response.json().message.id } });
        return new fromCertificate.UpdateCertificateCompleteAction(response.json().message);
      },
        catchError(error => of(new fromCertificate.UpdateCertificateFailedAction(error.json().message)))))));

}