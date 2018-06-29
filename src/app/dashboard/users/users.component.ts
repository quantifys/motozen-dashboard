import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { Router } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      // if (user.role == 'manufacturer') {
      //   this._router.navigate(["dashboard", "users"], {queryParams: {type: 'employees'}});
      // } else if (user.role == 'sales'){
      //   this._router.navigate(["dashboard", "users"], {queryParams: {type: 'distributor'}});
      // } else if (user.role == 'human_resource'){
      //   this._router.navigate(["dashboard", "users"], {queryParams: {type: 'store_purchases'}});
      // }
    });
  }

  ngOnInit() {
  }

}
