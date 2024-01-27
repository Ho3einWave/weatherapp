import { WeatherResponse } from "../services/useWeather";
import wmo from "../utils/wmo";
const MainMetric = ({ data }: { data: WeatherResponse }) => {
    return (
        <div className="min-h-[400px]  flex flex-col items-center justify-center text-center text-zinc-900">
            <div className="text-8xl font-bold relative w-fit">
                {data.current.apparentTemperature.toFixed(0)}{" "}
                <span className="text-2xl absolute -right-6">°C</span>
            </div>
            <div className="font-semibold">
                {wmo(data.daily.weatherCode[1])}{" "}
                {data.daily.apparentTemperatureMax[1].toFixed(0)}°
                <span className="opacity-50">/</span>
                {data.daily.apparentTemperatureMin[1].toFixed(0)}°
            </div>
        </div>
    );
};

export default MainMetric;
