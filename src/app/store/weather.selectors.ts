import { createFeatureSelector, createSelector } from '@ngrx/store';
import { weatherFeatureKey, weatherState } from './weather.reducer';

const featureSelector = createFeatureSelector<weatherState>(weatherFeatureKey);

export const getCityName = createSelector(
  featureSelector,
  state => state.cityName
)
export const getCoords = createSelector(
  featureSelector,
  state => state.weatherData
)

export const getHouryForecast = createSelector(
  featureSelector,
  state => state.data
)

export const getDailyForecast = createSelector(
  featureSelector,
  state => state.dailyData
)
