import { fetchData } from "./fetchData";

export default async function loader({ params }) {
  const data = await fetchData(
    `https://restcountries.com/v3.1/name/${params.name}?fullText=true`,
  );
  return data;
}
