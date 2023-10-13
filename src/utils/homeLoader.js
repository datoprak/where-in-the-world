import { fetchData } from "./fetchData";

export default async function loader() {
  const data = await fetchData(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
  );
  return data;
}
