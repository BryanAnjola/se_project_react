import defaultClothingItems from "../../util/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((x) => {
    console.log(x);
    return x.weather.toLowerCase() === weatherType;
  });
  console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {weatherTemp} F / You may want to wear:
        <div className="card__items">
          {filteredCards.map((x) => (
            <ItemCard x={x} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
