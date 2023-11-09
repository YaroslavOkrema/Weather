import { Observable } from 'rxjs';
import { Weather } from './WeatherDataInterfaces';

export interface WeatherService {
    getWeatherByCoordinates(lat: number, lon: number): Observable<Weather>;
  }