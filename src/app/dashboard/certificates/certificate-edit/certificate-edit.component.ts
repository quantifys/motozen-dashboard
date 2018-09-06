import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs';
import moment from 'moment';

import * as fromRoot from "../../../shared/reducers";
import * as certificateActions from "../../../shared/actions/certificate.actions";
import * as deviceActions from "../../../shared/actions/device.actions";
import { Device, Rto, User, Certificate } from '../../../shared/models';
import { RtoService } from '../../../shared/services/rto.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CertificateEditComponent implements OnInit, OnDestroy {

  public certificateForm: FormGroup;
  public addCertificate: boolean;
  public devices: Device[] = [];
  public rto: Rto[] = [];
  public formdata: any;
  public brands: string[] = [];
  public monthMin: Date = new Date(1900, 0, 1);
  public monthMax: Date = new Date();
  public loggedUser: User = new User({});
  public certificate: Certificate;
  public certificateSubscription$: Subscription;

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _rtoService: RtoService
  ) {
    this._store.dispatch(new certificateActions.ClearCertificateDataAction);
    this.certificate = new Certificate({});
    this.loadFormdata();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addCertificate = false;
        this._store.dispatch(new certificateActions.FetchCertificateAction(params["id"]));
      } else {
        this.addCertificate = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.validateForm();
    this.formListener();
    this.initializers();
    this.fetchDevices();
    this.certificateSubscription$ = this._store.select(fromRoot.getCurrentCertificate).subscribe((certificate: Certificate) => {
      if (certificate.id) {
        this.certificate = certificate;
        this.certificateForm.patchValue(certificate);
        this.device_id.patchValue(certificate.device.id);
        this.vehicle_id.patchValue(certificate.vehicle.id);
        this.vehicle_make.patchValue(certificate.vehicle.make, { emitEvent: false });
        certificate.car_reg_number == 'NEW' ? this.car_reg_number.patchValue("", { emitEvent: false }) : null
      }
    });
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      this.rto = this._rtoService.getRto(user.details.state);
      this.location_state.patchValue(user.details.state, { emitEvent: false });
    });
  }

  ngOnDestroy() {
    this.certificateSubscription$.unsubscribe();
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      id: [null],
      device_id: [null, [Validators.required, Validators.minLength(4)]],
      invoice_no: [null, Validators.required],
      cutoff_speed: ['', [Validators.required, Validators.min(40), Validators.max(120)]],
      customer_name: [null, [Validators.required, Validators.minLength(4)]],
      customer_telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("[0-9]+")]],
      customer_address: [null],
      address_l1: [null, Validators.required],
      address_l2: [null],
      locality: [null],
      city: [null, Validators.required],
      pincode: ['', Validators.required],
      vehicle_make: [null, Validators.required],
      vehicle_id: [null, Validators.required],
      seals: [null, Validators.required],
      engine_number: [null, Validators.required],
      chassis_number: [null, Validators.required],
      car_reg_number: ["", [Validators.pattern("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$")]],
      location_rto: [null, Validators.required],
      location_state: [null, Validators.required],
      mfg_month_year: [null, Validators.required],
      reg_month_year: [null, Validators.required]
    });
  }

  get device_id(): FormControl {
    return this.certificateForm.get('device_id') as FormControl;
  }

  get customer_telephone(): FormControl {
    return this.certificateForm.get('customer_telephone') as FormControl;
  }

  get customer_address(): FormControl {
    return this.certificateForm.get('customer_address') as FormControl;
  }

  get address_l1(): FormControl {
    return this.certificateForm.get('address_l1') as FormControl;
  }

  get address_l2(): FormControl {
    return this.certificateForm.get('address_l2') as FormControl;
  }

  get locality(): FormControl {
    return this.certificateForm.get('locality') as FormControl;
  }

  get city(): FormControl {
    return this.certificateForm.get('city') as FormControl;
  }

  get pincode(): FormControl {
    return this.certificateForm.get('pincode') as FormControl;
  }

  get car_reg_number(): FormControl {
    return this.certificateForm.get('car_reg_number') as FormControl;
  }

  get vehicle_make(): FormControl {
    return this.certificateForm.get('vehicle_make') as FormControl;
  }

  get vehicle_id(): FormControl {
    return this.certificateForm.get('vehicle_id') as FormControl;
  }

  get location_state(): FormControl {
    return this.certificateForm.get('location_state') as FormControl;
  }

  loadFormdata() {
    this._store.dispatch(new certificateActions.FetchCertificateFormdataAction);
    this._store.select(fromRoot.getCertificateFormdata).subscribe(data => {
      if (data) {
        this.formdata = data;
        this.brands = [];
        for (var make in data["vehicle_makes"]) {
          this.brands.push(make);
        }
      }
    });
  }

  fetchDevices(event?) {
    this.device_id.patchValue(null, { emitEvent: false });
    this._store.dispatch(new deviceActions.FetchAllDevicesAction({
      sld_number: event ? event.target.value : null,
      status: "sold",
      per_page: 2000
    }));
  }

  getModels(): any[] {
    if (this.formdata) {
      return this.formdata.vehicle_makes[this.vehicle_make.value];
    }
    return;
  }

  formListener() {
    this.vehicle_make.valueChanges.subscribe(value => this.vehicle_id.patchValue(null, { emitEvent: false }));
  }

  validateForm() {
    if (this.addCertificate) {
      this.customer_address.clearValidators();
      this.address_l1.setValidators(Validators.required);
      this.address_l2.setValidators(Validators.required);
      this.locality.setValidators(Validators.required);
      this.city.setValidators(Validators.required);
      this.pincode.setValidators(Validators.required);
    } else {
      this.customer_address.setValidators(Validators.required);
      this.address_l1.clearValidators();
      this.address_l2.clearValidators();
      this.locality.clearValidators();
      this.city.clearValidators();
      this.pincode.clearValidators();
    }
    this.address_l1.updateValueAndValidity();
    this.address_l2.updateValueAndValidity();
    this.locality.updateValueAndValidity();
    this.city.updateValueAndValidity();
    this.pincode.updateValueAndValidity();
    this.customer_address.updateValueAndValidity();
  }

  initializers() {
    this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices);
  }

  saveChanges() {
    let formData = this.certificateForm.value;
    delete formData["vehicle_make"];
    formData["mfg_month_year"] = moment(new Date(formData["mfg_month_year"]).toISOString()).format("YYYY-MM-DD");
    formData["reg_month_year"] = moment(new Date(formData["reg_month_year"]).toISOString()).format("YYYY-MM-DD");
    formData["car_reg_number"] == "" ? (formData["car_reg_number"] = "NEW") : null
    if (this.addCertificate) {
      formData["customer_address"] = formData.address_l1 + ", " + formData.address_l2 + ", " + formData.locality + ", " + formData.city + " - " + formData.pincode;
      delete formData['address_l1'];
      delete formData['address_l2'];
      delete formData['locality'];
      delete formData['city'];
      delete formData['pincode'];
      this._store.dispatch(new certificateActions.CreateCertificateAction(formData));
    } else {
      this._store.dispatch(new certificateActions.UpdateCertificateAction(formData));
    }
  }

}
