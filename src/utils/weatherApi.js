//
//
const latitude = 44.34;
const longitude = 10.99;
const APIkey = "ad0470e65d61647ef3cb85aed6f1b4b5";
export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
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
  console.log(weather);
  return weather;
};
