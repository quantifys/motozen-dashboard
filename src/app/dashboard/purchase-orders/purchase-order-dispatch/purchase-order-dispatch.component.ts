import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder, Device, TrackerDevice } from '../../../shared/models';

@Component({
  selector: 'app-purchase-order-dispatch',
  templateUrl: './purchase-order-dispatch.component.html',
  styleUrls: ['./purchase-order-dispatch.component.scss']
})
export class PurchaseOrderDispatchComponent implements OnInit, OnDestroy {

  private purchaseOrderSubscription$: Subscription = new Subscription();
  private deviceSubscription$: Subscription = new Subscription();
  private trackerDeviceSubscription$: Subscription = new Subscription();
  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});
  public deviceList: Device[] = [];
  public trackerDeviceList: TrackerDevice[] = [];
  public dispatchForm: FormGroup;
  public loading = true;

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<fromRoot.State>,
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(params['id']));
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.deviceSubscription$ = this._store.select(fromRoot.getAllDevices).subscribe(devices => this.deviceList = devices);
    this.trackerDeviceSubscription$ = this._store.select(fromRoot.getAllTrackerDevices)
      .subscribe(devices => this.trackerDeviceList = devices);
    this.purchaseOrderSubscription$ = this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(order => {
      this.purchaseOrder = order;
      if (order.id) {
        this.loading = false;
        if (this.purchaseOrder.po_type === 'sld') {
          this._store.dispatch(new deviceActions.FetchAllDevicesAction({
            status: 'unsold',
            per_page: 2000
          }));
          this.tracker_device_ids.disable();
        } else {
          this._store.dispatch(new trackerDeviceActions.FetchAllTrackerDevicesAction({
            status: 'unsold',
            per_page: 2000
          }));
          this.device_ids.disable();
        }
      }
    });
  }

  ngOnDestroy() {
    this.purchaseOrderSubscription$.unsubscribe();
    this.deviceSubscription$.unsubscribe();
    this.trackerDeviceSubscription$.unsubscribe();
  }

  buildForm() {
    this.dispatchForm = this._fb.group({
      device_ids: [[], [Validators.required]],
      tracker_device_ids: [[], [Validators.required]]
    });
  }

  get device_ids(): FormControl {
    return this.dispatchForm.get('device_ids') as FormControl;
  }

  get tracker_device_ids(): FormControl {
    return this.dispatchForm.get('tracker_device_ids') as FormControl;
  }

  dispatch() {
    this._store.dispatch(new purchaseOrderActions.DispatchPurchaseOrderAction({
      purchase_order: this.dispatchForm.value
    }));
  }

}
