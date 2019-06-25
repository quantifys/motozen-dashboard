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
  users: string[];
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
    users: ['manufacturer']
  },
  {
    path: 'users',
    title: 'Users',
    type: 'link',
    icontype: 'fa-users',
    users: ['manufacturer', 'sales', 'human_resource', 'rto', 'admin']
  },
  {
    path: 'devices',
    title: 'Speed Governors',
    type: 'link',
    icontype: 'fa-desktop',
    users: ['manufacturer', 'distributor', 'dealer', 'sub_dealer', 'store_purchases']
  },
  {
    path: 'vts-devices',
    title: 'VTS devices',
    type: 'link',
    icontype: 'fa-map',
    users: ['manufacturer', 'distributor', 'dealer', 'sub_dealer', 'store_purchases']
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
    users: ['manufacturer', 'store_purchases', 'plant_supervisor']
  },
  {
    path: 'certificates',
    title: 'SG certificates',
    type: 'link',
    icontype: 'fa-certificate',
    users: ['manufacturer', 'distributor', 'dealer', 'sub_dealer', 'sales', 'rto', 'admin']
  },
  {
    path: 'vts-certificates',
    title: 'VTS certificates',
    type: 'link',
    icontype: 'fa-certificate',
    users: ['manufacturer', 'distributor', 'dealer', 'sub_dealer', 'sales', 'rto', 'admin']
  },
  {
    path: 'vendors',
    title: 'Vendors',
    type: 'link',
    icontype: 'fa-shipping-fast',
    users: ['manufacturer', 'store_purchases']
  },
  {
    path: 'purchase-orders',
    title: 'Purchase Orders',
    type: 'link',
    icontype: 'fa-credit-card',
    users: ['manufacturer', 'distributor', 'store_purchases', 'accounts', 'store_dispatch', 'store_logistics', 'sales', 'admin']
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
    path: 'expenses',
    title: 'Expenses',
    type: 'link',
    icontype: 'fa-credit-card',
    users: ['accounts']
  },
  {
    path: 'incomes',
    title: 'Incomes',
    type: 'link',
    icontype: 'fa-hand-holding-usd',
    users: ['accounts']
  },
  {
    path: 'transactions',
    title: 'Transactions',
    type: 'link',
    icontype: 'fa-file-invoice-dollar',
    users: ['manufacturer', 'accounts']
  }
];

@Component({
  selector: 'app-side-nav',
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
        if (user === this.loggedUser.role) {
          this.routes.push(menuItem);
        }
      });
    });
  }

  signOut() {
    this._store.dispatch(new userActions.SignoutUserAction);
  }

}
