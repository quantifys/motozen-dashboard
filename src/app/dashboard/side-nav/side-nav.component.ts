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
  users: string[]
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
    icontype: 'fa-chart-area',
    users: []
  },
  {
    path: 'users',
    title: 'Users',
    type: 'link',
    icontype: 'fa-users',
    users: ['manufacturer', 'sales', 'human_resource']
  },
  {
    path: 'devices',
    title: 'Devices',
    type: 'link',
    icontype: 'fa-desktop',
    users: ['manufacturer', 'distributor']
  },
  {
    path: 'vehicles',
    title: 'Vehicles',
    type: 'link',
    icontype: 'fa-bus',
    users: ['manufacturer', 'sales']
  },
  {
    path: 'inventory',
    title: 'Inventory',
    type: 'link',
    icontype: 'fa-sitemap',
    users: ['manufacturer']
  },
  {
    path: 'certificates',
    title: 'Certificates',
    type: 'link',
    icontype: 'fa-certificate',
    users: ['distributor', 'store_purchases']
  },
  {
    path: 'expenses',
    title: 'Expenses',
    type: 'link',
    icontype: 'fa-credit-card',
    users: ['accounts']
  },
  {
    path: 'purchase-orders',
    title: 'Purchase Orders',
    type: 'link',
    icontype: 'fa-credit-card',
    users: ['distributor', 'store_purchases', 'accounts', 'store_dispatch', 'store_logistics']
  },
  {
    path: 'receive-notes',
    title: 'Receive Notes',
    type: 'link',
    icontype: 'fa-clipboard-check',
    users: ['store_purchases']
  },
  {
    path: 'requisition-orders',
    title: 'Requisition Orders',
    type: 'link',
    icontype: 'fa-book',
    users: ['store_purchases', 'plant_supervisor']
  },
  {
    path: 'salary-slips',
    title: 'Salary Slips',
    type: 'link',
    icontype: 'fa-users',
    users: ['human_resource', 'accounts']
  },
  {
    path: 'vendors',
    title: 'Vendors',
    type: 'link',
    icontype: 'fa-shipping-fast',
    users: ['manufacturer', 'store_purchases']
  }
];

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public routes: any[] = [];
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
    this.routes = [];
    ROUTES.filter(menuItem => {
      menuItem.users.map(user => {
        if (user == this.loggedUser.role) {
          this.routes.push(menuItem);
        }
      });
    });
  }

  signOut() {
    this._store.dispatch(new userActions.SignoutUserAction);
  }

}
