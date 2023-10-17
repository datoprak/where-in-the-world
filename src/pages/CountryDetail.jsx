import { Link, useLoaderData, useLocation } from "react-router-dom";
import { countriesWithCode } from "../utils/countryCodes";
import Icon from "../components/Icon";

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
      <div className="mb-12">
        <Link to={`..${backLink}`}>
          <button className="btn border-none bg-l-ele text-l-text shadow-2xl transition-transform hover:scale-105 hover:bg-l-ele dark:bg-d-ele dark:text-d-text">
            <Icon name="left-arrow" className="h-4 w-4" />
            <span>{backButtonText}</span>
          </button>
        </Link>
      </div>
      <div className="details grid grid-cols-2 gap-24">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="justify-self-stretch"
        />
        <div className="extra-details grid grid-cols-2 self-center gap-16">
          <div className="name col-span-2 text-3xl font-extrabold">
            {country.name.common}
          </div>
          <div className="left-side flex flex-col gap-2">
            <div className="native-name">
              <span className="font-semibold">Native Names: </span>
              {nativeNames.map((name, i) => (
                <span key={name.official}>{(i ? ", " : "") + name.common}</span>
              ))}
            </div>
            <div className="population">
              <span className="font-semibold">Population: </span>
              {country.population}
            </div>
            <div className="region">
              <span className="font-semibold">Region: </span>
              {country.region}
            </div>
            <div className="sub-region">
              <span className="font-semibold">Sub Region: </span>
              {country.subregion}
            </div>
          </div>
          <div className="right-side flex flex-col gap-2">
            <div className="capital">
              <span className="font-semibold">Capitals: </span>
              {country.capital.map((cap, i) => (
                <span key={cap}>{(i ? ", " : "") + cap}</span>
              ))}
            </div>
            <div className="top-level-domain">
              <span className="font-semibold">Top Level Domain: </span>
              {country.tld?.map((d, i) => (
                <span key={d}>{(i ? ", " : "") + d}</span>
              ))}
            </div>
            <div className="currencies">
              <span className="font-semibold">Currencies: </span>
              {currencies.map((curr, i) => (
                <span key={curr}>{(i ? ", " : "") + curr}</span>
              ))}
            </div>
            <div className="languages">
              <span className="font-semibold">Languages: </span>
              {languages.map((lan, i) => (
                <span key={lan}>{(i ? ", " : "") + lan}</span>
              ))}
            </div>
          </div>
          <div className="borders col-span-2 flex flex-wrap items-center gap-4">
            <span className="font-semibold">Border Countries: </span>
            {borders.length > 0
              ? borders.map(border => (
                  <Link to={`/${border}`} key={border}>
                    <button className="btn border-none bg-l-ele normal-case text-l-text shadow-2xl transition-transform hover:scale-105 hover:bg-l-ele dark:bg-d-ele dark:text-d-text">
                      {border}
                    </button>
                  </Link>
                ))
              : " There are no border country"}
          </div>
        </div>
      </div>
    </>
  );
};
export default CountryDetail;
