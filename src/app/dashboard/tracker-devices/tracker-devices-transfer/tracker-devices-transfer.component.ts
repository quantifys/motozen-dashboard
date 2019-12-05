import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../shared/reducers';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';
import { User, TrackerDevice } from '../../../shared/models';

@Component({
  selector: 'app-tracker-devices-transfer',
  templateUrl: './tracker-devices-transfer.component.html',
  styleUrls: ['./tracker-devices-transfer.component.scss']
})
export class TrackerDevicesTransferComponent implements OnInit, OnDestroy {

  public transferForm: FormGroup;
  public users: User[] = [];
  public devices: TrackerDevice[] = [];
  public loggedUser: User = new User({});
  public userSubscription$: Subscription = new Subscription();
  public customerSubscription$: Subscription = new Subscription();
  public deviceSubscription$: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  ngOnInit() {
    this.buildForm();
    this._store.dispatch(new trackerDeviceActions.FetchTrackerDeviceTransferFormDataAction);
    this.customerSubscription$ = this._store.select(fromRoot.getTrackerDeviceDealers).subscribe(users => this.users = users);
    this.deviceSubscription$ = this._store.select(fromRoot.getTransferableTrackerDevices).subscribe(devices => this.devices = devices);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.customerSubscription$.unsubscribe();
    this.deviceSubscription$.unsubscribe();
  }

  buildForm() {
    this.transferForm = this._fb.group({
      user_id: [null, Validators.required],
      tracker_device_ids: [null, Validators.required]
    });
  }

  get tracker_device_ids(): FormControl {
    return this.transferForm.get('tracker_device_ids') as FormControl;
  }

  saveChanges() {
    this._store.dispatch(new trackerDeviceActions.TransferTrackerDevicesAction(this.transferForm.value));
    this.transferForm.reset();
  }

  selectionText(): string {
    switch (this.loggedUser.role) {
      case 'manufacturer':
        return 'distributor';
      case 'distributor':
        return 'dealer';
      default:
        return 'sub-dealer';
    }
  }

}
