import { MdOutlineCalendarMonth } from "react-icons/md";
import range from "../utils/range";
import wmo, { wmoIcon } from "../utils/wmo";
import { motion } from "framer-motion";
import getDayOfWeek from "../utils/getDayOfWeek";
import { WeatherApiRes } from "../services/useWeather.d";
const SevenDaysForecast = ({ data }: { data: WeatherApiRes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-4 w-11/12 max-h-[300px] mx-auto flex-grow rounded-[35px] border-[3px] border-zinc-900"
        >
            <div className="flex flex-col justify-between h-full gap-2">
                <div className="flex items-center gap-1">
                    <div className="text-white bg-zinc-900 p-1 rounded-full">
                        <MdOutlineCalendarMonth />
                    </div>{" "}
                    7-Day forecast
                </div>
                <div className="flex flex-col gap-2 text-lg ">
                    {range(1, 5, 1).map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.31 * idx }}
                            key={`sv-${item}`}
                            className="flex items-center w-full justify-between"
                        >
                            <div className="flex items-center">
                                <span className="text-3xl">
                                    {wmoIcon(data.daily.weather_code[item])}
                                </span>
                                {idx === 0
                                    ? "Today"
                                    : getDayOfWeek(
                                          new Date(data.daily.time[item])
                                      )}{" "}
                                {wmo(data.daily.weather_code[item])}
                            </div>
                            <div>
                                {data.daily.apparent_temperature_max[
                                    item
                                ].toFixed(0)}
                                °<span className="opacity-50">/</span>
                                {data.daily.apparent_temperature_min[
                                    item
                                ].toFixed(0)}
                                °
                            </div>
                        </motion.div>
                    ))}
                </div>
                <button className="w-full h-11 rounded-full bg-zinc-900 text-white">
                    7-day forecast
                </button>
            </div>
        </motion.div>
    );
};

export default SevenDaysForecast;
