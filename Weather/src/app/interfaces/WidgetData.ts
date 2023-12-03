export interface WidgetData {
    city: string;
    name: string;
    temp: number;
    description: string;
    sys: WidgetSys;
    main: WidgetMain;
    weather: WidgetWeather[];
  }

  export interface WidgetSys {
    country: string;
  }

  export interface WidgetMain {
    temp: number;
    temp_min: number;
    temp_max: number;
  }

  export interface WidgetWeather {
    description: string;
    icon: string;
  }