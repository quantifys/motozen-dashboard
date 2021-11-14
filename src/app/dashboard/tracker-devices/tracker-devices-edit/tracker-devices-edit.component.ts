import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TrackerDevice } from 'src/app/shared/models';
import * as fromRoot from '../../../shared/reducers';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';

@Component({
  selector: 'app-tracker-devices-edit',
  templateUrl: './tracker-devices-edit.component.html',
  styleUrls: ['./tracker-devices-edit.component.scss']
})
export class TrackerDevicesEditComponent implements OnInit, OnDestroy {

  public deviceForm: FormGroup;
  public addTrackerDevice: boolean;
  public currentTrackerDevice: TrackerDevice;
  public querySubscription: Subscription = new Subscription();
  public trackerSubscription: Subscription = new Subscription();
  public formSubscription: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public _location: Location
  ) {
    this._store.dispatch(new trackerDeviceActions.ClearTrackerDeviceDataAction);
    this.querySubscription = this._activatedRoute.queryParams.subscribe(params => {
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
    this.formSubscription = this.deviceForm.valueChanges.subscribe(value => {
      if (this.checkDuplicateInObject('serial_no', value.device)) {
        this.deviceForm.setErrors({ 'duplicates': true });
      } else {
        this.deviceForm.setErrors(null);
      }
    });
    this.trackerSubscription = this._store.select(fromRoot.getCurrentTrackerDevice).subscribe(device => {
      if (device.id) {
        this.device.at(0).patchValue(device);
      }
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.trackerSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

  buildForm() {
    this.deviceForm = this._fb.group({
      tracker_device: this._fb.array([])
    });
  }

  get device(): FormArray {
    return this.deviceForm.get('tracker_device') as FormArray;
  }

  addVTS() {
    this.device.push(this._fb.group({
      id: null,
      serial_no: ['', [Validators.required, Validators.minLength(5)]],
      imei: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      esim1: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
      esim2: ['', [Validators.minLength(13), Validators.maxLength(20)]],
      provider1: [''],
      provider2: [''],
      iccid: ['']
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
    if (this.addTrackerDevice) {
      const formData = this.deviceForm.value;
      this._store.dispatch(new trackerDeviceActions.CreateTrackerDeviceAction(formData));
    } else {
      const formData = this.device.at(0).value;
      this._store.dispatch(new trackerDeviceActions.UpdateTrackerDeviceAction({
        tracker_device: formData
      }));
    }
  }
}