import { Link } from "react-router-dom";

const CountryCard = ({ country, state }) => {
  return (
    <div className="card card-compact w-64 bg-l-ele text-l-text shadow-xl transition hover:scale-105 dark:bg-d-ele dark:text-d-text">
      <Link to={country.name.common} state={{ link: state }}>
        <figure>
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="aspect-square h-44 w-full rounded-2xl"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{country.name.common}</h2>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital[0]}</p>
        </div>
      </Link>
    </div>
  );
};
export default CountryCard;
