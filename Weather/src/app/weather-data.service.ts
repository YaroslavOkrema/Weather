import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private apiKey = '642c1ad128fd816bcb4ea30d07064974';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
