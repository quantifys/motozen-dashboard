import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import * as deviceActions from "../../../shared/actions/device.actions";

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  public deviceForm: FormGroup;

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public _location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
    this.addSld();
    this.deviceForm.valueChanges.subscribe(value => {
      if (this.checkDuplicateInObject("sld_number", value.device)) {
        this.deviceForm.setErrors({ "duplicates": true });
      } else {
        this.deviceForm.setErrors(null);
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

  addSld() {
    this.device.push(this._fb.group({
      sld_number: ['', [Validators.required, Validators.minLength(4)]]
    }));
    this._cdr.detectChanges();
  }

  deleteSld(i: number) {
    this.device.removeAt(i);
  }

  enterPressed(id: number) {
    if (this.device.length - 1 == id) {
      this.addSld();
    }
  }

  checkDuplicateInObject(propertyName: string, inputArray: any[]) {
    let seenDuplicate = false, testObject = {};
    if (inputArray != undefined)
      inputArray.map((item) => {
        let itemPropertyName = item[propertyName];
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        }
        else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });
    return seenDuplicate;
  }

  saveChanges() {
    this._store.dispatch(new deviceActions.CreateDeviceAction(this.deviceForm.value));
  }

}
