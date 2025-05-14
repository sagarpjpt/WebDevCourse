console.log("cheeta bol lahe cheeta");
const api_key = "431ec88ac5c5834210a041cc899383bf";

function renderWeatherInfo(data) {
    let newPara = document.createElement("p");
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`; // what is this ?? btw temp value is stored to newpara content
    document.body.appendChild(newPara);
}

async function showWeather() {
  try {

    let city = "goa";
  
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );

    const data = await response.json();

    console.log("weather data: --> ", data);
    // console.log('weather data:--> '+ data); why not printing object ?

    renderWeatherInfo(data);

  } catch (e) {

    console.log('error occured : ' + e);

  }
}

async function getCustomWeather() {
    
    try{
        let lat = 17.68333;
        let lon = 18.3333;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        );

        const data = await response.json();

        console.log(data);
    }
    catch(e) {
        console.log("error : " + e);
    }

}

function switchTab(clickedTab) {

  apiErrorContainer.classList.remove("active");
  
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } 

    else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      // getFromSessionStorage();
    }
    console.log("Current Tab", currentTab);
  }

}

//get your current location
function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    console.log('No geoLocation supported');
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let longi = position.coords.longitude;

  console.log(lat);
  console.log(longi);
}

