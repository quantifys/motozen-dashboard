import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angular2TokenService } from 'angular2-token';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { reducers } from './shared/reducers';

import { VehicleSelectModule } from './dashboard/vehicle-select/vehicle-select.module';

import { DashboardEffects } from './shared/effects/dashboard.effects';
import { UserEffects } from './shared/effects/user.effects';
import { DeviceEffects } from './shared/effects/device.effects';
import { InventoryEffects } from './shared/effects/inventory.effects';
import { CertificateEffects } from './shared/effects/certificate.effects';
import { VehicleEffects } from './shared/effects/vehicle.effects';
import { PurchaseOrderEffects } from './shared/effects/purchase-order.effects';
import { ReceiveNoteEffects } from './shared/effects/receive-note.effects';
import { RequisitionOrderEffects } from './shared/effects/requisition-order.effects';
import { SalarySlipEffects } from './shared/effects/salary-slip.effects';
import { IncomeEffects } from './shared/effects/income.effects';
import { ExpenseEffects } from './shared/effects/expense.effects';
import { TransactionEffects } from './shared/effects/transaction.effects';
import { VendorEffects } from './shared/effects/vendor.effects';
import { ReportEffects } from './shared/effects/reports.effects';
import { TrackerDeviceEffects } from './shared/effects/tracker-device.effects';

import { RtoService } from './shared/services/rto.service';
import { CertificateService } from './shared/services/certificate.service';
import { PurchaseOrderService } from './shared/services/purchase-order.service';
import { RequisitionOrderService } from './shared/services/requisition-order.service';
import { GooglePieChartService } from './shared/services/google-pie-chart.service';
import { GoogleBarChartService } from './shared/services/google-bar-chart.service';
import { CsvReportService } from './shared/services/csv-report.service';
import { VehicleSelectService } from './shared/services/vehicle-select.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    MatDialogModule,
    VehicleSelectModule,
    EffectsModule.forRoot([
      DashboardEffects,
      UserEffects,
      DeviceEffects,
      VehicleEffects,
      InventoryEffects,
      CertificateEffects,
      PurchaseOrderEffects,
      ReceiveNoteEffects,
      RequisitionOrderEffects,
      IncomeEffects,
      ExpenseEffects,
      TransactionEffects,
      SalarySlipEffects,
      VendorEffects,
      ReportEffects,
      TrackerDeviceEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [
    Angular2TokenService,
    RtoService,
    CertificateService,
    PurchaseOrderService,
    RequisitionOrderService,
    DatePipe,
    GooglePieChartService,
    GoogleBarChartService,
    CsvReportService,
    VehicleSelectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
