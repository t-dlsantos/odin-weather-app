const API_KEY = "6K6ZBEQRFH4MR4GQFER3RL2PL";
const form = document.querySelector('form');
const citySearch = document.getElementById('city-search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.temp-icon');
const switchMetricButton = document.querySelector('.switch-metric');
const metric = document.querySelector('.metric');
const celsius = document.querySelector('.celsius');
const fahrenheit = document.querySelector('.fahrenheit');


const getCityData = async () => {
  const citySearched = citySearch.value ? citySearch.value : 'New York';
  let desiredData = {};
  
  try {
    const reponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearched}/?key=${API_KEY}`, { mode: "cors" });
    const weatherData = await reponse.json();
    console.log(weatherData)
    desiredData = { cityName: weatherData.resolvedAddress, temp: weatherData.currentConditions.temp, conditions: weatherData.currentConditions.conditions, icon: weatherData.currentConditions.icon };
  } catch(error) {
    console.log(error);
  }
  return desiredData;
}

const toggleMetric = () => {
  const currentMetric = switchMetricButton.getAttribute("current-metric");
  const currentTemp = parseFloat(temp.textContent); 

  if (isNaN(currentTemp)) {
    return;
  }

  if (currentMetric === 'fahrenheit') {
    temp.textContent = ((currentTemp - 32) * (5 / 9)).toFixed(2);
    switchMetricButton.setAttribute("current-metric", "celsius");
    fahrenheit.classList.remove('selected-metric');
    celsius.classList.add('selected-metric');
  } else {
    temp.textContent = ((currentTemp * (9 / 5)) + 32).toFixed(2);
    switchMetricButton.setAttribute("current-metric", "fahrenheit");
    celsius.classList.remove('selected-metric');
    fahrenheit.classList.add('selected-metric');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityData = await getCityData();
  city.textContent = cityData.cityName;
  temp.textContent = cityData.temp;
  icon.src = `./src/icons/${cityData.icon}.svg`;
  icon.classList.add('icon-styling');
  fahrenheit.classList.add('selected-metric');
})

switchMetricButton.addEventListener("click", toggleMetric)