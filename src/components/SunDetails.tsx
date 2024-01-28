import { WeatherApiRes } from "../services/useWeather.d";
import { motion } from "framer-motion";
import formatTimeToHHMM from "../utils/formatTimeToHHMM";
import { WiDaySunny, WiNightClear, WiSunrise, WiSunset } from "react-icons/wi";

const SunDetails = ({ data }: { data: WeatherApiRes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="w-full h-[110px] rounded-[25px] border-[3px] border-zinc-900 p-3 py-3 flex items-center justify-between"
        >
            <div className="h-full w-full flex flex-col justify-center font-semibold">
                <div className="text-sm text-nowrap flex ">
                    <WiSunrise className="text-2xl" />
                    {formatTimeToHHMM(new Date(data.daily.sunrise[1]))} Sunrize
                </div>
                <div className="text-sm text-nowrap flex ">
                    <WiSunset className="text-2xl" />
                    {formatTimeToHHMM(new Date(data.daily.sunset[1]))} Sunset
                </div>
                <div className="flex justify-end text-3xl text-right">
                    {!!data.current.is_day ? <WiDaySunny /> : <WiNightClear />}
                </div>
            </div>
        </motion.div>
    );
};

export default SunDetails;
