function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function currentlocationtocurrentcity(t){var o="http://api.openweathermap.org/data/2.5/forecast?";geolat=t.coords.latitude,geolong=t.coords.longitude,url=o+"lat="+geolat+"&lon="+geolong+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp"),setInterval(loadInt,5e5)}function currentlocationerror(t){switch(t.code){case t.PERMISSION_DENIED:loadInt();break;case t.POSITION_UNAVAILABLE:loadInt();break;case t.PERMISSION_DENIED_TIMEOUT:loadInt();break;case t.UNKNOWN_ERROR:loadInt()}}function gotData(t){weatherData=t,city=t.city.name,country=t.city.country,console.log(city+", "+country),formCity.value(city+", "+country),windSpeed=1.2*t.list[0].wind.speed,t.list[0].rain?(amountRain=t.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,t.list[0].snow?(amountSnow=t.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=t.list[0].main.temp,tempColor=t.list[0].main.temp,weatherType=t.list[0].weather[0].id,weatherDescription=t.list[0].weather[0].description,weatherTime=t.list[0].dt,convertTimestamp(weatherTime),console.log(hours),console.log(t)}function reloadCity(){loadCity(),clouds=[]}function convertTimestamp(t){console.log(t),date=new Date(1e3*t),console.log(date);var o=date.toISOString().match(/(\d{2}:\d{2}:\d{2})/);return alert(o[1]),hours=date.getHours(),console.log(hours),date}