import { WeatherApiRes } from "../services/useWeather.d";
import wmo from "../utils/wmo";
import { motion } from "framer-motion";
const MainMetric = ({ data }: { data: WeatherApiRes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="min-h-[300px]  flex flex-col items-center justify-center text-center text-zinc-900"
        >
            <div className="text-8xl font-bold relative w-fit">
                {data.current.apparent_temperature.toFixed(0)}{" "}
                <span className="text-2xl absolute -right-6">°C</span>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="font-semibold"
            >
                {wmo(data.daily.weather_code[1])}{" "}
                {data.daily.apparent_temperature_max[1].toFixed(0)}°
                <span className="opacity-50">/</span>
                {data.daily.apparent_temperature_min[1].toFixed(0)}°
            </motion.div>
        </motion.div>
    );
};

export default MainMetric;
