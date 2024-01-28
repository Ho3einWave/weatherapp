import degToDirection from "../utils/degToDirection";
import { FaLongArrowAltDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { WeatherApiRes } from "../services/useWeather.d";
const WindDirection = ({ data }: { data: WeatherApiRes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="w-full h-[110px] rounded-[25px] border-[3px] border-zinc-900 p-3 py-3 flex items-center justify-between"
        >
            <div className="h-full flex flex-col justify-center font-semibold">
                <div className="text-sm text-nowrap">
                    {degToDirection(data.daily.wind_direction_10m_dominant[1])}
                </div>
                <div className="text-sm">
                    {data.daily.wind_speed_10m_max[1].toFixed(1)}km/h
                </div>
            </div>
            <div className="relative h-[80px] w-[80px] border-2 border-zinc-900/50  rounded-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    N
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    S
                </div>
                <div className="absolute top-1/2 right-1 -translate-y-1/2">
                    E
                </div>
                <div className="absolute top-1/2 left-1 -translate-y-1/2">
                    W
                </div>
                <motion.div
                    initial={{
                        top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    whileInView={{
                        top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                        rotate: data.daily.wind_direction_10m_dominant[1],
                        transition: { delay: 0.2 },
                    }}
                    className="absolute text-xl  "
                >
                    <FaLongArrowAltDown />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WindDirection;
