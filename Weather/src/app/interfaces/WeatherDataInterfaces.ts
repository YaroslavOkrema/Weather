export interface Weather {
  name: string;
  temp: number;
  description: string;
  sys: WeatherSys;
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: WeatherWind
}

export interface WeatherSys {
  country: string;
}

export interface WeatherMain {
  temp: number;
  humidity: number;
}

export interface WeatherDescription {
  description: string;
}

export interface WeatherWind {
  speed: number;
}