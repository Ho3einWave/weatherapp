import { create } from "zustand";
type useGeoLocation = {
    location: GeoLocation | null;
    setLocation: (location: GeoLocation) => void;
};

type GeoLocation = {
    lat: number;
    long: number;
};

export const useLocation = create<useGeoLocation>((set) => ({
    location: null,
    setLocation: (location: GeoLocation) =>
        set((_) => ({ location: location })),
}));
