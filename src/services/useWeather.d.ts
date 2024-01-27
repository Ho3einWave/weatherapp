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
