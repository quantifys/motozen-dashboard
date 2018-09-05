import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/reducers';
import * as userActions from '../shared/actions/user.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this._store.dispatch(new userActions.ValidateUserTokenAction);
  }

  ngOnInit() {
  }

}
