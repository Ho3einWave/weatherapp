import { WeatherResponse } from "../services/useWeather";
import { MdOutlineCalendarMonth } from "react-icons/md";
import range from "../utils/range";
import wmo, { wmoIcon } from "../utils/wmo";
import { motion } from "framer-motion";
const SevenDaysForecast = ({ data }: { data: WeatherResponse }) => {
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
