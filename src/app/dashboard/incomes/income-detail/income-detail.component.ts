import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Location } from '@angular/common';

import * as fromRoot from '../../../shared/reducers';
import * as incomeActions from '../../../shared/actions/income.actions';
import { Cost } from '../../../shared/models';
import { IncomeDeleteComponent } from '../income-delete/income-delete.component';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss']
})
export class IncomeDetailComponent implements OnInit {

  public income: Cost = new Cost({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new incomeActions.FetchIncomeAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "income"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentIncome).subscribe(income => this.income = income);
  }

  deleteIncome() {
    this.bottomSheet.open(IncomeDeleteComponent);
  }

}
