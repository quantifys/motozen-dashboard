import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { User } from '../../../shared/models';
import { UserDeleteComponent, UserChangePasswordComponent } from '../user-control/user-control.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  public user: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this._store.select(fromRoot.getCurrentUser).subscribe(user => this.user = user);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new userActions.FetchUserAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "users"]);
      }
    });
  }

  deleteUser() {
    this.bottomSheet.open(UserDeleteComponent);
  }

  changePassword() {
    this.bottomSheet.open(UserChangePasswordComponent);
  }

}
