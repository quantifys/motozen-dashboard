import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as requisitionOrderActions from "../../../shared/actions/requisition-order.actions";
import { RequisitionOrderParticular, Vendor } from '../../../shared/models';

@Component({
  selector: 'app-requisition-order-edit',
  templateUrl: './requisition-order-edit.component.html',
  styleUrls: ['./requisition-order-edit.component.scss']
})
export class RequisitionOrderEditComponent implements OnInit, OnDestroy {

  public requisitionOrderSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
  public requisitionOrderForm: FormGroup;
  public addRequisitionOrder: boolean;
  public deletedItems: number[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._store.dispatch(new requisitionOrderActions.FetchRequisitionOrderFormDataAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addRequisitionOrder = false;
        this._store.dispatch(new requisitionOrderActions.FetchRequisitionOrderAction(params["id"]));
      } else {
        this.addRequisitionOrder = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    if (this.addRequisitionOrder) {
      this.addParticular();
    } else {
      this.requisitionOrderSubscription$ = this._store.select(fromRoot.getCurrentRequisitionOrder).subscribe(requisitionOrder => {
        this.requisitionOrderForm.patchValue(requisitionOrder);
        requisitionOrder.req_particulars.map(particular => this.addParticular(particular));
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.requisitionOrderSubscription$.unsubscribe();
  }

  buildForm() {
    this.requisitionOrderForm = this._fb.group({
      id: null,
      req_particulars: this._fb.array([])
    });
  }

  get req_particulars(): FormArray {
    return this.requisitionOrderForm.get('req_particulars') as FormArray;
  }

  addParticular(data?: RequisitionOrderParticular) {
    this.req_particulars.push(this._fb.group({
      id: [data ? data.id : null],
      inventory_item_id: [data ? data.inventory_item.id : null, Validators.required],
      quantity: [data ? data.quantity : null, [Validators.required, Validators.min(0)]]
    }));
  }

  removeParticular(index: number) {
    this.deletedItems.push(this.req_particulars.at(index).get('id').value);
    this.req_particulars.removeAt(index);
    this.req_particulars.markAsDirty();
  }

  saveChanges() {
    if (this.addRequisitionOrder) {
      this._store.dispatch(new requisitionOrderActions.CreateRequisitionOrderAction({
        req_order: this.requisitionOrderForm.value
      }));
    } else {
      let formData: any = this.requisitionOrderForm.value;
      this.deletedItems.map(id => {
        formData.req_particulars.push({
          id: id,
          _destroy: 1
        })
      });
      this._store.dispatch(new requisitionOrderActions.UpdateRequisitionOrderAction({
        req_order: formData
      }));
    }
  }

}
