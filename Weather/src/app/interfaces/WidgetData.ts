export interface WidgetData {
    city: string;
    name: string;
    temp: number;
    description: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
    }[];
  }