function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function loadCity() {
    url = baseurl+formCity.value()+type+mode+appid+unit+lang; 
    loadJSON(url, gotData, 'jsonp');
}

function currentlocationtocurrentcity(pos) {
    var geobaseurl = 'http://api.openweathermap.org/data/2.5/forecast?';
    geolat = pos.coords.latitude;
    geolong = pos.coords.longitude;
    url = geobaseurl+'lat='+geolat+'&lon='+geolong+type+mode+appid+unit+lang;
    loadJSON(url, gotData, 'jsonp');
    setInterval(loadInt, 500000); 
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
    console.log(city + ', ' + country);
//    console.log(lon + ', ' + lat);
    console.log(lon);
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
    convertTimestamp(weatherTime);
    console.log(hours);
    console.log(data);
}

function reloadCity() {
    loadCity();
    clouds = [];
}

function convertTimestamp(weatherTime) {
    console.log(weatherTime);
//    date = new Date(weatherTime * 1000),	// Convert the passed timestamp to milliseconds
//		yyyy = date.getFullYear(),
//		mm = ('0' + (date.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
//		dd = ('0' + date.getDate()).slice(-2),			// Add leading 0.
//		hh = date.getHours(),
//		hours = hh,
//		min = ('0' + date.getMinutes()).slice(-2);
    
    date = new Date(weatherTime * 1000); // Convert the passed timestamp to milliseconds
        console.log(date);
//    var iso = date.toISOString().match(/(\d{2}:\d{2}:\d{2})/);
    hours = date.getHours();
        console.log(hours);
	// ie: 2013-02-18, 8:35 AM	
//	time = yyyy + '-' + mm + '-' + dd + ', ' + hours + ':' + min;
//    hours = hh;

	return date;
}

function loadTimeatlocation(lon, lat, weatherTime) {
    var Gkey = '&key=AIzaSyARQPqPeZ3TQLPE0FLqh3TAezFnGw_I9xA';
    var timeurl = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lon + '&timestamp=' + weatherTime + '&key=' + Gkey;
    loadJSON(timeurl, currentlocationerror,'jsonp');
    console.log(timeurl);
}