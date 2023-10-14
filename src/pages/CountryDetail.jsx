import { Link, useLoaderData } from "react-router-dom";
import { countriesWithCode } from "../utils/countryCodes";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CountryDetail = () => {
  const data = useLoaderData();
  const country = data[0];
  const currencies = [];
  const languages = [];
  const borders = [];
  const nativeNames = [];

  for (const key in country.currencies) {
    currencies.push(country.currencies[key].name);
  }

  for (const key in country.languages) {
    languages.push(country.languages[key]);
  }

  for (const key in country.name.nativeName) {
    nativeNames.push(country.name.nativeName[key]);
  }

  country.borders?.forEach(border => {
    borders.push(
      countriesWithCode.find(country => border === country.code).name,
    );
  });

  return (
    <>
      <Link to="/">
        <Button icon={<ArrowLeftOutlined />}>Back</Button>
      </Link>
      <div className="details">
        <img src={country.flags.png} alt={country.name.common} />
        <div className="name">{country.name.common}</div>
        <div className="extra-details">
          <div className="native-name">
            Native Names:
            {nativeNames.map(name => (
              <span key={name.common}> {name.common}</span>
            ))}
          </div>
          <div className="population">Population: {country.population}</div>
          <div className="region">Region: {country.region}</div>
          <div className="sub-region">Sub Region: {country.subregion}</div>
          <div className="capital">
            {country.capital.map(cap => (
              <div key={cap}>Capitals: {cap}</div>
            ))}
          </div>
          <div className="top-level-domain">
            {country.tld.map(d => (
              <div key={d}>Top Level Domain: {d}</div>
            ))}
          </div>
          <div className="currencies">
            {currencies.map(curr => (
              <div key={curr}>Currencies: {curr}</div>
            ))}
          </div>
          <div className="languages">
            {languages.map(lan => (
              <div key={lan}>Languages: {lan}</div>
            ))}
          </div>
        </div>
        <div className="borders">
          Border Countries:
          {borders.length > 0
            ? borders.map(border => <div key={border}>{border}</div>)
            : " There are no border country"}
        </div>
      </div>
    </>
  );
};
export default CountryDetail;
