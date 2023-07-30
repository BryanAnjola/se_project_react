import defaultClothingItems from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { currentTemperatureUnitContext } from "../../../contexts/CurrentTempetureUnit";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 99;
  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        <span className="weather__suggest">
          Today is {temp} °F / You may want to wear:
        </span>
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
