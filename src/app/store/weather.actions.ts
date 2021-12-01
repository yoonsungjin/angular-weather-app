import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../service/weather.model';

export const search = createAction(
  '[Weather] Search',
  props<{ cityName: string }>()
);

export const searchSuccess = createAction(
  '[Weather] Search Success',
  props<{ weatherData: WeatherData }>()
);

export const searchFailure = createAction(
  '[Weather] SearchFailure',
  props<{ error: any }>()
);

export const loadHourlyForecast = createAction(
  '[Weather] Load Hourly Forecast'
);

export const loadHourlyForecastSuccess = createAction(
  '[Weather] Load Hourly Forecast Success',
  props<{ data: Object }>()
);

export const loadDailyForecast = createAction(
  '[Weather] Load Daily Forecast'
);

export const loadDailyForecastSuccess = createAction(
  '[Weather] Load Daily Forecast Success',
  props<{ dailyData: Object }>()
);
