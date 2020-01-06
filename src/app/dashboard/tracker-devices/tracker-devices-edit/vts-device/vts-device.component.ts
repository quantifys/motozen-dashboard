import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

import { DeviceService } from '../../../../shared/services/device.service';

declare var $: any;

@Component({
  selector: 'app-vts-device',
  templateUrl: './vts-device.component.html',
  styleUrls: ['./vts-device.component.scss']
})
export class VtsDeviceComponent implements OnInit, AfterViewInit {
  @Input() serialForm: FormGroup;
  @Input('position') position: number;
  @Output() enterPressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.serial_no.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => this.checkSerial(value));
  }

  ngAfterViewInit() {
    $('#serial_no' + this.position).focus();
  }

  get serial_no(): FormControl {
    return this.serialForm.get('serial_no') as FormControl;
  }

  get imei(): FormControl {
    return this.serialForm.get('imei') as FormControl;
  }

  get esim1(): FormControl {
    return this.serialForm.get('esim1') as FormControl;
  }

  get esim2(): FormControl {
    return this.serialForm.get('esim2') as FormControl;
  }

  get iccid(): FormControl {
    return this.serialForm.get('iccid') as FormControl;
  }

  keyUp() {
    this.enterPressed.emit(this.position);
  }

  checkSerial(serial_no: string) {
    this._deviceService.checkIfVTSExists(serial_no).subscribe(res => {
      if (res) {
        this.serialForm.setErrors({ 'exists': true });
      } else {
        this.serialForm.setErrors(null);
      }
    });
  }
}
