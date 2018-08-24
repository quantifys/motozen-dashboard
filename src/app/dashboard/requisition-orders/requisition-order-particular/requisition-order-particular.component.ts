import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import { Inventory } from '../../../shared/models';

@Component({
  selector: '[requisition-order-particular]',
  templateUrl: './requisition-order-particular.component.html',
  styleUrls: ['./requisition-order-particular.component.scss']
})
export class RequisitionOrderParticularComponent implements OnInit, OnDestroy {

  public inventorySubscription$: Subscription = new Subscription();
  public inventory: Inventory[] = [];
  @Input('group') particularForm: FormGroup;

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this._store.select(fromRoot.getRequisitionOrderFormdata).subscribe(data => data ? this.inventory = data.filter(item => new Inventory(item)) : null);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.inventorySubscription$.unsubscribe();
  }

}
