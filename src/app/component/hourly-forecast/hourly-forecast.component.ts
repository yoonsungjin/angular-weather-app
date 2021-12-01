import { WeatherFacadeService } from './../../service/weather-facade.service';
import { WeatherService } from './../../service/weather.service';
import { Component, OnInit } from '@angular/core';
import { filter, first, map, tap, debounceTime } from 'rxjs/operators';
<<<<<<< HEAD
=======
import { WeatherData } from 'src/app/service/weather.model';
import { ThisReceiver } from '@angular/compiler';
>>>>>>> Create weather app using open weather api

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {
  timeline = [] as any;
  lat: string;
  lon: string;
  cityName: string;

  constructor(
    private weatherFacadeService: WeatherFacadeService
  ) { }

  ngOnInit() {
    this.loadHourlyForecast();
    this.getHourlyForecast();
  }

  loadHourlyForecast() {
    this.weatherFacadeService.loadHourlyForecast();
  }

  getHourlyForecast(){
    this.loadHourlyForecast();

    this.weatherFacadeService.getHourlyForecast()
      .pipe(filter(data => !!data))
      .subscribe(data => this.adaptForecast(data));
  }

  adaptForecast(data:any){
    this.cityName = data.timezone;
    this.timeline = [];
    for(let i=0; i<8; i++){
      const forecast = data?.hourly[i*3];
      this.timeline.push({
        time: forecast.dt*1000,
        temp: forecast.temp
      });
    }
  }
}
