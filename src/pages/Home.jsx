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
      if (input === "") prev.delete("search");
      else prev.set("search", input);
      return prev;
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <form onSubmit={onSubmit} className="flex">
          <div className="join w-full rounded-3xl bg-l-ele dark:bg-d-ele sm:w-96">
            <input
              name="search"
              className="input join-item input-bordered w-full rounded-s-3xl border-e-0 bg-inherit dark:border-base-content dark:bg-inherit"
              placeholder="Search for a country..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              className="btn btn-outline join-item rounded-r-full border-s-0 border-base-content border-opacity-20 bg-inherit transition-none hover:border-opacity-20 hover:bg-l-ele hover:text-base-content dark:border-base-content dark:bg-inherit dark:hover:text-base-content"
              type="submit"
            >
              <Icon name="search" />
            </button>
          </div>
        </form>
        <select
          name="select"
          value={filter || "world"}
          onChange={handleSelect}
          className="select select-bordered w-1/2 bg-l-ele dark:bg-d-ele sm:w-40"
        >
          <option value="world">World</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Ocenia</option>
        </select>
      </div>
      <div className="grid w-full grid-cols-auto-fill-100 items-stretch justify-items-center gap-12">
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
