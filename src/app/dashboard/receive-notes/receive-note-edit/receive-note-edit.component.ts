import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as receiveNoteActions from "../../../shared/actions/receive-note.actions";
import { ReceiveNoteParticular, Vendor } from '../../../shared/models';

@Component({
  selector: 'app-receive-note-edit',
  templateUrl: './receive-note-edit.component.html',
  styleUrls: ['./receive-note-edit.component.scss']
})
export class ReceiveNoteEditComponent implements OnInit, OnDestroy {

  public receiveNoteSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
  public formSubscription$: Subscription = new Subscription();
  public formDataSubscription$: Subscription = new Subscription();
  public receiveNoteForm: FormGroup;
  public addReceiveNote: boolean;
  public vendors: Vendor[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._store.dispatch(new receiveNoteActions.FetchReceiveNoteFormDataAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addReceiveNote = false;
        this._store.dispatch(new receiveNoteActions.FetchReceiveNoteAction(params["id"]));
      } else {
        this.addReceiveNote = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this.formDataSubscription$ = this._store.select(fromRoot.getReceiveNoteFormdata).subscribe(data => {
      if (data) {
        console.log(data);
        this.vendors = data["vendors"].filter(vendor => new Vendor(vendor));
      }
    });
    if (this.addReceiveNote) {
      this.addParticular();
    } else {
      this.receiveNoteSubscription$ = this._store.select(fromRoot.getCurrentVendor).subscribe(receiveNote => {
        this.receiveNoteForm.patchValue(receiveNote);
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.receiveNoteSubscription$.unsubscribe();
    this.formSubscription$.unsubscribe();
    this.formDataSubscription$.unsubscribe();
  }

  buildForm() {
    this.receiveNoteForm = this._fb.group({
      id: null,
      freight: [null, [Validators.min(0)]],
      freight_gst: [null, [Validators.min(0), Validators.max(30)]],
      freight_total: [{
        value: null,
        readonly: true
      }],
      freight_gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[a-zA-Z0-9]+")]],
      expenses: [null, [Validators.required, Validators.min(0)]],
      gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[a-zA-Z0-9]+")]],
      vendor_id: null,
      total: [{
        value: null,
        readonly: true
      }, Validators.required],
      freight_switch: false,
      rn_particulars: this._fb.array([])
    });
  }

  get rn_particulars(): FormArray {
    return this.receiveNoteForm.get('rn_particulars') as FormArray;
  }

  get freight_switch(): FormControl {
    return this.receiveNoteForm.get('freight_switch') as FormControl;
  }

  get freight_total(): FormControl {
    return this.receiveNoteForm.get('freight_total') as FormControl;
  }

  get freight(): FormControl {
    return this.receiveNoteForm.get('freight') as FormControl;
  }

  get freight_gst(): FormControl {
    return this.receiveNoteForm.get('freight_gst') as FormControl;
  }

  get expenses(): FormControl {
    return this.receiveNoteForm.get('expenses') as FormControl;
  }

  get total(): FormControl {
    return this.receiveNoteForm.get('total') as FormControl;
  }

  get gstn(): FormControl {
    return this.receiveNoteForm.get('gstn') as FormControl;
  }

  get freight_gstn(): FormControl {
    return this.receiveNoteForm.get('freight_gstn') as FormControl;
  }

  initParticular(data?: ReceiveNoteParticular): FormGroup {
    return this._fb.group({
      id: [data ? data.id : null],
      inventory_item_id: [data ? data.inventory_item.id : null, Validators.required],
      quantity: [data ? data.quantity : null, [Validators.required, Validators.min(0)]],
      unit_price: [data ? data.unit_price : null, [Validators.required, Validators.min(0)]],
      gst: [data ? data.gst : null, [Validators.required, Validators.min(0), Validators.max(80)]],
      total: [{
        value: data ? data.total : null,
        readonly: true
      }, Validators.required]
    });
  }

  addParticular(data?: ReceiveNoteParticular) {
    this.rn_particulars.push(this.initParticular(data));
  }

  freightValidate(event) {
    let controls: string[] = ["freight", "freight_gst", "freight_total"];
    controls.map(control => {
      event ? this.receiveNoteForm.get(control).setValidators(Validators.required) : this.receiveNoteForm.get(control).clearValidators()
      this.receiveNoteForm.get(control).updateValueAndValidity();
    });
  }

  formListener() {
    this.formSubscription$ = this.receiveNoteForm.valueChanges.subscribe(value => {
      let total: number = 0;
      this.rn_particulars.controls.map(group => total += Number(group.get('total').value));
      this.freight_total.patchValue(+(this.freight.value * (1 + (this.freight_gst.value * 0.01))).toFixed(2), { emitEvent: false });
      this.total.patchValue(Math.ceil(this.freight_total.value + this.expenses.value + Number(total.toFixed(2))), { emitEvent: false });
    });
  }

  saveChanges() {
    let formData: any = this.receiveNoteForm.value;
    if (!formData.freight_switch) {
      let controls: string[] = ["freight", "freight_gst", "freight_total", "freight_switch", "freight_gstn"];
      controls.map(control => delete formData[control]);
    }
    if (this.addReceiveNote) {
      this._store.dispatch(new receiveNoteActions.CreateReceiveNoteAction({
        receive_note: formData
      }));
    } else {
      this._store.dispatch(new receiveNoteActions.UpdateReceiveNoteAction({
        receiveNote: formData
      }));
    }
  }

}
