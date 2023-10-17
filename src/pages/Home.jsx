import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { Suspense, useState } from "react";
import Loading from "../components/Loading";
import Icon from "../components/Icon";

const Home = () => {
  const dataPromise = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState("");

  const filter = searchParams.get("filter");
  const search = searchParams.get("search");

  const handleSelect = e => {
    setSearchParams(prev => {
      if (e.target.value === "world") prev.delete("filter");
      else prev.set("filter", e.target.value);
      return prev;
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setSearchParams(prev => {
      prev.set("search", input);
      return prev;
    });
  };

  return (
    <>
      <div className="mb-8 flex justify-between">
        <form onSubmit={onSubmit} className="flex">
          <div className="join w-96 rounded-3xl bg-l-ele dark:bg-d-ele">
            <input
              className="input input-bordered join-item dark:border-base-content w-full rounded-s-3xl border-e-0 bg-inherit dark:bg-inherit"
              placeholder="Search for a country..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className="btn btn-outline join-item border-base-content dark:border-base-content dark:hover:text-base-content hover:text-base-content rounded-r-full border-s-0 border-opacity-20 bg-inherit transition-none hover:border-opacity-20 hover:bg-l-ele dark:bg-inherit"
              type="submit"
            >
              <Icon name="search" />
            </button>
          </div>
        </form>
        <select
          value={filter || "world"}
          onChange={handleSelect}
          className="select select-bordered w-40 bg-l-ele dark:bg-d-ele"
        >
          <option value="world">World</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Ocenia</option>
        </select>
      </div>
      <div className="grid-cols-auto-fill-100 grid items-stretch gap-12">
        <Suspense fallback={<Loading />}>
          <Await resolve={dataPromise.data}>
            {loadedCountries => {
              let displayedCountries = loadedCountries;
              if (filter && search) {
                displayedCountries = loadedCountries
                  .filter(country => country.region.toLowerCase() === filter)
                  .filter(filtered =>
                    filtered.name.common
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  );
              } else if (filter) {
                displayedCountries = loadedCountries.filter(
                  country => country.region.toLowerCase() === filter,
                );
              } else if (search) {
                displayedCountries = loadedCountries.filter(country =>
                  country.name.common
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                );
              }
              return (
                <>
                  {displayedCountries.length > 0
                    ? displayedCountries.map(country => (
                        <CountryCard
                          country={country}
                          key={country.name.common}
                          state={`?${searchParams}`}
                        />
                      ))
                    : "There are no country matching your filter."}
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
};
export default Home;
