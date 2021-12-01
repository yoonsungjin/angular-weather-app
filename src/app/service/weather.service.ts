import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { WeatherData } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'eb012197d7fb2b1e72ee1b7a62fd5c8d';

  constructor(private http: HttpClient) { }

  getWeatherDataByCityName(city: string){
    let url = 'http://api.openweathermap.org/geo/1.0/direct?';
    let params = new HttpParams()
      .set('q', city)
      .set('limit', '1')
      .set('appid', this.apiKey)

    return this.http.get<WeatherData>(url, { params })
  }

  getHourlyWeatherData(coords: WeatherData): Observable<Object>{
    let url = 'https://api.openweathermap.org/data/2.5/onecall?';

    let params = new HttpParams()
      .set('lat', coords.lat)
      .set('lon', coords.lon)
      .set('exclude', 'current,minutely,daily,alerts')
      .set('appid', this.apiKey);

    return this.http.get(url, { params });
  }

  getDailyWeatherData(coords: WeatherData): Observable<Object>{
    let url = 'https://api.openweathermap.org/data/2.5/onecall?';

    let params = new HttpParams()
      .set('lat', coords.lat)
      .set('lon', coords.lon)
      .set('exclude', 'current,minutely,hourly,alerts')
      .set('appid', this.apiKey);

    return this.http.get(url, { params });
  }

  getWeatherForecast(){
    return new Observable((observer)=>{
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any) => {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'imperial')
          .set('appid', 'eb012197d7fb2b1e72ee1b7a62fd5c8d')
      }),
      switchMap((values) => {
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: values })
      })
    )
  }
}
