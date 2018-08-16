import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as salarySlipActions from '../../../shared/actions/salary-slip.actions';
import { SalarySlip, User } from '../../../shared/models';

@Component({
  selector: 'app-salary-slip-detail',
  templateUrl: './salary-slip-detail.component.html',
  styleUrls: ['./salary-slip-detail.component.scss']
})
export class SalarySlipDetailComponent implements OnInit {

  private userSubscription$: Subscription = new Subscription();
  private routerSubscription$: Subscription = new Subscription();
  private salarySlipSubscription$: Subscription = new Subscription();
  public salarySlip: SalarySlip = new SalarySlip({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new salarySlipActions.FetchSalarySlipAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "salary-slips"]);
      }
    });
  }

  ngOnInit() {
    this.salarySlipSubscription$ = this._store.select(fromRoot.getCurrentSalarySlip).subscribe(salarySlip => this.salarySlip = salarySlip);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
    this.salarySlipSubscription$.unsubscribe();
  }

}
