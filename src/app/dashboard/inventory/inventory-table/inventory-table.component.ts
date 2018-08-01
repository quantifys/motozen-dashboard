import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import swal from 'sweetalert2';

import * as fromRoot from '../../../shared/reducers';
import * as inventoryActions from '../../../shared/actions/inventory.actions';
import { Inventory } from '../../../shared/models';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public category: string = 'automotive_connector';
  public inventory: Inventory[] = [];
  public filteredInventory: Inventory[] = [];
  public loading: boolean = false;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.inventory.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this._store.dispatch(new inventoryActions.FetchAllInventoriesAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.category = params["category"];
      this.filterInventory();
    });
  }
  
  ngOnInit() {
    this._store.select(fromRoot.getAllInventories).subscribe(inventory => {
      this.loading = false;
      this.inventory = inventory;
      this.filterInventory();
    });
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

  filterInventory() {
    this.filteredInventory = this.inventory.filter(item => item.category == this.category);
  }

  deleteItem(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete item!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new inventoryActions.DeleteInventoryAction(id));
      }
    });
  }

}
