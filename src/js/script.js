const KEY_OPEN_WEATHER = "->SUA KEY AQUI<-";
const LANGUAGE_OPEN_WEATHER = "pt_br";
const UNITS_OPEN_WEATHER = "metric";
const CNT_OPEN_WEATHER = 5;

const currentData = getCurrentDate();
const weekNumber = currentData.getDay();
const nextDays = getNextDays(weekNumber);

function getCurrentDate() {
  return new Date();
}

function getNextDays(weekNumber, totalDays = 5) {
  const arrDayweek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const nextDays = [];
  for (let i = 0; i < totalDays; i++) {
    const index = (weekNumber + i) % 7;
    nextDays.push(arrDayweek[index]);
  }
  return nextDays;
}

function formatBrazilianDate(date) {
  const brazilianDateFormat = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return brazilianDateFormat.format(date);
}

function updateDOM(nextDays, currentDate) {
  const domElements = {
    defaultDate: document.querySelector(".default_date"),
    defaultDay: document.querySelector(".default_day"),
    dayWeek2: document.querySelector(".day-week-2"),
    dayWeek3: document.querySelector(".day-week-3"),
    dayWeek4: document.querySelector(".day-week-4"),
    dayWeek5: document.querySelector(".day-week-5"),
  };

  domElements.defaultDate.innerHTML = formatBrazilianDate(currentDate);
  domElements.defaultDay.innerHTML = nextDays[0];
  domElements.dayWeek2.innerHTML = nextDays[1];
  domElements.dayWeek3.innerHTML = nextDays[2];
  domElements.dayWeek4.innerHTML = nextDays[3];
  domElements.dayWeek5.innerHTML = nextDays[4];
}

window.onload = function () {
  updateDOM(nextDays, currentData);


};

function searchButton() {
  const inputField = document.querySelector(".input_field");
  const citySearched = inputField.value;
  searhCity(citySearched)
  return false;
}

async function searhCity(citySearched) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=${KEY_OPEN_WEATHER}&lang=${LANGUAGE_OPEN_WEATHER}&units=${UNITS_OPEN_WEATHER}&cnt=${CNT_OPEN_WEATHER}`
    );
    const dataWeather = await response.json();
    if (!response.ok) {
      throw new Error(`Erro: ${dataWeather.message}`);
    }
    displayHTMLContent(dataWeather);
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    alert(`A cidade pesquisada não consta no banco de dados ou o nome 
    foi digitado incorretamente. Por favor, verifique a ortografia e 
    tente novamente.`);
  }
}

function displayHTMLContent(dataWeather) {
  const weatherIcons = {
    chuva_leve: "src/img/icons/icon-2.png",
    trovoadas: "src/img/icons/icon-7.png",
    chuva_moderada: "src/img/icons/icon-10.png",
    algumas_nuvens: "src/img/icons/icon-12.png",
    nuvens_dispersas: "src/img/icons/icon-14.png",
    nublado: "src/img/icons/icon-16.png",
    névoa: "src/img/icons/icon-16.png",
    céu_limpo: "src/img/icons/icon-17.png",
  };

  const iconEl = [
    document.querySelector(".icon-weather"),
    document.querySelector(".day-icon-2"),
    document.querySelector(".day-icon-3"),
    document.querySelector(".day-icon-4"),
    document.querySelector(".day-icon-5")
  ];

  const dayTempEl = [
    document.querySelector(".weather_temp"),
    document.querySelector(".day-temp-2"),
    document.querySelector(".day-temp-3"),
    document.querySelector(".day-temp-4"),
    document.querySelector(".day-temp-5"),
  ];

  document.querySelector(".cloudtxt").innerHTML = `${dataWeather.list[0].weather[0].description}`;
  document.querySelector(".first-value-city").innerHTML = dataWeather.city.name;
  document.querySelector(".first-value-temperature").innerHTML = `${dataWeather.list[0].main.temp.toFixed(1)}°C`;
  document.querySelector(".first-value-humidity").innerHTML = `${dataWeather.list[0].main.temp.toFixed(1)}%`;
  document.querySelector(".first-value-wind").innerHTML = `${dataWeather.list[0].wind.speed} m/s`;

  for (let i = 0; i < 5; i++) {
    let indexObject = dataWeather.list[i].weather[0].description.replace(" ", "_");
    iconEl[i].src = weatherIcons[indexObject];
    dayTempEl[i].innerHTML = `${dataWeather.list[i].main.temp.toFixed(1)}°C`;
  }
}