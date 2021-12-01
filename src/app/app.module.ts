import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/weather.reducer';
import { DailyForecastComponent } from './component/daily-forecast/daily-forecast.component';
import { HourlyForecastComponent } from './component/hourly-forecast/hourly-forecast.component';
import { SearchComponent } from './component/search/search.component';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/weather.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DailyForecastComponent,
    HourlyForecastComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      weather: reducer
    }),
    HttpClientModule,
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
