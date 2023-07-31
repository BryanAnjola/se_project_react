import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { currentTemperatureUnitContext } from "../../contexts/CurrentTempetureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit];
  console.log(temp);
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <div>
        <img src={imageSrcUrl} className="weather__image" />
      </div>
    </section>
  );
};
export default WeatherCard;
