import { weatherState } from 'src/app/store/weather.reducer';
import { WeatherService } from './../service/weather.service';
import * as WeatherActions from './weather.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
    switchMap(action => this.weatherService.getWeatherDataByCityName(action.cityName)
      .pipe(
        map(data => {
          return WeatherActions.searchSuccess({weatherData: data[0]})
        })
      )
    )
  ));

  loadHourlyForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadHourlyForecast),
    withLatestFrom(this.store.select(getCoords)),
    concatMap(([action, weatherData]: [any, WeatherData]) => this.weatherService.getHourlyWeatherData(weatherData).pipe(
      map(data => {
        return WeatherActions.loadHourlyForecastSuccess({data})
      })
    ))
  ));

  loadDailyForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadDailyForecast),
    withLatestFrom(this.store.select(getCoords)),
    concatMap(([action, weatherData]: [any, WeatherData]) => this.weatherService.getDailyWeatherData(weatherData).pipe(
      map(data => {
        return WeatherActions.loadDailyForecastSuccess({dailyData: data})
      })
    ))
  ));
}
