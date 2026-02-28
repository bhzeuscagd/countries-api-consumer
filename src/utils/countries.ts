import data from "../data/data.json";

export interface CountryCardData {
    name: string;
    population: string;
    region: string;
    capital: string;
    flagUrl: string;
}

export interface CountryDetailData {
    name: string;
    nativeName: string;
    population: string;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: string[];
    languages: string[];
    borders: string[];
    flagUrl: string;
}

// Format a number with commas separator
const formatPopulation = (num: number) => {
    return num.toLocaleString('en-US');
};

// Create a clean mapped array specifically for the cards
export const getCountriesForCards = (): CountryCardData[] => {
    return data.map((country: any) => ({
        name: country.name,
        population: formatPopulation(country.population),
        region: country.region,
        capital: country.capital ?? "N/A",
        flagUrl: country.flags.svg, // Can switch to svg if needed
    }));
};

// Retrieve a single country with complete detailed information
export const getCountryDetails = (countryName: string): CountryDetailData | null => {
    const country = data.find((c: any) => c.name.toLowerCase() === countryName.toLowerCase());
    
    if (!country) return null;

    return {
        name: country.name,
        nativeName: country.nativeName ?? country.name,
        population: formatPopulation(country.population),
        region: country.region,
        subregion: country.subregion ?? "N/A",
        capital: country.capital ?? "N/A",
        topLevelDomain: country.topLevelDomain ?? [],
        currencies: country.currencies?.map((cur: any) => cur.name) ?? [],
        languages: country.languages?.map((lang: any) => lang.name) ?? [],
        borders: country.borders ?? [],
        flagUrl: country.flags.svg // Typically detail views use the crisp SVG vector
    };
};

// URL-safe string formatter
export const createSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
};
