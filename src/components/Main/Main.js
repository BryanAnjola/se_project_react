import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherTemp,
  weatherType,
  onSelectCard,
  timeOfDay,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const weatherFilter = () => {
    if (temp >= 30 && currentTemperatureUnit === "C") {
      return "hot";
    } else if (temp >= 19 && temp <= 29) {
      return "warm";
    } else if (temp <= 18) {
      return "cold";
    }

    if (temp >= 86 && currentTemperatureUnit === "F") {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };
  const weatherTempFilter = weatherFilter();
  const filterCards = clothingItems.filter((item) => {
    return item.weather === weatherTempFilter;
  });
  return (
    <main className="main">
      <WeatherCard
        day={timeOfDay}
        weatherType={weatherType}
        weatherTemp={temp}
      />
      <div className="main__title">
        Today is {temp}°{currentTemperatureUnit} / You may want to wear:
      </div>
      <section className="clothing">
        {filterCards.map((data) => {
          return (
            <ItemCard
              key={data?.id || data?._id}
              data={data}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
