import { useState } from "react";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { useCities } from "../context/cities";
import { motion } from "framer-motion";
const CitySearch = ({
    name,
    admin1,
    country_code,
    latitude,
    longitude,
}: {
    name: string;
    admin1: string;
    country_code: string;
    latitude: number;
    longitude: number;
}) => {
    const [added, setAdded] = useState(false);
    const { addCity } = useCities();
    return (
        <div className="flex items-center justify-between w-11/12 border border-zinc-900 rounded-full overflow-hidden p-1 pr-2">
            <div className=" flex gap-2 items-center">
                <div>
                    <img
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country_code}.svg`}
                        width="58"
                        height="58"
                        className="w-10 h-10 object-cover rounded-full"
                    />
                </div>
                <div className="text-sm">
                    {name} {admin1 && `• ${admin1}`}
                </div>
            </div>
            {added ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    className="text-[30px]"
                >
                    <CiCircleCheck />
                </motion.div>
            ) : (
                <motion.div
                    initial={false}
                    onClick={() => {
                        addCity({ lat: latitude, long: longitude });
                        setAdded(true);
                    }}
                    className="text-[30px]"
                >
                    <CiCirclePlus />
                </motion.div>
            )}
        </div>
    );
};

export default CitySearch;
