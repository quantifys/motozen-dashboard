import { Component, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as userActions from "../../../shared/actions/user.actions";
import * as deviceActions from "../../../shared/actions/device.actions";
import { User, Device } from "../../../shared/models";

@Component({
  selector: 'app-device-transfer',
  templateUrl: './device-transfer.component.html',
  styleUrls: ['./device-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DeviceTransferComponent implements OnInit {

  public transferForm: FormGroup;
  public users: User[] = [];
  public devices: Device[] = [];

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this._store.dispatch(new deviceActions.FetchAllDevicesAction(null));
    this._store.dispatch(new userActions.FilterUsersAction({
      role: 'dealer'
    }));
    this._store.select(fromRoot.getAllUsers).subscribe(users => this.users = users);

    this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices.filter(device => device.status != 'certified'));
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
