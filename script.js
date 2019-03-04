var appId = '2ef83a8b42392109d4cc4d35fac1fdde';
var units = 'imperial';
var searchMethod = 'zip';

function getSearchMethod(searchTerm) {
    
        "use strict";

    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip' ;
    else
        searchMethod = 'q';
}



function searchWeather(searchTerm) {
    "use strict";
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}
 


function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
            
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Clouds':
             document.body.style.backgroundImage = 'url("cloudy.jpg)';
            break;
            
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
             document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
            
        case 'Thunderstorm':
             document.body.style.backgroundImage= 'url("storm.jpg")';
        
        case 'Snow':
             document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
            
        default:
            break;
            
        setpositionforweatherinfo();
    }
    
    var weatherdescritionheader = 
    document.getElementById('weatherdescritionheader');
    
    var temperatureElement = document.getElementById('temperature');
    
    var humidityElement = document.getElementById('humidity');
    
    var windSpeedElement = document.getElementById('windspeed');
    
    var cityHeader = document.getElementById('cityheader');
    
    var weatherIcon = document.getElementById('documenticonimg');
    
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon +  '.png';
    
     var resultDescription = resultFromServer.weather[0].description;
    
    weatherdescritionheader.innerText= resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176'; 
    
    windSpeedElement.innerHTML = 'Winds are ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    
}


function setpositionforweatherinfo() {
    
    let weatherContainer = document.getElementById('weathercontainer');
    let weatherContainerHeight = weatherContiner.clientHeight;
    let weatherContainerWidth = weatherContiner.clientWidth;
    
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerheight/2}px)`;
    


    
}



document.getElementById('searchbtn').addEventListener('click', () =>{
    let searchTerm = document.getElementById('searchinput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})

