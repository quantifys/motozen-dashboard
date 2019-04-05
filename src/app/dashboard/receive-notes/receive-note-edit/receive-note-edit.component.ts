import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as receiveNoteActions from '../../../shared/actions/receive-note.actions';
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
  public deletedItems: number[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._store.dispatch(new receiveNoteActions.FetchReceiveNoteFormDataAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addReceiveNote = false;
        this._store.dispatch(new receiveNoteActions.FetchReceiveNoteAction(params['id']));
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
        this.vendors = data['vendors'].filter(vendor => new Vendor(vendor));
      }
    });
    if (this.addReceiveNote) {
      this.addParticular();
    } else {
      this.receiveNoteSubscription$ = this._store.select(fromRoot.getCurrentReceiveNote).subscribe(receiveNote => {
        this.receiveNoteForm.patchValue(receiveNote);
        if (receiveNote.freight > 0) {
          this.freight_switch.patchValue(true, { emitEvent: false });
        }
        receiveNote.rn_particulars.map(particular => this.addParticular(particular));
        this.vendor_id.patchValue(receiveNote.vendor.id);
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
      freight_gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]+')]],
      expenses: [null, [Validators.required, Validators.min(0)]],
      gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]+')]],
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

  get vendor_id(): FormControl {
    return this.receiveNoteForm.get('vendor_id') as FormControl;
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

  removeParticular(index: number) {
    this.deletedItems.push(this.rn_particulars.at(index).get('id').value);
    this.rn_particulars.removeAt(index);
    this.rn_particulars.markAsDirty();
  }

  freightValidate(event) {
    const controls: string[] = ['freight', 'freight_gst', 'freight_total'];
    if (event) {
      this.receiveNoteForm.get('freight').setValidators([Validators.required, Validators.min(0)]);
      this.receiveNoteForm.get('freight_total').setValidators([Validators.required, Validators.min(0)]);
      this.receiveNoteForm.get('freight_gst').setValidators([Validators.required, Validators.min(0), Validators.max(30)]);
      controls.map(control => {
        this.receiveNoteForm.get(control).updateValueAndValidity();
      });
    } else {
      controls.map(control => {
        this.receiveNoteForm.get(control).clearValidators();
        this.receiveNoteForm.get(control).updateValueAndValidity();
      });
    }
  }

  formListener() {
    this.formSubscription$ = this.receiveNoteForm.valueChanges.subscribe(value => {
      let total = 0;
      this.rn_particulars.controls.map(group => total += Number(group.get('total').value >= 0 ? group.get('total').value : 0));
      this.freight_total.patchValue(+(this.freight.value * (1 + (this.freight_gst.value * 0.01))).toFixed(2), { emitEvent: false });
      this.total.patchValue(Math.ceil((this.freight_switch.value ? this.freight_total.value : 0)
        + this.expenses.value + Number(total.toFixed(2))), { emitEvent: false });
    });
  }

  saveChanges() {
    const formData: any = this.receiveNoteForm.value;
    if (!formData.freight_switch) {
      const controls: string[] = ['freight_total', 'freight_switch', 'freight_gstn'];
      controls.map(control => delete formData[control]);
      formData['freight'] = 0;
      formData['freight_gst'] = 0;
    }
    if (this.addReceiveNote) {
      this._store.dispatch(new receiveNoteActions.CreateReceiveNoteAction({
        receive_note: formData
      }));
    } else {
      this.deletedItems.map(id => {
        formData.rn_particulars.push({
          id: id,
          _destroy: 1
        });
      });
      this._store.dispatch(new receiveNoteActions.UpdateReceiveNoteAction({
        receive_note: formData
      }));
    }
  }

}
