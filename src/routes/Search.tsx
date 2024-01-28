import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { SearchApiResponse } from "../interfaces/Search.d";
import CitySearch from "../components/CitySearch";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("Moscow");
    const [searchResult, setSearchResult] = useState<SearchApiResponse>();
    useEffect(() => {
        const SearchForLocation = async () => {
            const { data } = await axios.get<SearchApiResponse>(
                `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=${12}&language=en&format=json`
            );
            setSearchResult(data);
        };
        SearchForLocation();
    }, [searchTerm]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:h-[800px] max-w-[600px] mx-auto lg:max-h-[90vh] lg:overflow-y-auto lg:mx-auto lg:border-black lg:border-[3px] lg:mt-10 pb-5 lg:rounded-[35px]"
        >
            <div className="w-full h-20 flex items-center justify-center gap-4 px-4">
                <div
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <IoIosArrowBack />
                </div>
                <div className="flex-grow relative">
                    <input
                        className="w-full outline-none h-10 rounded-full border border-zinc-900 bg-transparent px-2"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <MdOutlineSearch />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                {searchResult &&
                    searchResult.results &&
                    searchResult.results.map((item, idx) => (
                        <CitySearch key={`search-item-${idx}`} {...item} />
                    ))}
            </div>
        </motion.div>
    );
};

export default Search;
