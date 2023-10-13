import { Link, useLoaderData } from "react-router-dom";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const data = useLoaderData();
  // console.log(data);

  return (
    <>
      <div className="inputs">
        <input type="text" />
        <select name="filter" id="filter">
          <option value="africa">Africa</option>
        </select>
      </div>
      <div className="countries-container">
        {data.map((country) => (
          <Link to={country.name.common} key={country.name.common}>
            <CountryCard country={country} />
          </Link>
        ))}
      </div>
    </>
  );
};
export default Home;
