function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function loadCity() {
    url = baseurl+formCity.value()+type+mode+appid+unit+lang; 
    loadJSON(url, gotData, 'jsonp');
}

//function currentlocationtocurrentcity() {
//    var geolat = round(locationData.latitude);
//    var geolong = round(locationData.longitude);
//    print(locationData.latitude);
//    print(locationData.longitude);
//    var geourl = baseurl+'lat='+geolat+'&lon='+geolong+type+mode+appid+unit+lang;
//    loadJSON(geourl, gotData, 'jsonp');
////    loadJSON(geourl, geoCity, 'jsonp');
//        console.log(geourl);
//    
//}
function currentlocationtocurrentcity() {
    geolat = round(locationData.latitude);
    geolong = round(locationData.longitude);
    print(locationData.latitude);
    print(locationData.longitude);
    url = baseurl+'lat='+geolat+'&lon='+geolong+type+mode+appid+unit+lang;
    loadJSON(url, gotData, 'jsonp');
    console.log(url);
}

function gotData(data){
    console.log(data);
    weatherData = data;
    city = data.city.name;
    country = data.city.country;
    console.log(city + ', ' + country);
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
}

function reloadCity() {
    loadCity();
    clouds = [];
}
