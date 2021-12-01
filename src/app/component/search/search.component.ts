import { search } from './../../store/weather.actions';
import { WeatherFacadeService } from './../../service/weather-facade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private weatherFacadeService: WeatherFacadeService) { }

  ngOnInit(): void {
  }

  getCity(cityName: string){
    this.weatherFacadeService.searchByCityName(cityName);
  }

}
