// API KEY: 234de5344ae61c5807b1337dcb5b8694
// API CALL : api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}

const input = document.querySelector('.app__input');
const btn = document.querySelector('.app__button');

const cityName = document.querySelector('.app__city-name');
const warning = document.querySelector('.app__warning');
const photo = document.querySelector('.app__photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';

const apiKey = '&appid=234de5344ae61c5807b1337dcb5b8694';
const units = '&units=metric';
let city;
let url;

const getWeather = () => {
  city = (!input.value) ? 'Kraków' : input.value;
  url = apiLink + city + apiKey + units;

  axios.get(url).then(res => {
    console.log(res);

    const temp = res.data.main.temp;
    const hum = res.data.main.humidity;
    const status = Object.assign({}, ...res.data.weather)

    cityName.textContent = res.data.name;
    weather.textContent = status.main;
    temperature.textContent = `${Math.floor(temp)}°C`;
    humidity.textContent = `${hum}%`

    warning.textContent = '';
    input.value = '';


    if (status.id >= 801) {
      photo.setAttribute('src', 'WeatherGraphics/cloud.png');
    } else if (status.id === 800) {
      photo.setAttribute('src', 'WeatherGraphics/sun.png');
    } else if (status.id >= 700 && status.id < 800) {
      photo.setAttribute('src', 'WeatherGraphics/fog.png');
    } else if (status.id >= 600 && status.id < 700) {
      photo.setAttribute('src', 'WeatherGraphics/ice.png');
    } else if (status.id >= 500 && status.id < 600) {
      photo.setAttribute('src', 'WeatherGraphics/rain.png');
    } else if (status.id >= 300 && status.id < 500) {
      photo.setAttribute('src', 'WeatherGraphics/drizzle.png');
    } else if (status.id >= 200 && status.id < 300) {
      photo.setAttribute('src', 'WeatherGraphics/thunderstorm.png');
    } else {
      photo.setAttribute('src', 'WeatherGraphics/unknow.png');
    }

  }).catch(() => {
    warning.textContent = 'wpisz poprawną nazwę miasta';
    input.value = '';
  })
};

const enterCheck = () => {
  if (event.keyCode === 13) {
    getWeather();
  }
}

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);