import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TrackerDevice } from 'src/app/shared/models';

import * as fromRoot from '../../../shared/reducers';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {

  public csvContent: string;
  public deviceForm: FormGroup;
  public devices: TrackerDevice[];

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.devices = [];
  }

  buildForm() {
    this.deviceForm = this._fb.group({
      devices: null
    });
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = e => {
        this.onFileLoad(e);
      };
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    const sorted: any[] = textFromFileLoaded.split('\n');

    sorted.map((data, index) => {
      const item = data.split(',');
      if (index > 0) {
        this.devices = [...this.devices, new TrackerDevice({
          serial_no: item[0],
          imei: item[1],
          esim1: item[2],
          esim2: item[3],
          iccid: item[3],
        })];
      }
    });
  }

  saveChanges() {
    this._store.dispatch(new trackerDeviceActions.CreateTrackerDeviceAction({
      tracker_device: this.devices.map(device => {
        return {
          serial_no: device.serial_no,
          imei: device.imei,
          esim1: device.esim1,
          esim2: device.esim2,
          iccid: device.iccid,
        };
      })
    }));
  }

  remove(i: number) {
    this.devices = this.devices.filter((device, index) => index === i ? null : device);
  }
}
