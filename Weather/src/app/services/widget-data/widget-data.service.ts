import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WidgetData } from 'src/app/interfaces/WidgetData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetDataService {
  private apiKey = '642c1ad128fd816bcb4ea30d07064974';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WidgetData> {
    const units = 'metric';
    return this.http.get<WidgetData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=${units}`);
 }

 roundTemperature(temperature: number): number {
  return Math.round(temperature);
}
}