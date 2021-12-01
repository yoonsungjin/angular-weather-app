import { HourlyForecastComponent } from './component/hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from './component/daily-forecast/daily-forecast.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'hourly', component: HourlyForecastComponent},
  {path: 'daily', component: DailyForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
