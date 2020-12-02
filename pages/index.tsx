import { GetStaticProps } from 'next';
import { useEffect } from 'react';

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: { code: string; name: string; symbol: string }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
  };
  flag: string;
  regionalBlocs: {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
  };
  cioc: string;
}

interface IndexPageProps {
  country: Country;
}

const IndexPage: React.FC<IndexPageProps> = ({ country }) => {
  useEffect(() => {
    if (country == null) {
      // fetch some other data
    }
  }, []);

  if (country == null) {
    return null;
  }

  return (
    <ul>
      <li>Name: {country.name}</li>
      <li>Capital: {country.capital}</li>
      <li>Population: {country.population}</li>
      <li>Top Level Domain: {country.topLevelDomain}</li>
    </ul>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context
) => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = (await response.json()) as Country[];
  const country = countries.find((c) => c.alpha2Code === 'SE');

  return {
    props: {
      country,
    },
  };
};

export default IndexPage;
