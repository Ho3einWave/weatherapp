import { WeatherResponse } from "../services/useWeather";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WiTime9 } from "react-icons/wi";
import { wmoIcon } from "../utils/wmo";
import formatTimeToHHMM from "../utils/formatTimeToHHMM";
const TwentyFourHourForCast = ({
    data,
}: {
    data: WeatherResponse | undefined;
}) => {
    // This Filters the index's that are from now to 24 hour forward
    const weatherIdx = useMemo(
        () =>
            data?.hourly.time
                .map((item, idx) => ({
                    item,
                    idx,
                }))
                .filter(({ item }) => {
                    const now = new Date();
                    const next24Hours = new Date(now);
                    next24Hours.setHours(now.getHours() + 24);
                    return item >= now && item <= next24Hours;
                })
                .map(({ idx }) => idx),
        [data]
    );
    const scrollableRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState<number | null>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !startX || !scrollableRef.current) return;

            const deltaX = e.clientX - startX;
            scrollableRef.current.scrollLeft = scrollLeft - deltaX;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(true);
            setStartX(e.clientX);
            setScrollLeft(scrollableRef.current?.scrollLeft || 0);
        },
        []
    );
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-4  w-11/12 max-h-[300px] mx-auto flex-grow rounded-[30px] border-[3px] border-zinc-900"
        >
            <div className="flex flex-col justify-between h-full gap-3 relative">
                <div className="flex items-center gap-1 ">
                    <div className="text-white bg-zinc-900 p-1 rounded-full">
                        <WiTime9 />
                    </div>{" "}
                    24-hour forecast
                </div>
                <div
                    className="flex overflow-x-scroll no-scroll-handle gap-4 cursor-grab"
                    ref={scrollableRef}
                    style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {data &&
                        weatherIdx &&
                        weatherIdx.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.1 },
                                }}
                                key={`24hour-item-${idx}`}
                                className="flex flex-col items-center gap-1"
                            >
                                <div className="font-bold">
                                    {data.hourly.apparentTemperature[
                                        item
                                    ].toFixed(0)}
                                    °
                                </div>
                                <div className="text-3xl">
                                    {wmoIcon(data.hourly.weatherCode[item])}
                                </div>

                                <div className="text-xs">
                                    {data.hourly.windSpeed10m[item].toFixed(1)}
                                    km/h
                                </div>
                                <div className="text-sm">
                                    {idx === 0
                                        ? "Now"
                                        : formatTimeToHHMM(
                                              data.hourly.time[item]
                                          )}
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TwentyFourHourForCast;
