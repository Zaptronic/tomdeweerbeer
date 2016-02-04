function setup(){var t=createCanvas(windowWidth,windowHeight);t.position(0,0),standardFont=loadFont("fonts/Cof.ttf");for(var e=0;weathericonsAmount>e;e++)weathericon[e]=loadImage("images/weather"+e+".png");for(var e=0;3>e;e++)cloudicons[e]=loadImage("images/clouds"+e+".png");for(var e=0;2>e;e++)nightordayicon[e]=loadImage("images/nightorday"+e+".png");formCity=select("#formCity"),navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity,currentlocationerror),responsiveScaleCalc(),fill(255),clearbutton=select(".clearbutton"),clearbutton.mousePressed(clearPressed),setInterval(raindropPush,400),setInterval(snowflakePush,400),cloudPush(),setInterval(cloudPush,5e3),weerbeerPush(),setInterval(weerbeerPush,1250),nightordayPush(),setInterval(nightordayPush,1250),tempColorMappedR=200,tempColorMappedR=200,tempColorMappedR=200,keyPressed()}function draw(){if(background(26,35,38),weatherData){for(var t=clouds.length-1;t>0;t--)clouds[t].update(),clouds[t].display(),clouds[t].lifespancheck()&&clouds.splice(t,1);weerbeer.display(),nightorday.display(),temperaturePush();for(var t=raindrops.length-1;t>0;t--)raindrops[t].update(),raindrops[t].display(),raindrops[t].lifespancheck()&&raindrops.splice(t,1);for(var t=snowflakes.length-1;t>0;t--)snowflakes[t].update(),snowflakes[t].display(),snowflakes[t].lifespancheck()&&snowflakes.splice(t,1)}}function keyPressed(){13===keyCode&&(reloadCity(),document.activeElement.blur())}function clearPressed(){formCity.value("")}function temperaturePush(){textFont(standardFont),textSize(textsizestandard),temperature=floor(temperature),text(temperature+"*C",32,windowHeight-60),textSize(textsizestandard/2),text(weatherDescription,32,windowHeight-32)}function responsiveScaleCalc(){var t=windowWidth/1e3;if(windowWidth>windowHeight&&windowWidth<990&&windowHeight<800){var t=windowWidth/2e3;responsiveRatio=constrain(t,minRespL,maxRespL)}else{var t=windowHeight/1e3;responsiveRatio=constrain(t,minRespP,maxRespP)}return responsiveRatio}function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function currentlocationtocurrentcity(t){var e="http://api.openweathermap.org/data/2.5/forecast?";geolat=t.coords.latitude,geolong=t.coords.longitude,console.log(geolat),console.log(geolong),url=e+"lat="+geolat+"&lon="+geolong+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp"),setInterval(loadInt,5e5)}function currentlocationerror(t){switch(t.code){case t.PERMISSION_DENIED:loadInt();break;case t.POSITION_UNAVAILABLE:loadInt();break;case t.PERMISSION_DENIED_TIMEOUT:loadInt();break;case t.UNKNOWN_ERROR:loadInt()}}function gotData(t){weatherData=t,city=t.city.name,country=t.city.country,lon=t.city.coord.lon,lat=t.city.coord.lat,formCity.value(city+", "+country),windSpeed=1.2*t.list[0].wind.speed,t.list[0].rain?(amountRain=t.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,t.list[0].snow?(amountSnow=t.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=t.list[0].main.temp,tempColor=t.list[0].main.temp,weatherType=t.list[0].weather[0].id,weatherDescription=t.list[0].weather[0].description,weatherTime=t.list[0].dt,loadTimeatlocation(lon,lat,weatherTime)}function reloadCity(){loadCity(),clouds=[]}function loadTimeatlocation(t,e,i){var o="&key=AIzaSyARQPqPeZ3TQLPE0FLqh3TAezFnGw_I9xA",n="https://maps.googleapis.com/maps/api/timezone/json?location="+e+","+t+"&timestamp="+i+"&key="+o;loadJSON(n,calclocaltime)}function calclocaltime(t){var e=weatherTime,i=t.rawOffset;time=new Date(1e3*(e+i)),hours=time.getHours(),console.log(i),console.log(e),console.log(time),hours-=3}function weerbeerPush(){var t=windowWidth/2,e=850,i=e*responsiveRatio,o=ceil(windowHeight-i/2);weerbeer=new Weerbeer(t,o,i)}function Weerbeer(t,e,i){this.x=t,this.y=e,this.radius=i,this.fillColor=255,this.display=function(){imageMode(CENTER),weatherType>=200&&300>weatherType&&(push(),noStroke(),fill(this.fillColor-100),ellipse(this.x,this.y,this.radius,this.radius),pop()),weatherType>=300&&400>weatherType&&(console.log("drizzle"),push(),rectMode(CENTER),noStroke(),fill(this.fillColor,120,200),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=500&&600>weatherType&&(console.log("rain"),image(weathericon[0],this.x,this.y,this.radius,this.radius)),weatherType>=600&&700>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=700&&800>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),800==weatherType&&image(weathericon[1],this.x,this.y),weatherType>=801&&900>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,76,255),ellipse(this.x,this.y,this.radius,this.radius),pop(),console.log("clouds")),weatherType>=900&&(push(),rectMode(CENTER),noStroke(),fill(0,0,0),ellipse(this.x,this.y,this.radius,this.radius),pop())}}function raindropPush(){var t=-(.15*windowWidth),e=windowWidth-.15*windowWidth;raindrops.length<amountRain&&raindrops.push(new Raindrop(random(t,e),random(-windowHeight/4,0),round(random(100,windowHeight/2))))}function Raindrop(t,e,i){this.x=t,this.y=e,this.radius=50,this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(121,219,226,this.lifespan),beginShape(),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x+10,this.y),curveVertex(this.x+12,this.y+16),curveVertex(this.x+5,this.y+22),curveVertex(this.x-2,this.y+16),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x,this.y),endShape(CLOSE),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.01},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function snowflakePush(){var t=-(.15*windowWidth),e=windowWidth-.15*windowWidth;snowflakes.length<amountSnow&&snowflakes.push(new Snowflake(random(t,e),random(-windowHeight/8,0),round(random(10,windowHeight/2))))}function Snowflake(t,e,i){this.x=t,this.y=e,this.radius=random(10,25),this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(255,this.lifespan),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.001},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function cloudPush(){var t=-(windowWidth/4),e=-50,i=windowWidth/500,o=1+i;cloudpicker=floor(random(2)),clouds.length<o&&clouds.push(new Cloud(random(t,e),random(.45*windowHeight,.625*windowHeight),round(random(10,100)),cloudpicker))}function Cloud(t,e,i,o){this.x=t,this.y=e,this.lifespan=i,this.radius=100,this.width=150,this.height=120,this.windSpeedMotion=windSpeed/2,this.windowRatioSpeed=windowWidth/100,this.windmovementX=this.windSpeedMotion/this.windowRatioSpeed,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[o],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windSpeedMotion,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}function nightordayPush(){var t=windowWidth/2+windowWidth/3,e=windowHeight/5,i=120,o=i*responsiveRatio;nightorday=new Nightorday(t,e,o)}function Nightorday(t,e,i){this.x=t,this.y=e,this.size=i,this.display=function(){imageMode(CENTER),(hours>=0&&6>hours||hours>18&&23>=hours)&&image(nightordayicon[1],this.x,this.y,this.size,this.size),hours>=6&&18>=hours&&(push(),image(nightordayicon[0],this.x,this.y,this.size,this.size))}}function windowResized(){resizeCanvas(windowWidth,windowHeight),responsiveScaleCalc()}var baseurl="http://api.openweathermap.org/data/2.5/forecast?q=",city="Amsterdam, NL",country="NL",type="&type=like",mode="JSON",appid="&appid=9010cdbc3c106b77c2db30db4e547a9a",lang="&lang=nl",unit="&units=metric",url=baseurl+city+type+mode+appid+unit+lang,locationData,geolat,geolong,weatherData,windSpeed,amountRain,amountSnow,tempColor,temperature,weatherType,weatherDescription,raindrops=[],snowflakes=[],clouds=[],weerbeer,weathericon=[],weathericonsAmount=3,cloudicons=[],cloudpicker,timedata,nightorday,nightordayicon=[],weatherTime,date,hours,responsiveRatio,minRespL=.7,maxRespL=1,minRespP=.7,maxRespP=1.3,standardFont,textsizestandard=48,buttonF,clearbutton,formCity;window.addEventListener("orientationchange",function(){windowResized(),raindrops=[],snowflakes=[],clouds=[],weerbeerPush(),temperaturePush()},!1);