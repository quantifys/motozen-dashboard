import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as vendorActions from "../../../shared/actions/vendor.actions";
import { User } from '../../../shared/models';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent implements OnInit, OnDestroy {

  public vendorSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
  public vendorForm: FormGroup;
  public addVendor: boolean;

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addVendor = false;
        this._store.dispatch(new vendorActions.FetchVendorAction(params["id"]));
      } else {
        this.addVendor = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    if (this.addVendor) {

    } else {
      this.vendorSubscription$ = this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(vendor => {
        this.vendorForm.patchValue(vendor);
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.vendorSubscription$.unsubscribe();
  }

  buildForm() {
    this.vendorForm = this._fb.group({
      id: [null],
      company_name: [null, Validators.required],
      gstn: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      address: [null, Validators.required]
    });
  }

  get id(): FormControl {
    return this.vendorForm.get('id') as FormControl
  }

  get gstn(): FormControl {
    return this.vendorForm.get('gstn') as FormControl
  }

  saveChanges() {
    if (this.addVendor) {
      this._store.dispatch(new vendorActions.CreateVendorAction(this.vendorForm.value));
    } else {
      this._store.dispatch(new vendorActions.UpdateVendorAction({
        vendor: this.vendorForm.value
      }));
    }
  }

}
