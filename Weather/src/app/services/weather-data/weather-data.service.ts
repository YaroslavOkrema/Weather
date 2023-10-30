import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/interfaces/WeatherDataInterfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(lat: number, lon: number): Observable<Weather> {
    const apiKey = '642c1ad128fd816bcb4ea30d07064974';
    const units = 'metric';
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    return this.http.get<Weather>(url);
  }
}