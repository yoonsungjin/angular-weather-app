import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { WeatherData, WeatherDataResponse } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'eb012197d7fb2b1e72ee1b7a62fd5c8d';

  constructor(private http: HttpClient) { }

  getWeatherDataByCityName(city: string): Observable<WeatherData[]>{
    let url = 'http://api.openweathermap.org/geo/1.0/direct?';
    let params = new HttpParams()
      .set('q', city)
      .set('limit', '1')
      .set('appid', this.apiKey)

    return this.http.get<WeatherData[]>(url, { params })
      .pipe(map(data => {
        const weatherData: WeatherData[] =[];
        const { lat, lon } = data[0];
        weatherData.push({ lat, lon });
        return weatherData;
      }));
  }

  getHourlyWeatherData(coords: WeatherData): Observable<Object>{
    let url = 'https://api.openweathermap.org/data/2.5/onecall?';

    let params = new HttpParams()
      .set('lat', coords.lat)
      .set('lon', coords.lon)
      .set('exclude', 'current,minutely,daily,alerts')
      .set('appid', this.apiKey);

    return this.http.get(url, { params })
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

}
