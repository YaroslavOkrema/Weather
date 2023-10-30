import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  getCurrentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Геолокация определена:', position);
            resolve(position);
          },
          (error) => {
            console.error('Ошибка геолокации:', error);
            reject(error);
          }
        );
      } else {
        console.error('Геолокация не поддерживается в данном браузере.');
        reject('Геолокация не поддерживается');
      }
    });
  }
}
