import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WidgetDataService {
  private apiKey = '642c1ad128fd816bcb4ea30d07064974';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    const units = 'metric';
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=${units}`);
 }
}