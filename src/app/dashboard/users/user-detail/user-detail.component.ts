import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { User } from '../../../shared/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromRoot.State>,
    public _location: Location
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

  ngOnInit() {
  }

}
