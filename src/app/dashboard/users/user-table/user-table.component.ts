import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
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
  public type: string = '';
  public loading: boolean = false;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.users.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.type = params["type"];
      let formData: any = null;
      if (params["type"] == 'employees' || params["type"] == 'customers') {
        formData = {
          group: params["type"]
        }
      } else {
        formData = {
          role: params["type"]
        };
      }
      this.loading = true;
      this._store.dispatch(new userActions.FilterUsersAction(formData));
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
