import Home from "./routes/Home";
import Locations from "./routes/Locations";
import Search from "./routes/Search";
import SevenDays from "./routes/SevenDays";

export default [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/locations",
        element: <Locations />,
    },
    {
        path: "/sevendays",
        element: <SevenDays />,
    },
];
