import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { TrackerDevice } from 'src/app/shared/models';
import * as fromRoot from '../../../shared/reducers';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';

@Component({
  selector: 'app-tracker-devices-edit',
  templateUrl: './tracker-devices-edit.component.html',
  styleUrls: ['./tracker-devices-edit.component.scss']
})
export class TrackerDevicesEditComponent implements OnInit {

  public deviceForm: FormGroup;
  public deviceEditForm: FormGroup;
  public addTrackerDevice: boolean;
  public currentTrackerDevice: TrackerDevice;

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public _location: Location
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addTrackerDevice = false;
        this._store.dispatch(new trackerDeviceActions.FetchTrackerDeviceAction(params['id']));
      } else {
        this.addTrackerDevice = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.addVTS();
    this.deviceForm.valueChanges.subscribe(value => {
      if (this.checkDuplicateInObject('sld_number', value.device)) {
        this.deviceForm.setErrors({ 'duplicates': true });
      } else {
        this.deviceForm.setErrors(null);
      }
    });
    this._store.select(fromRoot.getCurrentTrackerDevice).subscribe(device => {
      if (device.id) {
        this.currentTrackerDevice = device;
        this.deviceEditForm.patchValue(device, { emitEvent: false });
      }
    });
  }

  buildForm() {
    this.deviceForm = this._fb.group({
      device: this._fb.array([])
    });
  }

  get device(): FormArray {
    return this.deviceForm.get('device') as FormArray;
  }

  addVTS() {
    this.device.push(this._fb.group({
      serial_no: ['', [Validators.required, Validators.minLength(4)]],
      imei: ['', [Validators.required, Validators.minLength(4)]],
      esim1: ['', [Validators.required, Validators.minLength(4)]],
      esim2: ['', [Validators.required, Validators.minLength(4)]]
    }));
    this._cdr.detectChanges();
  }

  deleteVTS(i: number) {
    this.device.removeAt(i);
  }

  enterPressed(id: number) {
    if (this.device.length - 1 === id) {
      this.addVTS();
    }
  }

  checkDuplicateInObject(propertyName: string, inputArray: any[]) {
    let seenDuplicate = false;
    const testObject = {};
    if (inputArray !== undefined) {
      inputArray.map((item) => {
        const itemPropertyName = item[propertyName];
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        } else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });
    }
    return seenDuplicate;
  }

  saveChanges() {
    const formData = this.deviceForm.value;
    if (this.addTrackerDevice) {
      this._store.dispatch(new trackerDeviceActions.CreateTrackerDeviceAction(formData));
    } else {
      this._store.dispatch(new trackerDeviceActions.UpdateTrackerDeviceAction({
        tracker_device: formData
      }));
    }
  }
}
