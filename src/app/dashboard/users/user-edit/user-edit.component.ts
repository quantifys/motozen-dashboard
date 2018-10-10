import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { PasswordValidation } from '../../../shared/validators/password.validator';
import { ActivatedRoute } from '@angular/router';
import { User, State } from '../../../shared/models';
import { RtoService } from '../../../shared/services/rto.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public roles = [
    {
      display: "Store purchases",
      value: "store_purchases"
    },
    {
      display: "Store dispatch",
      value: "store_dispatch"
    },
    {
      display: "Store logistics",
      value: "store_logistics"
    },
    {
      display: "Accounts",
      value: "accounts"
    },
    {
      display: "Sales",
      value: "sales"
    },
    {
      display: "Plant supervisor",
      value: "plant_supervisor"
    },
    {
      display: "Plant manager",
      value: "plant_manager"
    },
    {
      display: "Human Resources",
      value: "human_resource"
    },
    {
      display: "RTO (Regional Transport Office)",
      value: "rto"
    },
    {
      display: "Administrator",
      value: "admin"
    },
    {
      display: "Dealer",
      value: "dealer"
    },
    {
      display: "Distributor",
      value: "distributor"
    },
    {
      display: "Manufacturer",
      value: "manufacturer"
    }
  ];
  public userForm: FormGroup;
  public loggedUser: User = new User({});
  public addUser: boolean = true;
  public distributors: User[] = [];
  public states: State[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _rtoService: RtoService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this._store.dispatch(new userActions.ClearCurrentUserAction);
    this._store.dispatch(new userActions.FetchAllUsersAction({ role: 'distributor' }));
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addUser = false;
        this._store.dispatch(new userActions.FetchUserAction(params["id"]));
      } else {
        this.addUser = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this.passwordValidate();
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user
      this.filterRoles();
    });
    this._store.select(fromRoot.getAllUsers).subscribe(distributors => this.distributors = distributors);
    this.states = this._rtoService.getStates();
    this._store.select(fromRoot.getCurrentUserStats).subscribe(stats => {
      if (!this.addUser) {
        this.userForm.patchValue(stats.user);
        if (this.role.value == 'distributor' || this.role.value == 'rto') {
          this.state.patchValue(stats.user.details.state, { emitEvent: false });
          this.state_code.patchValue(stats.user.details.state_code, { emitEvent: false });
        }
      }
    });
  }

  buildForm() {
    this.userForm = this._fb.group(
      {
        id: null,
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        role: [null, Validators.required],
        distributor_id: [null],
        password: [null],
        password_confirmation: [null],
        details: this._fb.group({
          contact: [null, [Validators.minLength(10), Validators.maxLength(13), Validators.pattern("[0-9]+")]],
          address: [null],
          address_l1: [null],
          address_l2: [null],
          locality: [null],
          city: [null],
          state: [null],
          state_code: [null],
          pincode: [null],
          gstn: [null],
          base_salary: [null],
          hra: [null],
          transport_allowance: [null],
          esic: [null],
          gpf: [null]
        })
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  get distributor_id(): FormControl {
    return this.userForm.get("distributor_id") as FormControl;
  }

  get role(): FormControl {
    return this.userForm.get("role") as FormControl;
  }

  get details(): FormGroup {
    return this.userForm.get("details") as FormGroup;
  }

  get contact(): FormControl {
    return this.details.get("contact") as FormControl;
  }

  get address(): FormControl {
    return this.details.get("address") as FormControl;
  }

  get address_l1(): FormControl {
    return this.details.get("address_l1") as FormControl;
  }

  get address_l2(): FormControl {
    return this.details.get("address_l2") as FormControl;
  }

  get locality(): FormControl {
    return this.details.get("locality") as FormControl;
  }

  get city(): FormControl {
    return this.details.get("city") as FormControl;
  }

  get state(): FormControl {
    return this.details.get("state") as FormControl;
  }

  get pincode(): FormControl {
    return this.details.get("pincode") as FormControl;
  }

  get state_code(): FormControl {
    return this.details.get("state_code") as FormControl;
  }

  get gstn(): FormControl {
    return this.details.get("gstn") as FormControl;
  }

  get base_salary(): FormControl {
    return this.details.get("base_salary") as FormControl;
  }

  get hra(): FormControl {
    return this.details.get("hra") as FormControl;
  }

  get transport_allowance(): FormControl {
    return this.details.get("transport_allowance") as FormControl;
  }

  get esic(): FormControl {
    return this.details.get("esic") as FormControl;
  }

  get gpf(): FormControl {
    return this.details.get("gpf") as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get("password") as FormControl;
  }

  get password_confirmation(): FormControl {
    return this.userForm.get("password_confirmation") as FormControl;
  }

  filterRoles() {
    if (this.loggedUser.role == 'human_resource') {
      this.roles = this.roles.filter(role => (role.value != 'dealer' && role.value != 'distributor' && role.value != 'admin' && role.value != 'manufacturer'));
    } else if (this.loggedUser.role == 'sales') {
      this.roles = this.roles.filter(role => (role.value == 'dealer' || role.value == 'distributor'));
    } else if (this.loggedUser.role == 'admin') {
      this.roles = this.roles.filter(role => role.value != 'manufacturer');
    }
  }

  checkEsic(): boolean {
    return this.base_salary.value + this.transport_allowance.value + this.hra.value + this.gpf.value < 16000
  }

  formListener() {
    this.role.valueChanges.subscribe(value => {
      switch (value) {
        case 'manufacturer':
          this.details.disable();
          this.distributor_id.disable();
          return;
        case 'dealer':
          this.details.enable();
          this.distributor_id.enable();
          this.distributor_id.setValidators(Validators.required);
          this.distributor_id.updateValueAndValidity();
          this.addressValidate();
          break;
        case 'distributor':
          this.details.enable();
          this.distributor_id.disable();
          this.gstn.setValidators([Validators.required, Validators.pattern("[a-zA-Z0-9]+"), Validators.minLength(15), Validators.maxLength(15)]);
          this.gstn.updateValueAndValidity();
          this.addressValidate();
          break;
        default:
          this.distributor_id.disable();
          this.details.enable();
          this.addressValidate();
          break;
      }
    });
    this.distributor_id.valueChanges.subscribe(value => {
      if (this.role.value == 'dealer') {
        let distributor: User = this.distributors.find(distributor => distributor.id == this.distributor_id.value);
        if (distributor) {
          this.state.patchValue(distributor.details.state, { emitEvent: false });
          this.state_code.patchValue(distributor.details.state_code, { emitEvent: false });
        } else {
          this.state.patchValue(null, { emitEvent: false });
          this.state_code.patchValue(null, { emitEvent: false });
        }
      }
    });
    this.state.valueChanges.subscribe(state => {
      if ((this.role.value == 'distributor' || this.role.value == 'rto') && state) {
        this.state.patchValue(state.name, { emitEvent: false });
        this.state_code.patchValue(state.code, { emitEvent: false });
      }
    });
  }

  passwordValidate() {
    if (this.addUser) {
      this.password.setValidators([Validators.required, Validators.minLength(6)]);
      this.password_confirmation.setValidators([Validators.required, Validators.minLength(6)]);
      this.password.updateValueAndValidity();
      this.password_confirmation.updateValueAndValidity();
    }
  }

  addressValidate() {
    if (this.addUser) {
      let controls: string[] = ["address_l1", "address_l2", "locality", "city", "state", 'pincode'];
      controls.map(control => {
        this.details.get(control).setValidators(Validators.required);
        this.details.get(control).updateValueAndValidity();
      });
    } else {
      this.address.setValidators(Validators.required);
      this.address.updateValueAndValidity();
    }
    let detailControls: string[] = ["address", "address_l1", "address_l2", "locality", "city", "state", "pincode", "gstn", "state_code"];
    let employeeControls: string[] = ["base_salary", "hra", "transport_allowance", "gpf", "esic"];
    if (this.role.value == 'rto') {
      detailControls = detailControls.filter(data => data != 'state' && data != 'state_code');
    }
    detailControls.map(control => {
      if (this.role.value != 'distributor' && this.role.value != 'dealer') {
        this.details.get(control).disable();
      } else {
        this.details.get(control).enable();
      }
    });
    employeeControls.map(control => {
      if (this.role.value != 'distributor' && this.role.value != 'dealer' && this.role.value != 'rto') {
        this.details.get(control).enable();
      } else {
        this.details.get(control).disable();
      }
    });
  }

  saveChanges() {
    if (this.addUser) {
      let formData = this.userForm.value;
      if (formData["role"] == 'distributor' || formData["role"] == 'dealer') {
        formData.details["address"] = formData.details.address_l1 + ",\n" + formData.details.address_l2 + ",\n" + formData.details.locality + ", \n" + formData.details.city + " - " + formData.details.pincode;
      }
      delete formData.details['address_l1'];
      delete formData.details['address_l2'];
      delete formData.details['locality'];
      delete formData.details['city'];
      delete formData.details['pincode'];
      this._store.dispatch(new userActions.CreateNewUserAction({
        user: this.userForm.value
      }));
    } else {
      this._store.dispatch(new userActions.UpdateUserAction({
        user: this.userForm.value
      }));
    }
  }

}
