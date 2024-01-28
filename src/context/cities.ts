import axios from "axios";
import { create } from "zustand";
import { LocationName } from "../services/useWeather.d";
type useGeoLocation = {
    cities: GeoLocation[];
    addCity: (location: { lat: number; long: number; isGPS?: boolean }) => void;
    removeCity: (location: { lat: number; long: number }) => void;
};

type GeoLocation = {
    lat: number;
    long: number;
    location_details: LocationName;
    isGPS: boolean;
};

export const useCities = create<useGeoLocation>((set, get) => ({
    cities: JSON.parse(window.localStorage.getItem("cities") || "[]") || [],
    addCity: async ({
        lat,
        long,
        isGPS,
    }: {
        lat: number;
        long: number;
        isGPS?: boolean;
    }) => {
        // save the cities to localstorage
        const { data } = await axios.get<LocationName>(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        );
        if (isGPS) {
            window.localStorage.setItem(
                "cities",
                JSON.stringify([
                    { lat, long, location_details: data, isGPS: true },
                    ...get().cities,
                ])
            );
        } else {
            window.localStorage.setItem(
                "cities",
                JSON.stringify([
                    ...get().cities,
                    { lat, long, location_details: data, isGPS: false },
                ])
            );
        }

        if (isGPS) {
            set(({ cities }) => ({
                cities: [
                    { lat, long, location_details: data, isGPS: true },
                    ...cities,
                ],
            }));
        } else {
            set(({ cities }) => ({
                cities: [
                    ...cities,
                    { lat, long, location_details: data, isGPS: false },
                ],
            }));
        }
    },
    removeCity: ({ lat, long }: { lat: number; long: number }) => {
        const cities = get().cities;
        const newCities = cities.filter(
            (item) => item.lat !== lat && item.long !== long
        );
        window.localStorage.setItem("cities", JSON.stringify(newCities));
        set(() => ({ cities: newCities }));
    },
}));
