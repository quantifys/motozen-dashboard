import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { reducers } from './shared/reducers';
import { UserEffects } from './shared/effects/user.effects';
import { RtoService } from './shared/services/rto.service';
import { HttpClientModule } from '@angular/common/http';
import { DeviceEffects } from './shared/effects/device.effects';
import { InventoryEffects } from './shared/effects/inventory.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects,
      DeviceEffects,
      InventoryEffects
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
