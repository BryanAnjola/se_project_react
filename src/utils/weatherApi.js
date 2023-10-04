import { checkResponse } from "./Api";
import { APIkey, longitude, latitude } from "./constants";
export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject(`Error: ${res.status}`);
  //   }
  // });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const tempeture = main && main.temp;
  const weather = {
    tempeture: {
      F: Math.round(tempeture),
      C: Math.round(((tempeture - 32) * 5) / 9),
    },
  };
  return weather;
};
