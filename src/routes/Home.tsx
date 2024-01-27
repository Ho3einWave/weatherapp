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

import { useLocation } from "../context/location";
const Home = () => {
    // i18n translation hook
    const { i18n } = useTranslation();
    const { location, setLocation } = useLocation();

    // Geo location hook
    const { getPosition } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
            timeout: 3000,
        },
        userDecisionTimeout: 5000,
        onSuccess(pos) {
            setLocation({
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
            });
        },
        onError(positionError) {
            console.log(positionError);
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
        <div className="max-w-[600px] lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 lg:rounded-[35px]">
            <div className="flex flex-col w-full ">
                <div className="h-screen lg:h-[800px] lg:overflow-y-scroll flex flex-col justify-between py-5">
                    <div className=" flex items-center justify-between px-5 ">
                        <div>
                            <GoPlus />
                        </div>
                        <City isPending={isPending} data={data} />
                        <div onClick={getPosition}>
                            <MdOutlineRefresh />
                        </div>
                    </div>
                    {data && (
                        <>
                            <MainMetric data={data} />
                            <SevenDaysForecast data={data} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
