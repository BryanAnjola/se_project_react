import "./WeatherCard.css";
import { currentTemperatureUnitContext } from "../../contexts/CurrentTempetureUnit";
import { useContext } from "react";
const weatherOptions = [
  {
    url: require("../../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/night/sunny.svg").default,
    day: false,
    type: "sunny",
  },
];

const WeatherCard = ({ day, type, weatherTemp }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit];
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {temp}°{currentTemperatureUnit}
      </div>
      <div>
        <img src={imageSrcUrl} className="weather__image" />
      </div>
    </section>
  );
};
export default WeatherCard;
