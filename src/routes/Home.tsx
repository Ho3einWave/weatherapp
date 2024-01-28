// Library Import
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useTranslation } from "react-i18next";

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
const Home = () => {
    // i18n translation hook
    const { i18n } = useTranslation();
    const { location, setLocation } = useLocation();
    const { cities, addCity } = useCities();
    // navigation
    const navigate = useNavigate();

    // Geo location hook
    const { getPosition } = useGeolocated({
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

    // Initilize i18n
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, []);

    // get current weather information when location changes
    useEffect(() => {
        location &&
            getWeather({
                lat: location.lat,
                long: location.long,
            });
    }, [location]);

    return (
        <div className="max-w-[600px] mx-auto lg:max-h-[90vh] lg:overflow-y-auto lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 pb-5 lg:rounded-[35px]">
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
                        <div onClick={getPosition} className="cursor-pointer">
                            <MdOutlineRefresh />
                        </div>
                    </div>
                    {data && (
                        <>
                            <MainMetric data={data.weather} />
                            <SevenDaysForecast data={data.weather} />
                        </>
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
        </div>
    );
};

export default Home;
