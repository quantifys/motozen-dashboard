import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { reducers } from './shared/reducers';

import { RtoService } from './shared/services/rto.service';

import { UserEffects } from './shared/effects/user.effects';
import { DeviceEffects } from './shared/effects/device.effects';
import { InventoryEffects } from './shared/effects/inventory.effects';
import { CertificateEffects } from './shared/effects/certificate.effects';
import { VehicleEffects } from './shared/effects/vehicle.effects';
import { ExpenseEffects } from './shared/effects/expense.effects';
import { PurchaseOrderEffects } from './shared/effects/purchase-order.effects';
import { ReceiveNoteEffects } from './shared/effects/receive-note.effects';
import { RequisitionOrderEffects } from './shared/effects/requisition-order.effects';
import { SalarySlipEffects } from './shared/effects/salary-slip.effects';
import { TransactionEffects } from './shared/effects/transaction.effects';
import { VendorEffects } from './shared/effects/vendor.effects';

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
    EffectsModule.forRoot([
      UserEffects,
      DeviceEffects,
      VehicleEffects,
      InventoryEffects,
      CertificateEffects,
      ExpenseEffects,
      PurchaseOrderEffects,
      ReceiveNoteEffects,
      RequisitionOrderEffects,
      SalarySlipEffects,
      TransactionEffects,
      VendorEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [Angular2TokenService, RtoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
