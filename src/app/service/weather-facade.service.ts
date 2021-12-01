import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadHourlyForecast, loadDailyForecast, search } from '../store/weather.actions';
import { getHouryForecast, getDailyForecast } from '../store/weather.selectors';

@Injectable({
  providedIn: 'root'
})
export class WeatherFacadeService {

  constructor(
    private store: Store<any>
  ) { }

  public searchByCityName(newCityName: string){
    this.store.dispatch(search({ cityName: newCityName }));
  }

  public loadHourlyForecast(){
    this.store.dispatch(loadHourlyForecast());
  }

  public loadDailyForecast(){
    this.store.dispatch(loadDailyForecast());
  }

  public getHourlyForecast(): Observable<any>{
    return this.store.select(getHouryForecast);
  }

  public getDailyForecast(): Observable<any>{
    return this.store.select(getDailyForecast);
  }
}
