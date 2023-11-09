
import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../services/weather-data/weather-data.service';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { FactoryClassTimeOfDay} from '../factory/factoryClassTimeOfDay';
import { TimeOfDaBgClass } from '../enums/enumForTimeOfDay';
import { Weather } from '../interfaces/WeatherDataInterfaces';
import { Position } from '../interfaces/position';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [GeolocationService]
})
export class WeatherComponent implements OnInit {
  weatherData!: Weather;
  timeOfDay: TimeOfDaBgClass = TimeOfDaBgClass.MORNING;
  private factoryClassTimeOfDay : FactoryClassTimeOfDay = new FactoryClassTimeOfDay();

  constructor(
    private weatherService: WeatherDataService,
    private geolocationService: GeolocationService,
    ) { }

  ngOnInit() {
    this.getWeatherData();
    this.updateTimeOfDay();
    const timeOfDayFactory = new FactoryClassTimeOfDay();
    const timeOfDay: TimeOfDaBgClass = timeOfDayFactory.setTimeOfDay();
    console.log(timeOfDay);
  }

  getWeatherData() {
    this.geolocationService.getCurrentLocation()
      .subscribe(
        (position: Position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe((data) => {
            this.weatherData = data as Weather;
          });
        },
        (error: string) => {
          console.error('Ошибка геолокации: ', error);
        }
      );
  }
  
  updateTimeOfDay() {
    this.timeOfDay = this.factoryClassTimeOfDay.setTimeOfDay();
  }
}