import { WeatherFacadeService } from './../../service/weather-facade.service';
import { WeatherService } from './../../service/weather.service';
import { Component, OnInit } from '@angular/core';
import { filter, first, map, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {
  timeline = [] as any;

  constructor(
    private weatherFacadeService: WeatherFacadeService
  ) { }

  ngOnInit(): void {
    this.loadHourlyForecast();
    this.getHourlyForecast();
  }

  loadHourlyForecast() {
    this.weatherFacadeService.loadHourlyForecast();
  }

  getHourlyForecast(){
    this.weatherFacadeService.getHourlyForecast()
      .subscribe(data => this.adaptForecast(data));
  }

  adaptForecast(data:any){
    if(!data){
      return;
    }
    console.log(data);
    for(let i=0; i<8; i++){
      const forecast = data?.hourly[i*3];
      this.timeline.push({
        time: forecast.dt*1000,
        temp: forecast.temp
      });
    }
  }
}
