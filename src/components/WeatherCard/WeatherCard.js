import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp }) => {
<<<<<<< HEAD
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
=======
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
>>>>>>> refs/remotes/origin/Project-10
  });

  const imageSrcUrl = weatherOption.url || "";
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit];
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <div>
        <img src={imageSrcUrl} className="weather__image" alt="weatherimage" />
      </div>
    </section>
  );
};
export default WeatherCard;
