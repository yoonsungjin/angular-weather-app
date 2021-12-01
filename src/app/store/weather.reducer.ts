import { Action, createReducer, on } from '@ngrx/store';
import { WeatherData } from '../service/weather.model';
import * as WeatherActions from './weather.actions';


export const weatherFeatureKey = 'weather';

export interface weatherState {
  loading: boolean;
  weatherData: WeatherData;
  cityName: string;
  data: Object;
  dailyData: Object;
}

export const initialState: weatherState = {
  loading: false,
  weatherData: { lat: '', lon: '' },
  cityName: '',
  data: {},
  dailyData: {}
}

export const reducer = createReducer(
  initialState,
  on(WeatherActions.search, (state, action) => ({
    ...state,
    cityName: action.cityName
  })),
  on(WeatherActions.searchSuccess, (state, action) => ({
    ...state,
    loading: false,
    weatherData: action.weatherData
  })),
  on(WeatherActions.searchFailure, (state, action) => ({
    ...initialState,
  })),
  on(WeatherActions.loadHourlyForecast, (state, action) => ({
    ...state
  })),
  on(WeatherActions.loadHourlyForecastSuccess, (state, action) => ({
    ...state,
    data: action.data
  })),
  on(WeatherActions.loadDailyForecast, (state, action) => ({
    ...state
  })),
  on(WeatherActions.loadDailyForecastSuccess, (state, action) => ({
    ...state,
    dailyData: action.dailyData
  }))
);
