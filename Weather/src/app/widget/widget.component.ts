import { Component, OnInit } from '@angular/core';
import { WidgetDataService } from '../services/widget-data/widget-data.service';
import { WidgetData } from '../interfaces/WidgetData';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  city!: string;
  widgets: { city: string, weatherData: WidgetData | null }[] = [
    { city: '', weatherData: null },
    { city: '', weatherData: null },
    { city: '', weatherData: null }
  ];

  constructor(private widgetDataService: WidgetDataService) { }

  ngOnInit(){}

  getWeather(widget: { city: string, weatherData: WidgetData | null }) {
    this.widgetDataService.getWeather(widget.city)
      .subscribe(
        (data: Object) => {
          widget.weatherData = data as WidgetData;
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.error('Error', error);
        }
      );
  }
}