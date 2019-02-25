import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs';
import moment from 'moment';

import * as fromRoot from '../../../shared/reducers';
import * as certificateActions from '../../../shared/actions/certificate.actions';
import { Device, Rto, User, Certificate, Vehicle } from '../../../shared/models';
import { RtoService } from '../../../shared/services/rto.service';

declare var $: any;

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
  public models: string[] = [];
  public monthMin: Date = new Date(1900, 0, 1);
  public monthMax: Date = new Date();
  public loggedUser: User = new User({});
  public certificate: Certificate;
  public unique: boolean;
  public variants: Vehicle[] = [];
  public certificateSubscription$: Subscription = new Subscription();
  public routeSubscription$: Subscription = new Subscription();
  public userSubscription$: Subscription = new Subscription();
  public uniqeSubscription$: Subscription = new Subscription();
  public formDataSubscription$: Subscription = new Subscription();
  public makeSubscription$: Subscription = new Subscription();
  public modelSubscription$: Subscription = new Subscription();
  public deviceSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _rtoService: RtoService
  ) {
    this._store.dispatch(new certificateActions.ClearCertificateDataAction);
    this.certificate = new Certificate({});
    this.routeSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addCertificate = false;
        this.loadFormdata(+params['id']);
        this._store.dispatch(new certificateActions.FetchCertificateAction(params['id']));
      } else {
        this.addCertificate = true;
        this.loadFormdata();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.validateForm();
    this.formListener();
    this.initializers();
    this.certificateSubscription$ = this._store.select(fromRoot.getCurrentCertificate).subscribe((certificate: Certificate) => {
      if (certificate.id) {
        if (this.loggedUser.role === 'admin') {
          this.rto = this._rtoService.getRto(certificate.location_state);
        }
        this.certificate = certificate;
        this.certificateForm.patchValue(certificate);
        this.device_id.patchValue(certificate.device.id);
        this.vehicle_make.patchValue(certificate.vehicle.make);
        this.vehicle_model.patchValue(certificate.vehicle.model);
        this.vehicle_id.patchValue(certificate.vehicle.id);
        // tslint:disable-next-line
        certificate.car_reg_number === 'NEW' ? this.car_reg_number.patchValue('', { emitEvent: false }) : null
      }
    });
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role !== 'admin') {
        this.rto = this._rtoService.getRto(user.details.state);
      }
      this.location_state.patchValue(user.details.state, { emitEvent: false });
      if (this.loggedUser.details.state === 'Delhi') {
        this.picture_data.setValidators(Validators.required);
        this.picture_data.updateValueAndValidity();
      }
    });
    this.uniqeSubscription$ = this._store.select(fromRoot.checkCertificateUnique).subscribe(unique => {
      if (unique) {
        this.saveChanges();
      }
    });
  }

  ngOnDestroy() {
    this.certificateSubscription$.unsubscribe();
    this.routeSubscription$.unsubscribe();
    this.userSubscription$.unsubscribe();
    this.uniqeSubscription$.unsubscribe();
    this.formDataSubscription$.unsubscribe();
    this.makeSubscription$.unsubscribe();
    this.modelSubscription$.unsubscribe();
    this.deviceSubscription$.unsubscribe();
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      id: [null],
      device_id: [null, [Validators.required, Validators.minLength(4)]],
      invoice_no: [null, Validators.required],
      cutoff_speed: ['', [Validators.required, Validators.min(40), Validators.max(120)]],
      customer_name: [null, [Validators.required, Validators.minLength(4)]],
      customer_telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+')]],
      customer_address: [null],
      address_l1: [null, Validators.required],
      address_l2: [null],
      locality: [null],
      city: [null, Validators.required],
      pincode: ['', Validators.required],
      vehicle_make: [null, Validators.required],
      vehicle_model: [null, Validators.required],
      vehicle_id: [null, Validators.required],
      seals: [null, Validators.required],
      engine_number: [null, Validators.required],
      chassis_number: [null, Validators.required],
      car_reg_number: ['', [Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')]],
      location_rto: [null, Validators.required],
      location_state: [null, Validators.required],
      mfg_month_year: [null, Validators.required],
      reg_month_year: [null, Validators.required],
      picture_data: [null]
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

  get chassis_number(): FormControl {
    return this.certificateForm.get('chassis_number') as FormControl;
  }

  get engine_number(): FormControl {
    return this.certificateForm.get('engine_number') as FormControl;
  }

  get car_reg_number(): FormControl {
    return this.certificateForm.get('car_reg_number') as FormControl;
  }

  get vehicle_make(): FormControl {
    return this.certificateForm.get('vehicle_make') as FormControl;
  }

  get vehicle_model(): FormControl {
    return this.certificateForm.get('vehicle_model') as FormControl;
  }

  get vehicle_id(): FormControl {
    return this.certificateForm.get('vehicle_id') as FormControl;
  }

  get location_state(): FormControl {
    return this.certificateForm.get('location_state') as FormControl;
  }

  get picture_data(): FormControl {
    return this.certificateForm.get('picture_data') as FormControl;
  }

  loadFormdata(id?: number) {
    this._store.dispatch(new certificateActions.FetchCertificateFormdataAction(id));
    this.formDataSubscription$ = this._store.select(fromRoot.getCertificateFormdata).subscribe(data => {
      if (data) {
        const newFormData: any = {};
        this.devices = data.devices.filter(device => new Device(device));
        this.formdata = data;
        this.brands = [];
        for (const make in data['vehicle_makes']) {
          newFormData[make.toUpperCase()] = data['vehicle_makes'][make];
          this.brands.push(make.toUpperCase());
        }
        this.formdata['vehicle_makes'] = newFormData;
      }
    });
  }

  getModels(): any[] {
    if (this.formdata) {
      if (this.vehicle_make.value) {
        this.models = [];
        this.variants = [];
        if (this.formdata.vehicle_makes[this.vehicle_make.value]) {
          this.formdata.vehicle_makes[this.vehicle_make.value].map(vehicle => {
            if (!this.models.includes(vehicle.model)) {
              this.models.push(vehicle.model);
            }
          });
        }
      }
      return this.models;
    }
    return;
  }

  getVariants(): Vehicle[] {
    if (this.formdata) {
      if (this.vehicle_make.value) {
        if (this.formdata.vehicle_makes[this.vehicle_make.value]) {
          return this.formdata.vehicle_makes[this.vehicle_make.value]
            .filter((vehicle: Vehicle) => vehicle.model === this.vehicle_model.value ? vehicle : null);
        }
      }
    }
    return;
  }

  formListener() {
    this.makeSubscription$ = this.vehicle_make.valueChanges.subscribe(value => {
      this.vehicle_model.patchValue(null, { emitEvent: false });
      this.vehicle_id.patchValue(null, { emitEvent: false });
      this.getModels();
    });
    this.modelSubscription$ = this.vehicle_model.valueChanges.subscribe(value => {
      this.variants = this.getVariants();
      this.vehicle_id.patchValue(null, { emitEvent: false });
    });
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

  pictureLoaded(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.picture_data.patchValue(e.target.result);
        this.picture_data.markAsDirty();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  initializers() {
    this.deviceSubscription$ = this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices);
  }

  saveChanges() {
    const formData = this.certificateForm.value;
    delete formData['vehicle_make'];
    delete formData['vehicle_model'];
    formData['mfg_month_year'] = moment(new Date(formData['mfg_month_year']).toISOString()).format('YYYY-MM-DD');
    formData['reg_month_year'] = moment(new Date(formData['reg_month_year']).toISOString()).format('YYYY-MM-DD');
    // tslint:disable-next-line
    formData['car_reg_number'] === '' ? (formData['car_reg_number'] = 'NEW') : null;
    if (this.addCertificate) {
      formData['customer_address'] = formData.address_l1 + ', ' + formData.address_l2 + ', ' + formData.locality + ', '
        + formData.city + ' - ' + formData.pincode;
      delete formData['address_l1'];
      delete formData['address_l2'];
      delete formData['locality'];
      delete formData['city'];
      delete formData['pincode'];
      this._store.dispatch(new certificateActions.CreateCertificateAction(formData));
    } else {
      if (this.picture_data.pristine) {
        delete formData['picture_data'];
      }
      this._store.dispatch(new certificateActions.UpdateCertificateAction(formData));
    }
  }

  verify() {
    const data: any = {};
    ['car_reg_number', 'chassis_number', 'engine_number'].map(field => {
      const control: FormControl = this.certificateForm.get(field) as FormControl;
      if (control.dirty) {
        data[field] = control.value;
      }
    });
    if ($.isEmptyObject(data)) {
      this.saveChanges();
    } else {
      this._store.dispatch(new certificateActions.CertificateCheckUniqueAction(data));
    }
  }
}
