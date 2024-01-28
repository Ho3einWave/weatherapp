export interface LocationName {
    latitude: number;
    lookupSource: string;
    longitude: number;
    localityLanguageRequested: string;
    continent: string;
    continentCode: string;
    countryName: string;
    countryCode: string;
    principalSubdivision: string;
    principalSubdivisionCode: string;
    city: string;
    locality: string;
    postcode: string;
    plusCode: string;
    fips: FIPS;
    localityInfo: LocalityInfo;
}

export interface FIPS {
    state: string;
    county: string;
    countySubdivision: string;
    place: string;
}

export interface LocalityInfo {
    administrative: Ative[];
    informative: Ative[];
}

export interface Ative {
    name: string;
    description: string;
    isoName?: string;
    order: number;
    adminLevel?: number;
    isoCode?: string;
    wikidataId?: string;
    geonameId?: number;
}

//

export interface WeatherApiRes {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: Current;
    hourly_units: HourlyUnits;
    hourly: Hourly;
    daily_units: DailyUnits;
    daily: Daily;
}

export interface CurrentUnits {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    cloud_cover: string;
    pressure_msl: string;
    surface_pressure: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
}

export interface Current {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
}

export interface HourlyUnits {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    dew_point_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    snow_depth: string;
    weather_code: string;
    pressure_msl: string;
    surface_pressure: string;
    cloud_cover: string;
    cloud_cover_low: string;
    cloud_cover_mid: string;
    cloud_cover_high: string;
    visibility: string;
    evapotranspiration: string;
    et0_fao_evapotranspiration: string;
    vapour_pressure_deficit: string;
    wind_speed_10m: string;
    wind_speed_80m: string;
    wind_speed_120m: string;
    wind_speed_180m: string;
    wind_direction_10m: string;
    wind_direction_80m: string;
    wind_direction_120m: string;
    wind_direction_180m: string;
    wind_gusts_10m: string;
    temperature_80m: string;
    temperature_120m: string;
    temperature_180m: string;
    soil_temperature_0cm: string;
    soil_temperature_6cm: string;
    soil_temperature_18cm: string;
    soil_temperature_54cm: string;
    soil_moisture_0_to_1cm: string;
    soil_moisture_1_to_3cm: string;
    soil_moisture_3_to_9cm: string;
    soil_moisture_9_to_27cm: string;
    soil_moisture_27_to_81cm: string;
}

export interface Hourly {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    dew_point_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number | undefined[];
    precipitation: number[];
    rain: number[];
    showers: number[];
    snowfall: number[];
    snow_depth: number[];
    weather_code: number[];
    pressure_msl: number[];
    surface_pressure: number[];
    cloud_cover: number[];
    cloud_cover_low: number[];
    cloud_cover_mid: number[];
    cloud_cover_high: number[];
    visibility: number[];
    evapotranspiration: number[];
    et0_fao_evapotranspiration: number[];
    vapour_pressure_deficit: number[];
    wind_speed_10m: number[];
    wind_speed_80m: number[];
    wind_speed_120m: number[];
    wind_speed_180m: number | undefined[];
    wind_direction_10m: number[];
    wind_direction_80m: number[];
    wind_direction_120m: number[];
    wind_direction_180m: number | undefined[];
    wind_gusts_10m: number[];
    temperature_80m: number[];
    temperature_120m: number[];
    temperature_180m: number | undefined[];
    soil_temperature_0cm: number | undefined[];
    soil_temperature_6cm: number | undefined[];
    soil_temperature_18cm: number | undefined[];
    soil_temperature_54cm: number | undefined[];
    soil_moisture_0_to_1cm: number | undefined[];
    soil_moisture_1_to_3cm: number | undefined[];
    soil_moisture_3_to_9cm: number | undefined[];
    soil_moisture_9_to_27cm: number | undefined[];
    soil_moisture_27_to_81cm: number | undefined[];
}

export interface DailyUnits {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    daylight_duration: string;
    sunshine_duration: string;
    uv_index_max: string;
    uv_index_clear_sky_max: string;
    precipitation_sum: string;
    rain_sum: string;
    showers_sum: string;
    snowfall_sum: string;
    precipitation_hours: string;
    precipitation_probability_max: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
    wind_direction_10m_dominant: string;
    shortwave_radiation_sum: string;
    et0_fao_evapotranspiration: string;
}

export interface Daily {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
    sunshine_duration: number[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[] | undefined[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
    shortwave_radiation_sum: number[];
    et0_fao_evapotranspiration: number[];
}
