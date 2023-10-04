//day
import sunny from "../images/day/sunny.svg";
import cloudy from "../images/day/cloudy.svg";
import fog from "../images/day/fog.svg";
import rain from "../images/day/rain.svg";
import snow from "../images/day/snow.svg";
import storm from "../images/day/storm.svg";

//night
import clear from "../images/night/sunny.svg";
import nightcloudy from "../images/night/cloudy.svg";
import nightfog from "../images/night/fog.svg";
import nightrain from "../images/night/rain.svg";
import nightsnow from "../images/night/snow.svg";
import nightstorm from "../images/night/storm.svg";

export const latitude = 44.34;
export const longitude = 10.99;
export const APIkey = "d94f132a36181e9bcd4bdfe9ffe86343";

// export const defaultClothingItems = [
//   {
//     _id: 0,
//     name: "Cap",
//     weather: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
//   },
//   {
//     _id: 1,
//     name: "Hoodie",
//     weather: "warm",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
//   },
//   {
//     _id: 2,
//     name: "Jacket",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
//   },
//   {
//     _id: 3,
//     name: "Sneakers",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
//   },
//   {
//     _id: 4,
//     name: "T-Shirt",
//     weather: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
//   },
//   {
//     _id: 5,
//     name: "Winter coat",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
//   },
// ];

export const weatherOptions = [
  {
    url: sunny,
    day: true,
    type: "sunny",
  },
  {
    url: cloudy,
    day: true,
    type: "cloudy",
  },
  {
    url: fog,
    day: true,
    type: "fog",
  },
  {
    url: rain,
    day: true,
    type: "rain",
  },
  {
    url: snow,
    day: true,
    type: "snow",
  },
  {
    url: storm,
    day: true,
    type: "storm",
  },
  {
    url: clear,
    day: false,
    type: "Clear sky",
  },
  {
    url: nightcloudy,
    day: false,
    type: "cloudy",
  },
  {
    url: nightfog,
    day: false,
    type: "fog",
  },
  {
    url: nightrain,
    day: false,
    type: "rain",
  },
  {
    url: nightsnow,
    day: false,
    type: "snow",
  },
  {
    url: nightstorm,
    day: false,
    type: "storm",
  },
];
