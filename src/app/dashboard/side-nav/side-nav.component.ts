import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as userActions from '../../shared/actions/user.actions';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: 'home',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fa-chart-line'
  },
  {
    path: 'users',
    title: 'User Management',
    type: 'link',
    icontype: 'fa-users'
  }
];

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  
  public routes: any[];
  
  constructor(
    private _store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.routes = ROUTES.filter(menuItem => menuItem);
  }

  signOut() {
    this._store.dispatch(new userActions.SignoutUserAction);
  }

}
