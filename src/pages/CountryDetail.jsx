import { Link, useLoaderData, useLocation } from "react-router-dom";
import { countriesWithCode } from "../utils/countryCodes";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CountryDetail = () => {
  const data = useLoaderData();
  const location = useLocation();

  const country = data[0];
  const currencies = [];
  const languages = [];
  const borders = [];
  const nativeNames = [];

  const backLink = location.state?.link || "";
  const backButtonText =
    backLink === "?" ? "Back to all countries" : "Back to filtered countries";

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
      <Link to={`..${backLink}`}>
        <Button icon={<ArrowLeftOutlined />}>{backButtonText}</Button>
      </Link>
      <div className="details">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
        />
        <div className="name">{country.name.common}</div>
        <div className="extra-details">
          <div className="native-name">
            Native Names:
            {nativeNames.map(name => (
              <span key={name.official}>{name.common}</span>
            ))}
          </div>
          <div className="population">Population: {country.population}</div>
          <div className="region">Region: {country.region}</div>
          <div className="sub-region">Sub Region: {country.subregion}</div>
          <div className="capital">
            Capitals:
            {country.capital.map(cap => (
              <div key={cap}>{cap}</div>
            ))}
          </div>
          <div className="top-level-domain">
            Top Level Domain:
            {country.tld?.map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="currencies">
            Currencies:
            {currencies.map(curr => (
              <div key={curr}>{curr}</div>
            ))}
          </div>
          <div className="languages">
            Languages:
            {languages.map(lan => (
              <div key={lan}>{lan}</div>
            ))}
          </div>
        </div>
        <div className="borders">
          Border Countries:
          {borders.length > 0
            ? borders.map(border => (
                <Link to={`/${border}`} key={border}>
                  <Button>{border}</Button>
                </Link>
              ))
            : " There are no border country"}
        </div>
      </div>
    </>
  );
};
export default CountryDetail;
