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
  @Input() sldForm: FormGroup;
  @Input('position') position: number;
  @Output() enterPressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.sldForm.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => this.checkSld(this.serial_no.value));
  }

  ngAfterViewInit() {
    $('#serial_no' + this.position).focus();
  }

  get serial_no(): FormControl {
    return this.sldForm.get('serial_no') as FormControl;
  }

  keyUp() {
    this.enterPressed.emit(this.position);
  }

  checkSld(serial_no: string) {
    this._deviceService.checkIfVTSExists(serial_no).subscribe(res => {
      if (res) {
        this.sldForm.setErrors({ 'exists': true });
      } else {
        this.sldForm.setErrors(null);
      }
    });
  }
}
