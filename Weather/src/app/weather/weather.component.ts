import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [GeolocationService]
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(
    private weatherService: WeatherDataService,
    private geolocationService: GeolocationService,
    ) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.geolocationService.getCurrentLocation().then((position: Position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe((data) => {
        this.weatherData = data;
        if (this.weatherData.main && this.weatherData.main.temp) {
          this.weatherData.main.temp = (this.weatherData.main.temp - 273.15).toFixed(2);
        }
      });
    }).catch((error) => {
      console.error('Ошибка геолокации: ', error);
    });
  }
}
