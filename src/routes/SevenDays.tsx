import { useNavigate } from "react-router-dom";
import { useWeatherData } from "../context/weather";
import { IoIosArrowBack } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import range from "../utils/range";
import getDayOfWeek from "../utils/getDayOfWeek";
import { wmoIcon } from "../utils/wmo";
import { TiLocationArrow } from "react-icons/ti";
import { motion } from "framer-motion";
const SevenDays = () => {
    const { weather } = useWeatherData();
    const navigate = useNavigate();
    useEffect(() => {
        if (!weather) {
            navigate("/");
        }
    }, []);
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
            animate={{ opacity: 1, y: 0 }}
            className="lg:h-[800px] max-w-[600px] mx-auto lg:max-h-[90vh] lg:overflow-y-auto lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 pb-5 lg:rounded-[35px]"
        >
            <div className="p-6">
                <div className="mb-5 cursor-pointer">
                    <IoIosArrowBack
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>
                <h1 className="text-2xl mb-4">7-day Forecast</h1>
                <div
                    ref={scrollableRef}
                    style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    className="flex  overflow-x-scroll no-scroll-handle"
                >
                    {weather
                        ? range(0, 8, 1).map((item, idx) => (
                              <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{
                                      opacity: 1,
                                      y: 0,
                                      transition: { delay: 0.3 * item },
                                  }}
                                  key={`seven-${idx}`}
                                  style={{
                                      opacity: item === 0 ? 0.5 : 1,
                                      background: item === 1 ? "#d8dbdd" : "",
                                  }}
                                  className="flex flex-col  items-center text-sm gap-10 min-w-[5.5rem] py-4 rounded-3xl"
                              >
                                  <div className="flex flex-col items-center">
                                      <div>
                                          {item === 0
                                              ? "Yesterday"
                                              : item === 1
                                              ? "Today"
                                              : item === 2
                                              ? "Tommorrow"
                                              : getDayOfWeek(
                                                    new Date(
                                                        weather.daily.time[item]
                                                    )
                                                )}
                                      </div>
                                      <div>{`${
                                          new Date(
                                              weather.daily.time[item]
                                          ).getMonth() + 1
                                      }/${new Date(
                                          weather.daily.time[item]
                                      ).getDate()}`}</div>
                                  </div>
                                  <div className="text-4xl">
                                      {wmoIcon(
                                          weather.daily.weather_code[item]
                                      )}
                                  </div>
                                  <div>
                                      {weather.daily.apparent_temperature_max[
                                          item
                                      ].toFixed(0)}
                                      <span className="opacity-50">/</span>
                                      {weather.daily.apparent_temperature_min[
                                          item
                                      ].toFixed(0)}
                                  </div>
                                  <div className="flex items-center">
                                      <motion.div
                                          initial={{ rotate: -45 }}
                                          animate={{
                                              rotate:
                                                  weather.daily
                                                      .wind_direction_10m_dominant[
                                                      item
                                                  ] + 135,
                                              transition: {
                                                  duration: 0.5,
                                                  delay: 0.4 * item,
                                              },
                                          }}
                                      >
                                          <TiLocationArrow />
                                      </motion.div>
                                      {weather.daily.wind_speed_10m_max[
                                          item
                                      ].toFixed(1)}
                                      km/h
                                  </div>
                              </motion.div>
                          ))
                        : ""}
                </div>
            </div>
        </motion.div>
    );
};

export default SevenDays;
