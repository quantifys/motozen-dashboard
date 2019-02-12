import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { PasswordValidation } from '../../../shared/validators/password.validator';

@Component({
  templateUrl: './user-control.component.html'
})
export class UserDeleteComponent {

  public type = true;

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<UserDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new userActions.DeleteUserAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './user-control.component.html',
})
export class UserChangePasswordComponent implements OnInit {

  public type = false;
  public passwordForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<UserChangePasswordComponent>
  ) { }

  ngOnInit() {
    this.passwordForm = this._fb.group({
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]
    },
    {
      validator: PasswordValidation.MatchPassword
    });
  }

  get password_confirmation(): FormControl {
    return this.passwordForm.get('password_confirmation') as FormControl;
  }

  action() {
    this._store.dispatch(new userActions.UpdateUserAction({
      user: this.passwordForm.value
    }));
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
