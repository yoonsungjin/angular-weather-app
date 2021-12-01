import { weatherState } from 'src/app/store/weather.reducer';
import { WeatherService } from './../service/weather.service';
import * as WeatherActions from './weather.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { getCoords } from './weather.selectors';
import { Store } from '@ngrx/store';
import { WeatherData } from '../service/weather.model';

@Injectable()
export class WeatherEffects {

  constructor(
    private actions$: Actions,
    private store: Store<weatherState>,
    private weatherService: WeatherService
  ) {}

  searchByCityName$ = createEffect(() =>this.actions$.pipe(
      ofType(WeatherActions.search),
      tap((action) => console.log('search effect fired', action)),
      switchMap(action => this.weatherService.getWeatherDataByCityName(action.cityName)
        .pipe(
          map(data => {
            return WeatherActions.searchSuccess({weatherData: data})
          })
        )
      )
    )
  );

  loadHourlyForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadHourlyForecast),
    withLatestFrom(this.store.select(getCoords)),
    switchMap(([action, weatherData]: [any, WeatherData]) => this.weatherService.getHourlyWeatherData(weatherData).pipe(
      map(data => {
        console.log(data);
        return WeatherActions.loadHourlyForecastSuccess({data})
      })
    ))
  ));

  loadDailyForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadDailyForecast),
    tap(() => console.log('loadDailyForecast effect fired')),
    switchMap(() => this.weatherService.getDailyWeatherData({ lat: '43.7001', lon: '-79.4163' }).pipe(
      map(dailyData => WeatherActions.loadDailyForecastSuccess({dailyData}))
    ))
  ));


}
