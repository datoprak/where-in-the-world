import CountryCard from "../components/CountryCard";

const Home = () => {
  return (
    <>
      <div className="inputs">
        <input type="text" />
        <select name="filter" id="filter">
          <option value="africa">Africa</option>
        </select>
      </div>
      <div className="countries-container">
        <CountryCard />
      </div>
    </>
  );
};
export default Home;
