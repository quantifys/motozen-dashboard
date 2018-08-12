import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import { Vehicle } from '../../../shared/models';

@Component({
  selector: '[purchase-order-particular]',
  templateUrl: './purchase-order-particular.component.html',
  styleUrls: ['./purchase-order-particular.component.scss']
})
export class PurchaseOrderParticularComponent implements OnInit {

  @Input('group') particularForm: FormGroup;
  public formData: any;
  public brands: string[] = [];
  public models: string[] = [];

  constructor(
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this._store.select(fromRoot.getPurchaseOrderFormdata).subscribe(data => {
      if (data) {
        this.formData = data;
        this.brands = [];
        for (var make in data["vehicle_makes"]) {
          this.brands.push(make);
        }
      }
    });
  }

  get make(): FormControl {
    return this.particularForm.get('make') as FormControl;
  }

  get vehicle_id(): FormControl {
    return this.particularForm.get('vehicle_id') as FormControl;
  }

  optionSelected(event, type) {
    this.particularForm.get(type).markAsDirty();
    this.particularForm.get(type).patchValue(event.option.value);
  }

  getModels(): any[] {
    if (this.formData) {
      return this.formData.vehicle_makes[this.make.value];
    }
    return null;
  }

  displayFn(vehicle: Vehicle): string | undefined {
    return vehicle ? `${vehicle.model} - ${vehicle.variant}` : undefined;
  }

}
