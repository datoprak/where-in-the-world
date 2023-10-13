import { Card } from "antd";

const CountryCard = ({ country }) => {
  const desc = (
    <div className="desc">
      <div className="population">Population: {country.population}</div>
      <div className="region">Region: {country.region}</div>
      <div className="capital">Capital: {country.capital[0]}</div>
    </div>
  );

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt={country.name.common} src={country.flags.png} />}
    >
      <Card.Meta title={country.name.common} description={desc} />
    </Card>
  );
};
export default CountryCard;
