import { WiCloud } from "react-icons/wi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { WeatherResponse } from "../services/useWeather";
import { useTranslation } from "react-i18next";
const City = ({
    isPending,
    data,
}: {
    isPending: boolean;
    data: WeatherResponse | undefined;
}) => {
    const { t } = useTranslation();
    return (
        <div className="text-center relative">
            <div>{data ? data.location.city : t("location")}</div>
            {isPending ? (
                <motion.div
                    key={"update-icon"}
                    initial={{ opacity: 0, y: -5, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 text-[10px] flex items-center text-nowrap"
                >
                    <motion.span
                        animate={{ x: [-1, 1, -1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                        }}
                    >
                        <WiCloud className="text-base" />
                    </motion.span>{" "}
                    Updating ...
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 1, y: 0, x: "-50%" }}
                    animate={{ opacity: 0, y: -5, x: "-50%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 text-[10px] flex items-center text-nowrap"
                >
                    <motion.span>
                        <FaRegCircleCheck className="text-[10px]" />
                    </motion.span>{" "}
                    Updated Successfully
                </motion.div>
            )}
        </div>
    );
};

export default City;
