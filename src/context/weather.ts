import { create } from "zustand";
import { WeatherApiRes } from "../services/useWeather.d";
type useWeatherData = {
    weather: WeatherApiRes | null;
    setWeatherData: (weather: WeatherApiRes) => void;
};

export const useWeatherData = create<useWeatherData>((set) => ({
    weather: null,
    setWeatherData: (weather: WeatherApiRes) =>
        set((_) => ({ weather: weather })),
}));
