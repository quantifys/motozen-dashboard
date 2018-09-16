import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../shared/reducers';
import * as userActions from '../shared/actions/user.actions';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public opened: boolean = true;

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router
  ) {
    this._store.dispatch(new userActions.ValidateUserTokenAction);
  }

  ngOnInit() {
    this._router.events.subscribe(routeParams => {
      if ($(window).width() < 601) {
        this.opened = false;
      }
    });
  }

}
