import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { PasswordValidation } from '../../../shared/validators/password.validator';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/models';
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
  public addUser: boolean;
  public hasEsic: boolean = true;
  public distributors: User[] = [];
  public states: any[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    public _location: Location,
    private _rtoService: RtoService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
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
    this.fetchDistributors();
    this.formListener();
    this.states = this._rtoService.getStates();
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      this.filterRoles();
    });
    this._store.select(fromRoot.getCurrentUser).subscribe(user => {
      if (user.id) {
        this.userForm.patchValue(user, { emitEvent: false });
      }
    });
  }

  fetchDistributors() {
    this._store.dispatch(new userActions.FilterUsersAction({
      role: 'distributor'
    }));
    this._store.select(fromRoot.getAllUsers).subscribe(distributors => this.distributors = distributors);
  }

  formListener() {
    this.userForm.valueChanges.subscribe(value => {
      if (this.distributor_id.value) {
        let distributor: User = this.distributors.find(dist => this.distributor_id.value == dist.id);
        this.state.patchValue(distributor.details.state, { emitEvent: false });
        this.state_code.patchValue(distributor.details.state_code, { emitEvent: false });
      }
      this.hasEsic = value.details.base_salary + value.details.transport_allowance + value.details.hra + value.details.gpf < 16000 ? true : false;
      if (this.employeeCheck()) {
        this.base_salary.setValidators([Validators.required, Validators.min(0)]);
        this.hra.setValidators([Validators.required, Validators.min(0)]);
        this.transport_allowance.setValidators([Validators.required, Validators.min(0)]);
        this.gpf.setValidators([Validators.required, Validators.min(0)]);
        this.gstn.clearValidators();
      } else {
        this.base_salary.clearValidators();
        this.hra.clearValidators();
        this.transport_allowance.clearValidators();
        this.gpf.clearValidators();
        this.role.value != 'manufacturer' ? this.gstn.setValidators([Validators.required, Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[a-zA-Z0-9]+")]) : this.gstn.clearValidators();
      }
      this.base_salary.updateValueAndValidity({ emitEvent: false });
      this.hra.updateValueAndValidity({ emitEvent: false });
      this.transport_allowance.updateValueAndValidity({ emitEvent: false });
      this.gpf.updateValueAndValidity({ emitEvent: false });
      this.gstn.updateValueAndValidity({ emitEvent: false });
    });
  }

  employeeCheck() {
    if (this.role.value != undefined) {
      let flag = this.roles.filter(role => role.value == this.role.value)[0].value;
      return (flag != "manufacturer" && flag != "distributor" && flag != "dealer") ? true : false;
    }
  }

  filterRoles() {
    if (this.loggedUser.role == 'human_resource') {
      this.roles = this.roles.filter(role => (role.value != 'dealer' && role.value != 'distributor' && role.value != 'manufacturer'));
    } else if (this.loggedUser.role == 'sales') {
      this.roles = this.roles.filter(role => (role.value == 'dealer' || role.value == 'distributor'));
    }
  }

  buildForm() {
    this.userForm = this._fb.group(
      {
        id: null,
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        role: [null, Validators.required],
        distributor_id: [null],
        password: [null, [Validators.minLength(6)]],
        password_confirmation: [null, [Validators.minLength(6)]],
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

  get name(): FormControl {
    return this.userForm.get("name") as FormControl;
  }
  get email(): FormControl {
    return this.userForm.get("email") as FormControl;
  }
  get role(): FormControl {
    return this.userForm.get("role") as FormControl;
  }
  get distributor_id(): FormControl {
    return this.userForm.get("distributor_id") as FormControl;
  }
  get password(): FormControl {
    return this.userForm.get("password") as FormControl;
  }
  get password_confirmation(): FormControl {
    return this.userForm.get("password_confirmation") as FormControl;
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
  get state_code(): FormControl {
    return this.details.get("state_code") as FormControl;
  }
  get pincode(): FormControl {
    return this.details.get("pincode") as FormControl;
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

  saveChanges() {
    let formData = this.userForm.value;
    if (formData.details.state != null && formData.role == 'distributor') {
      formData["details"]["state_code"] = formData.details.state.code;
      formData["details"]["state"] = formData.details.state.name;
    }
    if (this.addUser) {
      formData.details["address"] = formData.details.address_l1 + ", " + formData.details.address_l2 + ", " + formData.details.locality + ", " + formData.details.city + " - " + formData.details.pincode;
      delete formData.details['address_l1'];
      delete formData.details['address_l2'];
      delete formData.details['locality'];
      delete formData.details['city'];
      delete formData.details['pincode'];
      this._store.dispatch(new userActions.CreateNewUserAction({ user: formData }));
    } else {
      this._store.dispatch(new userActions.UpdateUserAction({ user: formData }));
    }
  }

}
