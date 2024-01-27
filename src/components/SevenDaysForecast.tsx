import { WeatherResponse } from "../services/useWeather";
import { MdOutlineCalendarMonth } from "react-icons/md";
import range from "../utils/range";
import wmo, { wmoIcon } from "../utils/wmo";

const SevenDaysForecast = ({ data }: { data: WeatherResponse }) => {
    return (
        <div className="px-4 py-4 w-11/12 max-h-[300px] mx-auto flex-grow rounded-[35px] border-[3px] border-zinc-900">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-1">
                    <div className="text-white bg-zinc-900 p-1 rounded-full">
                        <MdOutlineCalendarMonth />
                    </div>{" "}
                    7-Day forecast
                </div>
                <div className="flex flex-col gap-4 text-xl ">
                    {range(1, 5, 1).map((item) => (
                        <div className="flex items-center w-full justify-between">
                            <div className="flex items-center">
                                <span className="text-3xl">
                                    {wmoIcon(data.daily.weatherCode[item])}
                                </span>
                                {wmo(data.daily.weatherCode[item])}
                            </div>
                            <div>
                                {data.daily.apparentTemperatureMax[
                                    item
                                ].toFixed(0)}
                                °<span className="opacity-50">/</span>
                                {data.daily.apparentTemperatureMin[
                                    item
                                ].toFixed(0)}
                                °
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full h-11 rounded-full bg-zinc-900 text-white">
                    7-day forecast
                </button>
            </div>
        </div>
    );
};

export default SevenDaysForecast;
