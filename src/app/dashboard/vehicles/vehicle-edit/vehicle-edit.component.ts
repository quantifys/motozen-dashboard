import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from "@ngrx/store";
import swal from 'sweetalert2';

import * as fromRoot from "../../../shared/reducers";
import * as inventoryActions from "../../../shared/actions/inventory.actions";
import * as vehicleActions from "../../../shared/actions/vehicle.actions";
import { Icat, Inventory } from '../../../shared/models';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {

  public addVehicle: boolean = false;
  public vehicleForm: FormGroup;
  public icat_pages: Icat[] = [];
  public inventory: Inventory[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location
  ) {
    this._store.dispatch(new inventoryActions.FetchAllInventoriesAction);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addVehicle = false;
        this._store.dispatch(new vehicleActions.FetchVehicleAction(params["id"]));
      } else {
        this.addVehicle = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.vehicleForm.valueChanges.subscribe(value => console.log(value));
    this._store.select(fromRoot.getAllInventories).subscribe(inventory => this.inventory = inventory.filter(item => item.category == 'automotive_connector'));
  }

  buildForm() {
    this.vehicleForm = this._fb.group({
      id: [null],
      make: [null, Validators.required],
      model: [null, Validators.required],
      variant: [null, Validators.required],
      tac_number: [null, Validators.required],
      category: [null, Validators.required],
      connector_id: [null, Validators.required],
      icats: this._fb.array([])
    });
  }

  get icats(): FormArray {
    return this.vehicleForm.controls["icats"] as FormArray;
  }

  addIcat() {
    this.icats.push(this._fb.control(null, Validators.required));
  }

  removeIcat(index: number) {
    if (this.addVehicle) {
      this.icats.removeAt(index);
    }
  }

  deleteIcat(id: number) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete document!"
    }).then(result => {
      if (result.value) {
        // this._store.dispatch(new vehicleActions.DeleteVehicleIcatAction({
        //   vehicle_id: this.vehicle_id.value,
        //   icat_id: id
        // }));
      }
    });
  }

  onFileChange($event, index: number) {
    let reader = new FileReader();
    let file = $event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.icats.at(index).patchValue(reader.result.split(',')[1], {emitEvent: false})
      this.icats.at(index).markAsDirty();
    }
  }

  saveChanges() {
    let formData: any = this.vehicleForm.value;
    if (this.icats.pristine) {
      delete formData.icats;
    }
    if (this.addVehicle) {
      this._store.dispatch(new vehicleActions.CreateVehicleAction({
        vehicle: formData
      }));
    } else {
      this._store.dispatch(new vehicleActions.UpdateVehicleAction({
        vehicle: formData
      }));
      // if (formData.icats.length > 0) {
      //   this._store.dispatch(new vehicleActions.UpdateVehicleIcatAction({
      //     id: formData.id,
      //     icats: formData.icats
      //   }))
      // }
    }
  }

  deleteVehicle(id: number) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete vehicle!"
    }).then(result => {
      if (result.value) {
        this._store.dispatch(new vehicleActions.DeleteVehicleAction(id));
      }
    });
  }

}
