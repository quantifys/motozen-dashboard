import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

import { DeviceService } from '../../../../shared/services/device.service';

declare var $: any;

@Component({
  selector: 'sld-device',
  templateUrl: './sld.component.html',
  styleUrls: ['./sld.component.scss']
})
export class SldComponent implements OnInit, AfterViewInit {

  @Input('group') sldForm: FormGroup;
  @Input('position') position: number;
  @Output() enterPressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.sldForm.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => this.checkSld(this.sld_number.value));
  }

  ngAfterViewInit() {
    $('#sld_number' + this.position).focus();
  }

  get sld_number(): FormControl {
    return this.sldForm.get('sld_number') as FormControl;
  }

  keyUp() {
    this.enterPressed.emit(this.position);
  }

  checkSld(sld_number: string) {
    this._deviceService.checkIfDeviceExists(sld_number).subscribe(res => {
      if (res) {
        this.sldForm.setErrors({ "exists": true })
      } else {
        this.sldForm.setErrors(null);
      }
    });
  }

}
