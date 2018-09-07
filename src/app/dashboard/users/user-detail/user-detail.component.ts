import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
import { UserStats, PieChartConfig, BarChartConfig } from '../../../shared/models';
import { UserDeleteComponent, UserChangePasswordComponent } from '../user-control/user-control.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  public userStats: UserStats = new UserStats({});
  public certificateChartData: any[];
  public deviceChartData: any[];
  public poChartData: any[] = [
    ['Months', 'Orders']
  ];
  public pieChartConfig: PieChartConfig;
  public barChartConfig: BarChartConfig;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this.pieChartConfig = new PieChartConfig({
      is3D: true,
      legend: {
        position: "bottom"
      }
    });
    this.barChartConfig = new BarChartConfig({
      bars: "vertical",
      legend: {
        position: "none"
      }
    });
    this._store.select(fromRoot.getCurrentUserStats).subscribe(stats => {
      this.userStats = stats;
      if (this.userStats.user.role == 'distributor' || this.userStats.user.role == 'dealer') {
        this.certificateChartData = [
          ['Type', 'Devices'],
          ["Valid", this.userStats.certificate_stats.valid_count],
          ["Expired", this.userStats.certificate_stats.expired_count]
        ];
        this.deviceChartData = [
          ['Type', 'Devices'],
          ["Certified", this.userStats.device_stats.certified_count],
          ["In stock", this.userStats.device_stats.in_stock_count]
        ];

        if (this.userStats.user.role == 'distributor') {
          this.userStats.po_stats.purchase_graph.xaxis.map((month, index) => {
            this.poChartData.push([month, this.userStats.po_stats.purchase_graph.yaxis[index]]);
          });
        }
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

  deleteUser() {
    this.bottomSheet.open(UserDeleteComponent);
  }

  changePassword() {
    this.bottomSheet.open(UserChangePasswordComponent);
  }

}
