import { WidgetData } from '../interfaces/WidgetData';

export interface WidgetInterface {
    id: number;
    city: string;
    weatherData: WidgetData | null;
    showForm: boolean;
    showButton: boolean;
}

export interface WeatherButtonClicked {
    [key: string]: boolean;
}

export interface IsInvalidCity {
    [key: string]: boolean
}