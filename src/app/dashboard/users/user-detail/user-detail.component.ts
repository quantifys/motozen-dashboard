import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { UserStats, PieChartConfig, User } from '../../../shared/models';
import { UserDeleteComponent, UserChangePasswordComponent } from '../user-control/user-control.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnDestroy{

  public loggedUser: User = new User({});
  public userStats: UserStats = new UserStats({});
  public statSubscription$: Subscription = new Subscription();
  public deviceChartData: any[];
  public poChartData: any[];
  public certChartData: any[];
  public pieChartConfig: PieChartConfig;
  public barChartConfig: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
    this.pieChartConfig = new PieChartConfig({
      is3D: true,
      legend: {
        position: "bottom"
      }
    });
    this.barChartConfig = {
      bars: "vertical",
      legend: {
        position: "none"
      }
    };
    this.statSubscription$ = this._store.select(fromRoot.getCurrentUserStats).subscribe(stats => {
      this.userStats = stats;
      if (this.userStats.user.role == 'distributor' || this.userStats.user.role == 'dealer') {
        this.deviceChartData = [
          ['Type', 'Devices'],
          ["Certified", this.userStats.device_stats.certified_count],
          ["In stock", this.userStats.device_stats.in_stock_count]
        ];

        if (this.userStats.user.role == 'distributor') {
          this.poChartData = [['Months', 'Devices Purchased']];
          this.userStats.po_stats.purchase_graph.data.map(month => this.poChartData.push(month));
        }
        this.certChartData = [['Months', 'Certificates issued']];
        this.userStats.certificate_stats.issue_graph.data.map(month => this.certChartData.push(month));
      }
    });
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new userActions.FetchUserAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "users"]);
      }
    });
  }

  ngOnDestroy() {
    this.statSubscription$.unsubscribe();
  }

  deleteUser() {
    this.bottomSheet.open(UserDeleteComponent);
  }

  changePassword() {
    this.bottomSheet.open(UserChangePasswordComponent);
  }

}
