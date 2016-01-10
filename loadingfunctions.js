function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function loadCity() {
    url = baseurl+lat+lon+mode+appid+unit+lang; 
    loadJSON(url, gotData);
    console.log(url);
}

function loadGeo() {
    var latbase = 'lat=';
    lat = latbase + round(locationData.latitude);
    var lonbase = '&lon=';
    lon = lonbase + round(locationData.longitude);      
    urlgeo = baseurl+lat+lon+appid;
    weather = loadJSON(urlgeo, setGeo, 'jsonp');

}

function setGeo(data) {
    temperature = weather.list[0].main.temp;
    city = data.city.name;
    formCity.value(city);
    return city;
}

function gotData(data){
    weatherData = data;
    windSpeed = data.list[0].wind.speed*1.2;
    city = data.city.name;
    country = data.city.country;
//    console.log(city);
//    console.log(url);
    formCity.value(city + ', ' + country);
    
    if (data.list[0].rain) {
        amountRain = data.list[0].rain["3h"];
        amountRain = round(amountRain*200);   
    } else {
        amountRain = 0;
    }
    if (data.list[0].snow) {
        amountSnow = data.list[0].snow["3h"];
        amountSnow = round(amountSnow * 200);   
    } else {
        amountSnow = 0;
    }
    temperature = data.list[0].main.temp;
    tempColor = data.list[0].main.temp;
    weatherType = data.list[0].weather[0].id;
}

function reloadCity() {
    loadCity();
    for (var i = clouds.length-1; i  > 0; i--) {
        clouds[i].updateWind();
    }
}
