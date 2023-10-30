export interface Weather {
    name: string;
    temp: number;
    description: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }