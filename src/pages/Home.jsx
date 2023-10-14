import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";

const Home = () => {
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");

  useEffect(() => {
    const countries = filter
      ? data.filter(country => country.region.toLowerCase() === filter)
      : data;
    setDisplayedCountries(countries);
  }, [filter, data]);

  const handleSelect = value => {
    setSearchParams(prev => {
      if (value === "world") prev.delete("filter");
      else prev.set("filter", value);
      return prev;
    });
  };

  const onSearch = (value, _e, info) => {
    if (info?.source === "input") {
      setDisplayedCountries(
        filter
          ? data
              .filter(country => country.region.toLowerCase() === filter)
              .filter(filtered =>
                filtered.name.common
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              )
          : data.filter(country =>
              country.name.common.toLowerCase().includes(value.toLowerCase()),
            ),
      );
    } else
      setDisplayedCountries(
        filter
          ? data.filter(country => country.region.toLowerCase() === filter)
          : data,
      );
  };

  return (
    <>
      <div className="inputs">
        <Input.Search
          placeholder="Find country"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Select
          defaultValue="world"
          style={{
            width: 120,
          }}
          onChange={handleSelect}
          options={[
            {
              value: "world",
              label: "World",
            },
            {
              value: "africa",
              label: "Africa",
            },
            {
              value: "americas",
              label: "America",
            },
            {
              value: "asia",
              label: "Asia",
            },
            {
              value: "europe",
              label: "Europe",
            },
            {
              value: "oceania",
              label: "Oceania",
            },
          ]}
        />
      </div>
      <div className="countries-container">
        {displayedCountries.length > 0
          ? displayedCountries.map(country => (
              <Link to={country.name.common} key={country.name.common}>
                <CountryCard country={country} />
              </Link>
            ))
          : "There are no country matching your filter."}
      </div>
    </>
  );
};
export default Home;
