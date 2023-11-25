
import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../services/weather-data/weather-data.service';
import { GeolocationService } from '../services/geolocation/geolocation.service';
import { FactoryClassTimeOfDay} from '../factory/factoryClassTimeOfDay';
import { TimeOfDaBgClass } from '../enums/enumForTimeOfDay';
import { Weather } from '../interfaces/WeatherDataInterfaces';
import { Position } from '../interfaces/position';
import { interval, Subscription } from 'rxjs';
import { TIME_UPDATE_WEATHER } from '../const/const';

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
  private weatherUpdateSubscription: Subscription | null = null;
  
  constructor(
    private weatherService: WeatherDataService,
    private geolocationService: GeolocationService,
    ) { }

  ngOnInit() {
    this.getWeatherData();
    this.updateTimeOfDay();

    this.weatherUpdateSubscription = interval(TIME_UPDATE_WEATHER).subscribe(() => {
      this.getWeatherData();
      this.updateTimeOfDay();
      console.log('Данные обновлены');
    });    
  }

  ngOnDestroy() {
    if(this.weatherUpdateSubscription) {
      this.weatherUpdateSubscription.unsubscribe();
    }
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