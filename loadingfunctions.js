function loadInt() {
    loadJSON(url, gotData, 'jsonp');
//    loadTimeatlocation(lon, lat, weatherTime);
}

function loadCity() {
    url = baseurl+formCity.value()+type+mode+appid+unit+lang; 
    loadJSON(url, gotData, 'jsonp');
}

function currentlocationtocurrentcity(position) {
    var geobaseurl = 'http://api.openweathermap.org/data/2.5/forecast?';
    geolat = position.coords.latitude;
    geolong = position.coords.longitude;
    url = geobaseurl+'lat='+geolat+'&lon='+geolong+type+mode+appid+unit+lang;
    loadJSON(url, gotData, 'jsonp');
}

function currentlocationerror(error) {
	console.log('error:', error);
    loadInt();
}

function gotData(data){
    weatherData = data;
    city = data.city.name;
    country = data.city.country;
    lon = data.city.coord.lon;
    lat = data.city.coord.lat;
    formCity.value(city + ', ' + country);
    
    if (data.list[0].wind.speed) {
        windSpeed = data.list[0].wind.speed;        
    } else {
        windSpeed = 1;
    }

    
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
    weatherDescription = data.list[0].weather[0].description;
    weatherTime = data.list[0].dt;
    loadTimeatlocation(lon, lat, weatherTime);
    
    console.log(geolat);
    console.log(geolong);
    console.log(url);
    console.log('weathertype ' + weatherType);
}

function reloadCity() {
    loadCity();
    clouds = [];
    currentcloudpush = 0;
}

function onPause() {
    clouds = [];
    raindrops = [];
    clouds = [];
    clearInterval(cloudPush);
    clearInterval(raindropPush);
    clearInterval(snowflakePush);
}

function onResume() {
    clouds = [];
    raindrops = [];
    clouds = [];
}


function loadTimeatlocation(lon, lat, weatherTime) {
    var Gkey = '&key=AIzaSyBhAMl015DtFzNWm-jFGE2zqHqVMPmungg';
    var timeurl = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lon + '&timestamp=' + weatherTime + '&key=' + Gkey;
    loadJSON(timeurl, calclocaltime);
}


function calclocaltime(timedata) {
    var usertime = weatherTime;
    var localtime = timedata.rawOffset;
    time = new Date((usertime + localtime)*1000);
    hours = time.getHours();
    hours = hours - 3;
}