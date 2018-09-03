import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { User } from '../../../shared/models';
import { PasswordValidation } from '../../../shared/validators/password.validator';

declare var $: any;

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnDestroy {

  public passwordForm: FormGroup;
  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  public users: User[] = [];
  public queryParams: any = {};
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && (params["role"] || params["group"])) {
        this.fetchUsers();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this._store.select(fromRoot.getAllUsers).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getUserPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  buildForm() {
    this.passwordForm = this._fb.group(
      {
        id: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(6)]],
        password_confirmation: [null, [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  get id(): FormControl {
    return this.passwordForm.get("id") as FormControl;
  }
  get password(): FormControl {
    return this.passwordForm.get("password") as FormControl;
  }
  get password_confirmation(): FormControl {
    return this.passwordForm.get("password_confirmation") as FormControl;
  }

  fetchUsers() {
    this.loading = true;
    this._store.dispatch(new userActions.FetchAllUsersAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "users"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

  saveChanges() {
    this._store.dispatch(new userActions.UpdateUserAction({
      user: this.passwordForm.value
    }));
  }

}
