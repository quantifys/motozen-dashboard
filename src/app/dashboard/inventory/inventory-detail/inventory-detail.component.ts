import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as inventoryActions from '../../../shared/actions/inventory.actions';
import { Inventory } from '../../../shared/models';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  public inventory: Inventory = new Inventory({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new inventoryActions.FetchInventoryAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "inventory"]);
      }
    });
  }

  ngOnInit() {
  }

}
