import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import range from "../utils/range";
import { fetchWeatherApi } from "openmeteo";
import { LocationName } from "./useWeather.d";
const url = "https://api.open-meteo.com/v1/forecast";
const getWeatherRequest = async ({
    lat,
    long,
}: {
    lat: number;
    long: number;
}) => {
    const { data } = await axios.get<LocationName>(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    );
    const params = {
        latitude: lat,
        longitude: long,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
        ],
        hourly: "temperature_2m",
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "sunrise",
            "sunset",
            "daylight_duration",
            "sunshine_duration",
            "uv_index_max",
            "uv_index_clear_sky_max",
            "precipitation_sum",
            "rain_sum",
            "precipitation_hours",
            "precipitation_probability_max",
            "wind_speed_10m_max",
            "wind_direction_10m_dominant",
        ],
        past_days: 1,
        forecast_days: 14,
    };
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const weatherData = {
        location: data,
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            apparentTemperature: current.variables(2)!.value(),
            isDay: current.variables(3)!.value(),
        },
        hourly: {
            time: range(
                Number(hourly.time()),
                Number(hourly.timeEnd()),
                hourly.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: hourly.variables(0)!.valuesArray()!,
        },
        daily: {
            time: range(
                Number(daily.time()),
                Number(daily.timeEnd()),
                daily.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
            apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
            sunrise: daily.variables(5)!.valuesArray()!,
            sunset: daily.variables(6)!.valuesArray()!,
            daylightDuration: daily.variables(7)!.valuesArray()!,
            sunshineDuration: daily.variables(8)!.valuesArray()!,
            uvIndexMax: daily.variables(9)!.valuesArray()!,
            uvIndexClearSkyMax: daily.variables(10)!.valuesArray()!,
            precipitationSum: daily.variables(11)!.valuesArray()!,
            rainSum: daily.variables(12)!.valuesArray()!,
            precipitationHours: daily.variables(13)!.valuesArray()!,
            precipitationProbabilityMax: daily.variables(14)!.valuesArray()!,
            windSpeed10mMax: daily.variables(15)!.valuesArray()!,
            windDirection10mDominant: daily.variables(16)!.valuesArray()!,
        },
    };

    return weatherData;
};

export type WeatherResponse = Awaited<ReturnType<typeof getWeatherRequest>>;
export const useWeather = () => {
    return useMutation({
        mutationKey: ["getWeather"],
        mutationFn: getWeatherRequest,
    });
};
