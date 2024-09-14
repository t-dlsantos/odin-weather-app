const API_KEY = "6K6ZBEQRFH4MR4GQFER3RL2PL";
const form = document.querySelector('form');
const citySearch = document.getElementById('city-search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.temp-icon');

const getCityData = async () => {
  const citySearched = citySearch.value ? citySearch.value : 'New York';
  let desiredData = {};
  
  try {
    const reponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearched}/?key=${API_KEY}`, { mode: "cors" });
    const weatherData = await reponse.json();
    console.log(weatherData)
    desiredData = { cityName: weatherData.address, temp: weatherData.currentConditions.temp, conditions: weatherData.currentConditions.conditions, icon: weatherData.currentConditions.icon };
  } catch(error) {
    console.log(error);
  }
  return desiredData;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityData = await getCityData();
  city.textContent = cityData.cityName;
  temp.textContent = cityData.temp;
  icon.src = `./src/icons/${cityData.icon}.svg`;
  icon.classList.add('icon-styling');
})