import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { Input, Select } from "antd";

const Home = () => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const search = searchParams.get("search");

  let displayedCountries = data;
  if (filter && search) {
    displayedCountries = data
      .filter(country => country.region.toLowerCase() === filter)
      .filter(filtered =>
        filtered.name.common.toLowerCase().includes(search.toLowerCase()),
      );
  } else if (filter) {
    displayedCountries = data.filter(
      country => country.region.toLowerCase() === filter,
    );
  } else if (search) {
    displayedCountries = data.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const handleSelect = value => {
    setSearchParams(prev => {
      if (value === "world") prev.delete("filter");
      else prev.set("filter", value);
      return prev;
    });
  };

  const onSearch = (value, _e, info) => {
    if (info?.source === "input") {
      setSearchParams(prev => {
        prev.set("search", value);
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.delete("search");
        return prev;
      });
    }
  };

  return (
    <>
      <div className="inputs">
        <Input.Search
          placeholder="Find country"
          defaultValue={search || ""}
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Select
          defaultValue={filter || "world"}
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
              <Link
                to={country.name.common}
                key={country.name.common}
                state={{
                  link: `?${searchParams}`,
                }}
              >
                <CountryCard country={country} />
              </Link>
            ))
          : "There are no country matching your filter."}
      </div>
    </>
  );
};
export default Home;
