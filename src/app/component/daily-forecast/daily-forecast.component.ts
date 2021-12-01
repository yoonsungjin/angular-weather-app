import { WeatherFacadeService } from './../../service/weather-facade.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {
  weatherData: any = [];

  constructor(private weatherFacadeService: WeatherFacadeService) { }

  ngOnInit(): void {
    this.loadDailyForecast();
    this.getDailyForecast();
  }

  loadDailyForecast(){
    this.weatherFacadeService.loadDailyForecast();
  }

  getDailyForecast(){
    this.weatherFacadeService.getDailyForecast()
      .subscribe(data => this.adaptForecast(data.daily));
  }

  adaptForecast(data:any){
    if(!!data) {
      for(let i=0; i < 7; i++){
        this.weatherData.push(data[i]);
      }
    }
  }
}
