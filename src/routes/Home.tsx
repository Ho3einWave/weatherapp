// Library Import
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

import { useWeather } from "../services/useWeather";
import MainMetric from "../components/MainMetric";
import SevenDaysForecast from "../components/SevenDaysForecast";
import City from "../components/City";
// ICONS
import { GoPlus } from "react-icons/go";
import { MdOutlineRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../context/location";
import TwentyFourHourForCast from "../components/TwentyFourHourForCast";
import WindDirection from "../components/WindDirection";
import Detail from "../components/Detail";
import SunDetails from "../components/SunDetails";
import { useCities } from "../context/cities";
import { useWeatherData } from "../context/weather";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
const Home = () => {
    // i18n translation hook
    const { location, setLocation } = useLocation();
    const { cities, addCity } = useCities();
    const { setWeatherData } = useWeatherData();
    // navigation
    const navigate = useNavigate();

    // Geo location hook
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
            timeout: 3000,
        },
        userDecisionTimeout: 5000,
        onSuccess(pos) {
            const exist = cities.find(
                (item) =>
                    item.lat.toFixed(2) === pos.coords.latitude.toFixed(2) &&
                    item.long.toFixed(2) === pos.coords.longitude.toFixed(2)
            );
            if (!exist) {
                addCity({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                    isGPS: true,
                });
            }
            if (!location) {
                setLocation({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                });
            }
        },
        onError(_) {
            if (!location) {
                if (cities.length > 0) {
                    setLocation({ lat: cities[0].lat, long: cities[0].long });
                } else {
                    navigate("/search");
                }
            }
        },
    });
    // Weather Information Query
    const { mutate: getWeather, data, isPending } = useWeather();

    // get current weather information when location changes
    useEffect(() => {
        location &&
            getWeather({
                lat: location.lat,
                long: location.long,
            });
    }, [location]);

    useEffect(() => {
        if (data) {
            setWeatherData(data.weather);
        }
    }, [data]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[600px] mx-auto lg:max-h-[90vh] lg:overflow-y-auto lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 pb-5 lg:rounded-[35px]"
        >
            <div className="flex flex-col w-full ">
                <div className="h-screen lg:h-[800px] lg:overflow-y-scroll flex flex-col justify-between py-5">
                    <div className=" flex items-center justify-between px-5 ">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                navigate("/search");
                            }}
                        >
                            <GoPlus />
                        </div>
                        <City isPending={isPending} location={data?.location} />
                        <div
                            onClick={() => {
                                location &&
                                    getWeather({
                                        lat: location.lat,
                                        long: location.long,
                                    });
                            }}
                            className="cursor-pointer"
                        >
                            <MdOutlineRefresh />
                        </div>
                    </div>
                    {data && (
                        <>
                            <MainMetric data={data.weather} />
                            <SevenDaysForecast data={data.weather} />
                        </>
                    )}
                    {!data && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Loader />
                        </div>
                    )}
                </div>
                {data && <TwentyFourHourForCast data={data.weather} />}
                {data && (
                    <div className="w-11/12 grid grid-cols-2 gap-2 mx-auto mt-5">
                        <div className="flex flex-col gap-2">
                            <WindDirection data={data.weather} />
                            <SunDetails data={data.weather} />
                        </div>
                        <div>
                            <Detail data={data.weather} />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Home;
