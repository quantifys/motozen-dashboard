import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as vtsUserActions from '../../../shared/actions/vts-user.actions';

@Component({
  selector: 'app-tracker-customers-edit',
  templateUrl: './tracker-customers-edit.component.html',
  styleUrls: ['./tracker-customers-edit.component.scss']
})
export class TrackerCustomersEditComponent implements OnInit, OnDestroy {

  public addUser = false;
  public userForm: FormGroup;
  public userSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location
  ) {
    this._store.dispatch(new vtsUserActions.ClearVtsUserAction);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addUser = false;
        this._store.dispatch(new vtsUserActions.FetchVtsUserAction(params['id']));
      } else {
        this.addUser = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.userSubscription$ = this._store.select(fromRoot.getCurrentVtsUser).subscribe(user => this.userForm.patchValue(user));
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  buildForm() {
    this.userForm = this._fb.group({
      id: null,
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.userForm.get('phone') as FormControl;
  }

  saveChanges() {
    if (this.addUser) {
      this._store.dispatch(new vtsUserActions.CreateVtsUserAction({
        name: this.name.value,
        email: this.email.value,
        phone: '+91' + this.phone.value
      }));
    } else {
      this._store.dispatch(new vtsUserActions.UpdateVtsUserAction({ user: this.userForm.value }));
    }
  }

}
