import { useMemo } from "react";
import findNearestHourlyDate from "../utils/findNearestHourlyDate";
import secondsToHHMM from "../utils/secondsToHHMM";
import { motion } from "framer-motion";
import { WeatherApiRes } from "../services/useWeather.d";
const Detail = ({ data }: { data: WeatherApiRes }) => {
    const currentHour = useMemo<
        ReturnType<typeof findNearestHourlyDate>
    >(() => {
        const times = data.hourly.time.map((item) => new Date(item));
        return findNearestHourlyDate(times);
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex flex-col border-[3px] border-zinc-900 p-3 rounded-[25px] h-full justify-between py-6"
        >
            <div className="flex items-center justify-between text-nowrap text-sm">
                <div>Humidity</div>
                <div>{data.current.relative_humidity_2m}%</div>
            </div>
            <hr className="border-zinc-900/30" />
            <div className="flex items-center justify-between text-nowrap text-sm">
                <div>UV</div>
                <div>{data.daily.uv_index_max[1].toFixed(0)}</div>
            </div>
            <hr className="border-zinc-900/30" />
            <div className="flex items-center justify-between text-nowrap text-sm">
                <div>Pressure</div>
                <div>
                    {currentHour.index
                        ? `${data.hourly.surface_pressure[
                              currentHour.index
                          ].toFixed(0)}mbar`
                        : "0mbar"}
                </div>
            </div>
            <hr className="border-zinc-900/30" />
            <div className="flex items-center justify-between text-nowrap text-sm">
                <div>Daylight</div>
                <div>{secondsToHHMM(data.daily.daylight_duration[1])}</div>
            </div>
            <hr className="border-zinc-900/30" />
            <div className="flex items-center justify-between text-nowrap text-sm">
                <div>Chance of rain</div>
                <div>{data.daily.precipitation_probability_max[1]}%</div>
            </div>
        </motion.div>
    );
};

export default Detail;
