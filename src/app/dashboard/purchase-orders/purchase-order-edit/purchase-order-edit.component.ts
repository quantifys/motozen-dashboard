import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { RtoService } from '../../../shared/services/rto.service';
import { PurchaseOrderParticulars } from '../../../shared/models';

@Component({
  selector: 'app-purchase-order-edit',
  templateUrl: './purchase-order-edit.component.html',
  styleUrls: ['./purchase-order-edit.component.scss']
})
export class PurchaseOrderEditComponent implements OnInit, OnDestroy {

  public purchaseOrderSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
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
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addPurchaseOrder = false;
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(params['id']));
      } else {
        this.addPurchaseOrder = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this.states = this._rtoService.getStates();
    if (this.addPurchaseOrder) {
      this.addVehicle();
    } else {
      this.purchaseOrderSubscription$ = this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(purchaseOrder => {
        this.purchaseForm.patchValue(purchaseOrder);
        purchaseOrder.particulars.map(particular => this.addVehicle(particular));
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.purchaseOrderSubscription$.unsubscribe();
  }

  buildForm() {
    this.purchaseForm = this._fb.group({
      id: null,
      type: ['sld', Validators.required],
      optionalAddress: false,
      address: null,
      address_l1: null,
      address_l2: null,
      locality: null,
      city: null,
      state: null,
      pincode: null,
      remarks: null,
      particulars: this._fb.array([]),
      tracker_po_particulars: this._fb.array([
        this._fb.group({
          quantity: [null, [Validators.required, Validators.min(0)]]
        })
      ])
    });
    this.tracker_po_particulars.disable();
  }

  get type(): FormControl {
    return this.purchaseForm.get('type') as FormControl;
  }

  get optionalAddress(): FormControl {
    return this.purchaseForm.get('optionalAddress') as FormControl;
  }

  get address_l1(): FormControl {
    return this.purchaseForm.get('address_l1') as FormControl;
  }

  get address_l2(): FormControl {
    return this.purchaseForm.get('address_l2') as FormControl;
  }

  get locality(): FormControl {
    return this.purchaseForm.get('locality') as FormControl;
  }

  get city(): FormControl {
    return this.purchaseForm.get('city') as FormControl;
  }

  get state(): FormControl {
    return this.purchaseForm.get('state') as FormControl;
  }

  get pincode(): FormControl {
    return this.purchaseForm.get('pincode') as FormControl;
  }

  get particulars(): FormArray {
    return this.purchaseForm.get('particulars') as FormArray;
  }

  get tracker_po_particulars(): FormArray {
    return this.purchaseForm.get('tracker_po_particulars') as FormArray;
  }

  formListener() {
    this.type.valueChanges.subscribe(value => {
      if (value === 'sld') {
        this.particulars.enable();
        this.tracker_po_particulars.disable();
        // this.initVehicle();
      } else {
        this.particulars.disable();
        this.tracker_po_particulars.enable();
        // while (this.particulars.length > 0) {
        //   this.particulars.removeAt(0);
        // }
      }
    });
  }

  initVehicle(data?: PurchaseOrderParticulars) {
    return this._fb.group({
      id: [data ? data.id : null],
      make: [data ? data.vehicle.make : null],
      vehicle_id: [data ? data.vehicle.id : null, Validators.required],
      quantity: [data ? data.quantity : null, Validators.required]
    });
  }

  addVehicle(data?: PurchaseOrderParticulars) {
    this.particulars.push(this.initVehicle(data));
  }

  removeVehicle(i: number) {
    // tslint:disable-next-line
    this.particulars.at(i).get('id') ? this.deletedItems.push(this.particulars.at(i).value) : null;
    this.particulars.removeAt(i);
  }

  addressValidate(event) {
    const controls: string[] = ['address_l1', 'locality', 'city', 'state', 'pincode'];
    controls.map(control => {
      event ? this.purchaseForm.get(control).setValidators(Validators.required) : this.purchaseForm.get(control).clearValidators();
      if (control === 'pincode') {
        event ? this.purchaseForm.get(control).setValidators([Validators.required, Validators.minLength(6), Validators.pattern('[0-9]+')])
          : this.purchaseForm.get(control).clearValidators();
      }
      this.purchaseForm.get(control).updateValueAndValidity();
    });
  }

  saveChanges() {
    const formData: any = this.purchaseForm.value;
    if (this.addPurchaseOrder) {
      if (formData['optionalAddress']) {
        formData['address'] = formData['address_l1'] + ',\n' + (String(formData['address_l2']).trim() !== '' ? (formData['address_l2']
          + ',\n') : '') + formData['locality'] + ', ' + formData['city'] + ',\n' + formData['state'] + ' - ' + formData['pincode'];
      }
    }
    delete formData['optionalAddress'];
    delete formData['address_l1'];
    delete formData['address_l2'];
    delete formData['locality'];
    delete formData['city'];
    delete formData['state'];
    delete formData['pincode'];

    this.addPurchaseOrder
      ? this._store.dispatch(new purchaseOrderActions.CreatePurchaseOrderAction({ purchase_order: formData }))
      : this._store.dispatch(new purchaseOrderActions.UpdatePurchaseOrderAction({ purchase_order: formData }));
  }
}
