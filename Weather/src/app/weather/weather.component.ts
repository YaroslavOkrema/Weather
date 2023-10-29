import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData('Dnipro');
  }

  getWeatherData(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weatherData = data;
      if (this.weatherData.main && this.weatherData.main.temp) {
        this.weatherData.main.temp = (this.weatherData.main.temp - 273.15).toFixed(2);
      }
    });
  }
}
