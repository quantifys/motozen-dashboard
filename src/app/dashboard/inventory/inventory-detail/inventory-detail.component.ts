import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as inventoryActions from '../../../shared/actions/inventory.actions';
import { Inventory } from '../../../shared/models';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';

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
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
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
    this._store.select(fromRoot.getCurrentInventory).subscribe(item => this.inventory = item);
  }

  deleteInventory() {
    this.bottomSheet.open(InventoryDeleteComponent);
  }

}

@Component({
  template: `
  <div class="container-fluid mt-3">
  <h5 class="text-center border-bottom mb-3 pb-2">Are you sure you want to delete this inventory item?</h5>
  <div class="text-center mb-3">
    <button mat-stroked-button color="warn" (click)="action()">Yes</button>
    <button class="ml-1" mat-button (click)="close()">No</button>
  </div>
</div>
  `,
})
export class InventoryDeleteComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<InventoryDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new inventoryActions.DeleteInventoryAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}