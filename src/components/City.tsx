import { WiCloud } from "react-icons/wi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { LocationName } from "../services/useWeather.d";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const City = ({
    isPending,
    location,
}: {
    isPending: boolean;
    location: LocationName | undefined;
}) => {
    const navigate = useNavigate();
    return (
        <div className="text-center relative">
            <div className="flex items-center relative">
                {location ? location.city : "Location"}
                <MdModeEdit
                    className="absolute -right-4 cursor-pointer"
                    onClick={() => {
                        navigate("/locations");
                    }}
                />
            </div>
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
