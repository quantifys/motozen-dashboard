import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import * as inventoryActions from "../../../shared/actions/inventory.actions";

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {

  public itemForm: FormGroup;
  public addItem: boolean;
  public categories: any[] = [
    {
      display: 'Automotive connector',
      value: 'automotive_connector'
    },
    {
      display: 'Tool',
      value: 'tool'
    },
    {
      display: 'Raw material',
      value: 'raw_material'
    },
    {
      display: 'Finished product',
      value: 'finished_product'
    },
    {
      display: 'Other',
      value: 'other'
    }
  ];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addItem = false;
        this._store.dispatch(new inventoryActions.FetchInventoryAction(params["id"]));
      } else {
        this.addItem = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this._store.select(fromRoot.getCurrentInventory).subscribe(inventory => {
      if (inventory.id) {
        this.itemForm.patchValue(inventory, { emitEvent: false });
      }
    });
  }

  buildForm() {
    this.itemForm = this._fb.group({
      id: null,
      category: [null, Validators.required],
      description: [null, Validators.required],
      item_code: [null, Validators.required]
    });
  }

  get category(): FormControl {
    return this.itemForm.get('category') as FormControl;
  }

  get description(): FormControl {
    return this.itemForm.get('description') as FormControl;
  }

  get item_code(): FormControl {
    return this.itemForm.get('item_code') as FormControl;
  }

  saveChanges() {
    if (this.addItem) {
      this._store.dispatch(new inventoryActions.CreateInventoryAction(this.itemForm.value));
    } else {
      this._store.dispatch(new inventoryActions.UpdateInventoryAction({
        inventory_item: this.itemForm.value
      }))
    }
  }

}
