import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { User, Device } from '../../../shared/models';

@Component({
  selector: 'app-device-transfer',
  templateUrl: './device-transfer.component.html',
  styleUrls: ['./device-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DeviceTransferComponent implements OnInit, OnDestroy {

  public transferForm: FormGroup;
  public users: User[] = [];
  public devices: Device[] = [];
  public loggedUser: User = new User({});
  public loggedUserSubscription$: Subscription = new Subscription();
  public userSubscription$: Subscription = new Subscription();
  public deviceSubscription$: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {
    this.loggedUserSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  ngOnInit() {
    this.buildForm();
    this._store.dispatch(new deviceActions.FetchDeviceTransferFormDataAction);
    this.userSubscription$ = this._store.select(fromRoot.getDeviceDealers).subscribe(users => this.users = users);
    this.deviceSubscription$ = this._store.select(fromRoot.getTransferableDevices).subscribe(devices => this.devices = devices);
  }

  ngOnDestroy() {
    this.loggedUserSubscription$.unsubscribe();
    this.userSubscription$.unsubscribe();
    this.deviceSubscription$.unsubscribe();
  }

  buildForm() {
    this.transferForm = this._fb.group({
      user_id: [null, Validators.required],
      device_ids: [null, Validators.required]
    });
  }

  get device_ids(): FormControl {
    return this.transferForm.get('device_ids') as FormControl;
  }

  saveChanges() {
    this._store.dispatch(new deviceActions.TransferDevicesAction(this.transferForm.value));
    this.transferForm.reset();
  }

}
