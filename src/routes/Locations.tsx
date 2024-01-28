import { IoIosArrowBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCities } from "../context/cities";
import { useLocation } from "../context/location";
import { CiCircleRemove } from "react-icons/ci";

const Locations = () => {
    const navigate = useNavigate();
    const { cities, removeCity } = useCities();
    const { setLocation } = useLocation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[600px] mx-auto lg:max-h-[90vh] lg:overflow-y-auto lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 pb-5 lg:rounded-[35px]"
        >
            <div className="w-full h-20 flex items-center justify-center gap-4 px-4">
                <div
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <IoIosArrowBack />
                </div>
                <div className="flex-grow relative font-bold">
                    SAVED LOCATION
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                {cities.map((item, idx) => (
                    <div
                        key={`locations-${idx}`}
                        className="w-11/12 border border-zinc-900 p-2 rounded-full flex items-center "
                    >
                        <div
                            className="flex items-center gap-2 flex-grow cursor-pointer"
                            onClick={() => {
                                setLocation({ ...item });
                                navigate("/");
                            }}
                        >
                            <div>
                                <img
                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.location_details.countryCode}.svg`}
                                    width="58"
                                    height="58"
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                            </div>
                            <div className="text-sm">
                                {item.location_details.city}
                            </div>
                        </div>

                        <div
                            className="text-4xl"
                            onClick={() => {
                                removeCity(item);
                                setLocation(cities[0]);
                            }}
                        >
                            <CiCircleRemove />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Locations;
