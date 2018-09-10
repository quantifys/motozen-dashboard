import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

import * as fromRoot from '../shared/reducers';
import * as userActions from '../shared/actions/user.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public version: string = environment.VERSION;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._tokenService.userSignedIn() ? this._router.navigate(["dashboard"]) : null
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginClicked() {
    this._store.dispatch(new userActions.LoginUserAction(this.loginForm.value));
  }

}
