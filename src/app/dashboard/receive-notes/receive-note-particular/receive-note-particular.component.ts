import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import { Inventory } from '../../../shared/models';

@Component({
  selector: '[receive-note-particular]',
  templateUrl: './receive-note-particular.component.html',
  styleUrls: ['./receive-note-particular.component.scss']
})
export class ReceiveNoteParticularComponent implements OnInit, OnDestroy {

  public inventorySubscription$: Subscription = new Subscription();
  public inventory: Inventory[] = [];
  @Input('group') particularForm: FormGroup;

  constructor(
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.formListener();
    this._store.select(fromRoot.getReceiveNoteFormdata).subscribe(data => {
      data ? this.inventory = data["inventory_items"].filter(item => new Inventory(item)) : null
    });

    if (this.id.value) {
      this.calcTotal();
    }
  }

  ngOnDestroy() {
    this.inventorySubscription$.unsubscribe();
  }

  get id(): FormControl {
    return this.particularForm.get('id') as FormControl;
  }

  get quantity(): FormControl {
    return this.particularForm.get('quantity') as FormControl;
  }

  get gst(): FormControl {
    return this.particularForm.get('gst') as FormControl;
  }

  get unit_price(): FormControl {
    return this.particularForm.get('unit_price') as FormControl;
  }

  get total(): FormControl {
    return this.particularForm.get('total') as FormControl;
  }

  formListener() {
    this.particularForm.valueChanges.subscribe(value => this.calcTotal());
  }

  calcTotal() {
    this.total.patchValue(((this.unit_price.value * this.quantity.value) * (1 + (this.gst.value * .01))).toFixed(2), { emitEvent: false })
  }

}
