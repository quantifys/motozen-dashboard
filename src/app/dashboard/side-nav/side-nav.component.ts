import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as userActions from '../../shared/actions/user.actions';
import { User } from '../../shared/models';

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
    icontype: 'fa-chart-area'
  },
  {
    path: 'users',
    title: 'User Management',
    type: 'link',
    icontype: 'fa-users'
  },
  {
    path: 'devices',
    title: 'Devices',
    type: 'link',
    icontype: 'fa-desktop'
  }
];

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  
  public routes: any[];
  public loggedUser: User = new User({});
  
  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (this.loggedUser.role) {
        this.refreshRoutes();
      }
    });
  }

  ngOnInit() {
  }

  refreshRoutes() {
    this.routes = ROUTES.filter(menuItem => menuItem);
  }

  signOut() {
    this._store.dispatch(new userActions.SignoutUserAction);
  }

}
