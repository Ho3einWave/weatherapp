import { WeatherResponse } from "../services/useWeather";
import wmo from "../utils/wmo";
import { motion } from "framer-motion";
const MainMetric = ({ data }: { data: WeatherResponse }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="min-h-[300px]  flex flex-col items-center justify-center text-center text-zinc-900"
        >
            <div className="text-8xl font-bold relative w-fit">
                {data.current.apparentTemperature.toFixed(0)}{" "}
                <span className="text-2xl absolute -right-6">°C</span>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                className="font-semibold"
            >
                {wmo(data.daily.weatherCode[1])}{" "}
                {data.daily.apparentTemperatureMax[1].toFixed(0)}°
                <span className="opacity-50">/</span>
                {data.daily.apparentTemperatureMin[1].toFixed(0)}°
            </motion.div>
        </motion.div>
    );
};

export default MainMetric;
