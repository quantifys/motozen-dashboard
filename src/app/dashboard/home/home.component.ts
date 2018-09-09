import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as dashboardActions from '../../shared/actions/dashboard.actions';
import { BarChartConfig } from '../../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public stockChartData: any[] = [["Quantity","automotive_connector"],["Toyota Innova Connector",0],["Honda Brio Connector",399],["Hyundai i10 Connector",0]];
  public stockChartConfig: BarChartConfig;
  public stockData: any[] = [];

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this._store.dispatch(new dashboardActions.FetchDashboardDataAction);
    this.stockChartConfig = new BarChartConfig({
      bars: "vertical",
      legend: {
        position: "none"
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getDashboardData).subscribe(data => {
      console.log(data);
      this.loadStockData(data);
    });
  }

  loadStockData(data) {
    if (data) {
      for (let name in data["inventory"]) {
        let stock: any[] = [];
        stock.push(["Quantity", name]);
        for (let itemName in data["inventory"][stock[0][1]]) {
          stock.push([itemName, data["inventory"][stock[0][1]][itemName]]);
        }
        this.stockData.push(stock);
      }
      console.log(JSON.stringify(this.stockData[0]));
      this.stockChartData = this.stockData[0];
    }
  }

}
