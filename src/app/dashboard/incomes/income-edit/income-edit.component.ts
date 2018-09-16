import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../shared/reducers";
import * as incomeActions from "../../../shared/actions/income.actions";

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss']
})
export class IncomeEditComponent implements OnInit, OnDestroy {

  public addIncome: boolean = false;
  public incomeForm: FormGroup;
  public incomeSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location
  ) {
    this._store.dispatch(new incomeActions.ClearIncomeDataAction);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addIncome = false;
        this._store.dispatch(new incomeActions.FetchIncomeAction(params["id"]));
      } else {
        this.addIncome = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.incomeSubscription$ = this._store.select(fromRoot.getCurrentIncome).subscribe(income => this.incomeForm.patchValue(income));
  }

  ngOnDestroy() {
    this.incomeSubscription$.unsubscribe();
  }

  buildForm() {
    this.incomeForm = this._fb.group({
      id: null,
      category: [null, Validators.required],
      description: [null, Validators.required],
      total: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get total(): FormControl {
    return this.incomeForm.get("total") as FormControl;
  }

  saveChanges() {
    if (this.addIncome) {
      this._store.dispatch(new incomeActions.CreateIncomeAction(this.incomeForm.value));
    } else {
      this._store.dispatch(new incomeActions.UpdateIncomeAction({ income: this.incomeForm.value }));
    }
  }

}
