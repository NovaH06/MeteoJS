const apiKey = '5dd4a3cfb9e347e4e1b4e7fd61fe21dd'; 

function obtenirMeteo(ville) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const nomVille = data.name;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const icone = data.weather[0].icon;
    
      document.getElementById('city-name').textContent = nomVille;
      document.getElementById('temperature').textContent = `Température : ${temperature} °C`;
      document.getElementById('humidity').textContent = `Humidité : ${humidity}%`;
      document.getElementById('wind-speed').textContent = `Vitesse du vent : ${windSpeed} m/s`;
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${icone}.png`;
      document.getElementById('weather-icon').style.display = 'block';

      
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;

      fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
          const tomorrowTemperature = forecastData.daily[1].temp.day;
          const tomorrowHumidity = forecastData.daily[1].humidity;
          const tomorrowWindSpeed = forecastData.daily[1].wind_speed;
          const tomorrowIcon = forecastData.daily[1].weather[0].icon;

          document.getElementById('temperature-tomorrow').textContent = `Température demain : ${tomorrowTemperature} °C`;
          document.getElementById('humidity-tomorrow').textContent = `Humidité demain : ${tomorrowHumidity}%`;
          document.getElementById('wind-speed-tomorrow').textContent = `Vitesse du vent demain : ${tomorrowWindSpeed} m/s`;
          document.getElementById('weather-icon-tomorrow').src = `https://openweathermap.org/img/w/${tomorrowIcon}.png`;
          document.getElementById('weather-icon-tomorrow').style.display = 'block';
        })
        .catch(error => {
          console.log('Une erreur s\'est produite lors de la récupération des prévisions météo', error);
        });
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la récupération des données météo', error);
    });
}

const champVille = document.getElementById('city-input');
const boutonRechercher = document.getElementById('changer');

function rechercherMeteo() {
  const ville = champVille.value;
  obtenirMeteo(ville);
}

boutonRechercher.addEventListener('click', rechercherMeteo);
champVille.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) { 
    rechercherMeteo();
  }
});