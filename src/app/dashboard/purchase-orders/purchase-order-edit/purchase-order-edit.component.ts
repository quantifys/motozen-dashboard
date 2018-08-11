import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import * as purchaseOrderActions from "../../../shared/actions/purchase-order.actions";
import { RtoService } from '../../../shared/services/rto.service';
import { PurchaseOrderParticulars } from '../../../shared/models';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.scss']
})
export class PurchaseOrderEditComponent implements OnInit {

  public purchaseForm: FormGroup;
  public addPurchaseOrder: boolean;
  public states: any[] = [];
  public deletedItems: PurchaseOrderParticulars[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location,
    private _rtoService: RtoService
  ) {
    this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderFormDataAction);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addPurchaseOrder = false;
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(params["id"]));
      } else {
        this.addPurchaseOrder = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.states = this._rtoService.getStates();
    if (this.addPurchaseOrder) {
      this.addVehicle();
    }
  }

  buildForm() {
    this.purchaseForm = this._fb.group({
      id: null,
      optionalAddress: false,
      address_l1: null,
      address_l2: null,
      locality: null,
      city: null,
      state: null,
      pincode: null,
      remarks: null,
      particulars: this._fb.array([])
    });
  }

  get optionalAddress(): FormControl {
    return this.purchaseForm.get("optionalAddress") as FormControl;
  }

  get address_l1(): FormControl {
    return this.purchaseForm.get("address_l1") as FormControl;
  }

  get address_l2(): FormControl {
    return this.purchaseForm.get("address_l2") as FormControl;
  }

  get locality(): FormControl {
    return this.purchaseForm.get("locality") as FormControl;
  }

  get city(): FormControl {
    return this.purchaseForm.get("city") as FormControl;
  }

  get state(): FormControl {
    return this.purchaseForm.get("state") as FormControl;
  }

  get pincode(): FormControl {
    return this.purchaseForm.get("pincode") as FormControl;
  }

  get particulars(): FormArray {
    return this.purchaseForm.get('particulars') as FormArray;
  }

  initVehicle(data?: PurchaseOrderParticulars) {
    return this._fb.group({
      id: [data ? data.id : null],
      vehicle_id: [null, Validators.required],
      make: [data ? data.vehicle.make : null],
      quantity: [data ? data.quantity : null, Validators.required]
    });
  }

  addVehicle(data?: PurchaseOrderParticulars) {
    this.particulars.push(this.initVehicle(data));
  }

  removeVehicle(i: number) {
    this.particulars.at(i).get('id') ? this.deletedItems.push(this.particulars.at(i).value) : null
    this.particulars.removeAt(i);
  }

  addressValidate(event) {
    let controls: string[] = ["address_l1", "locality", "city", "state", "pincode"];
    controls.map(control => {
      event ? this.purchaseForm.get(control).setValidators(Validators.required) : this.purchaseForm.get(control).clearValidators()
      if (control == "pincode") {
        event ? this.purchaseForm.get(control).setValidators([Validators.required, Validators.minLength(6), Validators.pattern("[0-9]+")]) : this.purchaseForm.get(control).clearValidators()
      }
      this.purchaseForm.get(control).updateValueAndValidity();
    });
  }

  saveChanges() {
    let formData: any = this.purchaseForm.value;
    if (this.addPurchaseOrder) {
      formData["particulars"] = formData["particulars"].map(particular => {
        delete particular["id"];
        delete particular["make"];
        particular["vehicle_id"] = particular["vehicle_id"]["id"];
        return particular;
      });
      if (formData["optionalAddress"]) {
        formData["address"] = formData["address_l1"] + ",\n" + (String(formData["address_l2"]).trim() != "" ? (formData["address_l2"] + ",\n") : "") + formData["locality"] + " " + formData["city"] + ",\n" + formData["state"] + " - " + formData["pincode"]
      }
      delete formData["optionalAddress"];
      delete formData["address_l1"];
      delete formData["address_l2"];
      delete formData["locality"];
      delete formData["city"];
      delete formData["state"];
      delete formData["pincode"];
      this._store.dispatch(new purchaseOrderActions.CreatePurchaseOrderAction({ purchase_order: formData }));
    }
  }
}
