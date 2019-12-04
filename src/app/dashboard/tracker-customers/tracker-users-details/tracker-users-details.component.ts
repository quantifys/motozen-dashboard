import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as vtsUserActions from '../../../shared/actions/vts-user.actions';
import { VtsUser } from '../../../shared/models';

@Component({
  selector: 'app-tracker-users-details',
  templateUrl: './tracker-users-details.component.html',
  styleUrls: ['./tracker-users-details.component.scss']
})
export class TrackerUsersDetailsComponent implements OnInit {

  public user: VtsUser = new VtsUser({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this._store.dispatch(new vtsUserActions.FetchVtsUserAction(params['id']));
      } else {
        this._router.navigate(['dashboard', 'vts-users']);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentVtsUser).subscribe(user => this.user = user);
  }

}
