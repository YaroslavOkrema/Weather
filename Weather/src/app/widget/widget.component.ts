import { Component, OnInit } from '@angular/core';
import { WidgetDataService } from '../services/widget-data/widget-data.service';
import { WidgetData } from '../interfaces/WidgetData';
import { HttpErrorResponse } from '@angular/common/http';
import { WidgetInterface } from '../interfaces/WidgetInterface';
import { WeatherButtonClicked } from '../interfaces/WidgetInterface';
import { IsInvalidCity } from '../interfaces/WidgetInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  widgets: WidgetInterface[] = [
    { id: 1, city: '', weatherData: null },
    { id: 2, city: '', weatherData: null },
    { id: 3, city: '', weatherData: null }
  ];

  weatherButtonClicked: WeatherButtonClicked = {};
  isInvalidCity: IsInvalidCity = {};
  private weatherSubscription: Subscription = new Subscription();

  constructor(private widgetDataService: WidgetDataService) { }

  ngOnInit(){ }

  getWeather(widget: WidgetInterface) {
    if (!widget.city.trim()) {
      console.error('Введите название города');
      return;
    }

    this.widgetDataService.getWeather(widget.city.trim())
      .subscribe(
        (data: WidgetData) => {
          widget.weatherData = data;
          console.log(data);
          const { main } = widget.weatherData;
          if (main && main.temp) {
            main.temp = this.widgetDataService.roundTemperature(main.temp);
            main.temp_max = this.widgetDataService.roundTemperature(main.temp_max);
            main.temp_min = this.widgetDataService.roundTemperature(main.temp_min);
          }

          this.weatherButtonClicked[widget.id] = true;
          this.isInvalidCity[widget.id] = false;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.isInvalidCity[widget.id] = true;
          }
          console.error('Error', error);
          this.weatherButtonClicked[widget.id] = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  getIconUrl(weatherData: WidgetData): string {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      const iconCode = weatherData.weather[0].icon;
      return `https://openweathermap.org/img/wn/${iconCode}.png`;
    } else {
      return 'https://openweathermap.org/img/wn/01d.png';
    }
  }

  showInput(widget: WidgetInterface): boolean {
    return widget.city.trim() === '' || !this.weatherButtonClicked[widget.id];
  }
}