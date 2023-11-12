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
  weatherData!: WidgetData;

  constructor(private widgetDataService: WidgetDataService) { }

  ngOnInit(){}

  getWeather() {
    this.widgetDataService.getWeather(this.city)
    .subscribe(data => {
      this.weatherData = data as WidgetData;
      console.log(data);
    },
    (error: HttpErrorResponse) => {
      console.error('Error', error)
    }
  );
 }
}