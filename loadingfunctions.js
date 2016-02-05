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
    console.log(geolat);
    console.log(geolong);
    url = geobaseurl+'lat='+geolat+'&lon='+geolong+type+mode+appid+unit+lang;
    loadJSON(url, gotData, 'jsonp');
    setInterval(loadInt, 500000);
        console.log(url);
}

function currentlocationerror(error) {
	switch (error.code)
	{
		case error.PERMISSION_DENIED:
            loadInt();
			break;
		case error.POSITION_UNAVAILABLE:
            loadInt();
			break;
		case error.PERMISSION_DENIED_TIMEOUT:
            loadInt();
			break;
		case error.UNKNOWN_ERROR:
            loadInt();
			break;
	}
}

function gotData(data){
    weatherData = data;
    city = data.city.name;
    country = data.city.country;
    lon = data.city.coord.lon;
    lat = data.city.coord.lat;
//    console.log(city + ', ' + country);
//    console.log(lon + ', ' + lat);
    formCity.value(city + ', ' + country);
    
    windSpeed = data.list[0].wind.speed*1.2;
    
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
}

function reloadCity() {
    loadCity();
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
        console.log(localtime);
        console.log(usertime);
        console.log(time);
    hours = hours - 3; //correction for weather +3 hour prediction
    //01:00 -3 is not 22:00
    //calculation bug
}