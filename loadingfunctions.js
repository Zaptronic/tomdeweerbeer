function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function loadCity() {
    url = baseurl+formCity.value()+mode+appid+unit+lang; 
    loadJSON(url, gotData, 'jsonp');
}

function gotData(data){
    weatherData = data;
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
//    console.log(amountRain); 
}

function reloadCity() {
    loadCity();
    for (var i = clouds.length-1; i  > 0; i--) {
        clouds[i].updateWind();
    }
}
