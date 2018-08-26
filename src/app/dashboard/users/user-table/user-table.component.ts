import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
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
    this.initializer();
    this._store.select(fromRoot.getAllUsers).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

  buildForm() {
    this.passwordForm = this._fb.group({
      id: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6)]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
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
    this._store.dispatch(new userActions.FilterUsersAction(this.queryParams));
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

  deleteUser(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new userActions.DeleteUserAction(id));
      }
    });
  }

  changePassword(id: number) {
    this.id.patchValue(id, { emitEvent: false });
    this._store.dispatch(new userActions.OpenUserModalAction);
  }

  closeUserModal() {
    this._store.dispatch(new userActions.CloseUserModalAction);
  }

  saveChanges() {
    this._store.dispatch(new userActions.UpdateUserAction({
      user: this.passwordForm.value
    }));
  }

  initializer() {
    this._store.select(fromRoot.showUserModal).subscribe(res => res ? $("#userModal").modal("show") : $("#userModal").modal("hide"));
    $("#userModal").on("hidden.bs.modal", () => this.closeUserModal());
  }

}
