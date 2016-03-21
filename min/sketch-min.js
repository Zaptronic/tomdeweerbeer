function setup(){var e=createCanvas(windowWidth,windowHeight);e.position(0,0);for(var t=0;weathericonsAmount>t;t++)weathericon[t]=loadImage("images/tomtypes/weather"+t+".png");for(var t=0;4>t;t++)cloudicons[t]=loadImage("images/clouds/clouds"+t+".png");for(var t=0;2>t;t++)nightordayicon[t]=loadImage("images/nightorday"+t+".png");timer1=new TimerObject(0,100,32,windowHeight-32),timer1.counterclock(),mobilesizes(),responsiveScaleCalc(),fill(255),errorpage=select(".errorpage"),setInterval(loadInt,1e9),forminit(),setInterval(raindropPush,400),setInterval(snowflakePush,400),weerbeerPush(),setInterval(weerbeerPush,5e3),nightordayPush(),starsbynightPush(),keyPressed()}function draw(){if(background(darkblue),weatherData){errorpage.hide(),nightorday.display(),timer1.counter()%10==0&&800!=weatherType&&cloudPush();for(var e=0;e<stars.length;e++)stars[e].display(),stars[e].update();for(var e=clouds.length-1;e>0;e--)clouds[e].update(),clouds[e].display(),clouds[e].lifespancheck()&&clouds.splice(e,1);weerbeer.display(),temperaturePush();for(var e=raindrops.length-1;e>0;e--)raindrops[e].update(),raindrops[e].display(),raindrops[e].lifespancheck()&&raindrops.splice(e,1);for(var e=snowflakes.length-1;e>0;e--)snowflakes[e].update(),snowflakes[e].display(),snowflakes[e].lifespancheck()&&snowflakes.splice(e,1)}weatherData||error(),push(),ellipseMode(CENTER),fill(tomred),noStroke(),ellipse(windowWidth-2*outerpadding,windowHeight-2*outerpadding,buttonSize,buttonSize),fill(255),ellipse(2*outerpadding,windowHeight-2*outerpadding,buttonSize,buttonSize),pop()}function responsiveScaleCalc(){var e=windowWidth/1e3;return windowWidth>windowHeight&&windowWidth<370&&windowHeight<800?(e=windowWidth/2e3,responsiveRatio=constrain(e,minRespL,maxRespL)):(e=windowHeight/1e3,responsiveRatio=constrain(e,minRespP,maxRespP)),responsiveRatio}function mobilesizes(){windowWidth<372&&(minRespP=.18),windowWidth>760&&(outerpadding=30,buttonSize=60)}function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function currentlocationtocurrentcity(e){var t="http://api.openweathermap.org/data/2.5/forecast?";geolat=e.coords.latitude,geolong=e.coords.longitude,url=t+"lat="+geolat+"&lon="+geolong+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function currentlocationerror(e){console.log("error:",e),loadInt()}function gotData(e){weatherData=e,city=e.city.name,country=e.city.country,lon=e.city.coord.lon,lat=e.city.coord.lat,formCity.value(city+", "+country),windSpeed=e.list[0].wind.speed?e.list[0].wind.speed:1,e.list[0].rain?(amountRain=e.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,e.list[0].snow?(amountSnow=e.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=e.list[0].main.temp,tempColor=e.list[0].main.temp,weatherType=e.list[0].weather[0].id,weatherDescription=e.list[0].weather[0].description,weatherTime=e.list[0].dt,loadTimeatlocation(lon,lat,weatherTime),console.log(geolat),console.log(geolong),console.log(url),console.log("weathertype "+weatherType)}function reloadCity(){loadCity(),clouds=[],currentcloudpush=0}function onPause(){clouds=[],raindrops=[],clouds=[],clearInterval(cloudPush),clearInterval(raindropPush),clearInterval(snowflakePush)}function onResume(){clouds=[],raindrops=[],clouds=[]}function loadTimeatlocation(e,t,i){var o="&key=AIzaSyBhAMl015DtFzNWm-jFGE2zqHqVMPmungg",r="https://maps.googleapis.com/maps/api/timezone/json?location="+t+","+e+"&timestamp="+i+"&key="+o;loadJSON(r,calclocaltime)}function calclocaltime(e){var t=weatherTime,i=e.rawOffset;time=new Date(1e3*(t+i)),hours=time.getHours(),hours-=3}function TimerObject(e,t,i,o){this.x=i,this.y=o,this.interval=t,this.display=function(){text("timer: "+e,this.x,this.y)},this.update=function(){e++},this.counterclock=function(){setInterval(this.update,this.interval)},this.counter=function(){return e;console.log("hit")}}function debug(){push(),fill(255,0,0),textSize(24),timer1.display(),pop(),push(),fill(255,0,0),textSize(64);var e=floor(frameRate());text(e,32,windowHeight-64),pop()}function weerbeerPush(){var e=windowWidth/2,t=1050,i=t*responsiveRatio,o=ceil(windowHeight-i/2);weerbeer=new Weerbeer(e,o,i)}function Weerbeer(e,t,i){this.x=e,this.y=t,this.radius=i,this.fillColor=255,this.display=function(){imageMode(CENTER),weatherType>=200&&300>weatherType&&(push(),noStroke(),fill(this.fillColor-100),ellipse(this.x,this.y,this.radius,this.radius),pop()),weatherType>=300&&400>weatherType&&(console.log("drizzle"),push(),rectMode(CENTER),noStroke(),fill(this.fillColor,120,200),rect(this.x,this.y,this.radius,this.radius),pop()),(weatherType>=500&&501>=weatherType||weatherType>=516&&521>=weatherType)&&image(weathericon[0],this.x,this.y,this.radius,this.radius),(weatherType>=502&&515>=weatherType||weatherType>=522)&&image(weathericon[3],this.x,this.y,this.radius,this.radius),weatherType>=600&&700>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=700&&800>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),800==weatherType&&temperature>0&&(push(),image(weathericon[1],this.x,this.y,this.radius,this.radius),pop()),weatherType>=801&&900>weatherType&&(push(),image(weathericon[2],this.x,this.y,this.radius,this.radius),pop()),weatherType>=900&&(push(),rectMode(CENTER),noStroke(),fill(0,0,0),ellipse(this.x,this.y,this.radius,this.radius),pop())}}function raindropPush(){var e=-(.15*windowWidth),t=windowWidth-.15*windowWidth;raindrops.length<amountRain&&raindrops.push(new Raindrop(random(e,t),random(-windowHeight/4,0),round(random(100,windowHeight/2))))}function Raindrop(e,t,i){this.x=e,this.y=t,this.radius=50,this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(121,219,226,this.lifespan),beginShape(),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x+10,this.y),curveVertex(this.x+12,this.y+16),curveVertex(this.x+5,this.y+22),curveVertex(this.x-2,this.y+16),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x,this.y),endShape(CLOSE),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.01},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function snowflakePush(){var e=-(.15*windowWidth),t=windowWidth-.15*windowWidth;snowflakes.length<amountSnow&&snowflakes.push(new Snowflake(random(e,t),random(-windowHeight/8,0),round(random(10,windowHeight/2))))}function Snowflake(e,t,i){this.x=e,this.y=t,this.radius=random(10,25),this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(255,this.lifespan),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.001},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function cloudpushControl(){return 50>currentcloudpush?currentcloudpush++:currentcloudpush=currentcloudpush,5>=currentcloudpush?!0:!1}function cloudPush(){var e=[-120,-240,-360],t=floor(random(e.length)),i=e[t],o=[.4*windowHeight,.5*windowHeight,.6*windowHeight],r=floor(random(o.length)),s=o[r],n=round(random(10,80)),a=windowWidth/100,h=round(a);cloudpicker=floor(random(4)),clouds.length<=h&&weatherData&&0==cloudpushControl()?second()%2==0&&random(1e3)<50&&clouds.push(new Cloud(i,s,n,cloudpicker)):clouds.length<=h&&weatherData&&1==cloudpushControl()&&clouds.push(new Cloud(i,s,n,cloudpicker))}function Cloud(e,t,i,o){this.x=e,this.y=t,this.lifespan=i,this.width=120*responsiveRatio,this.height=96*responsiveRatio,this.windSpeedMotion=map(windSpeed,0,32.7,1,6),this.windmovementX=this.windSpeedMotion,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[o],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}function temperaturePush(){fill(0),temperature=floor(temperature);var e=select(".omschrijving",".weeromschrijving"),t=select(".temperatuur",".weeromschrijving");e.html(weatherDescription),t.html(temperature+"*C")}function nightordayPush(){var e=.85*windowWidth,t=.2*windowHeight,i=80,o=i*responsiveRatio;nightorday=new Nightorday(e,t,o)}function Nightorday(e,t,i){this.x=e,this.y=t,this.size=i,this.display=function(){imageMode(CENTER),(hours>=-3&&6>hours||hours>18&&23>=hours)&&image(nightordayicon[1],this.x,this.y,this.size,this.size),hours>=6&&18>=hours&&image(nightordayicon[0],this.x,this.y,this.size,this.size)}}function starsbynightPush(){for(var e=[.73,.82,.93,.225,.1],t=[.17,.3,.28,.31,.26],i=[4,8,4,6,4],o=[90,60,20,120,70],r=0;r<i.length;r++)stars.push(new Starbynight(e[r],t[r],i[r],o[r]))}function Starbynight(e,t,i,o){this.x=e,this.y=t,this.innerRadius=i*responsiveRatio,this.outerRadius=2*i,this.starbrightness=o,this.starbrightnessSpeed=1,this.display=function(){if(hours>=-3&&6>hours||hours>18&&23>=hours){noStroke();for(var e=0;e<stars.length;e++)push(),fill(234,167,0,this.starbrightness),translate(width*this.x,height*this.y),rotate(frameCount/-150),star(0,0,this.innerRadius,this.outerRadius,5),pop()}if(hours>=6&&18>=hours){var t=20,i=15,o=.56*windowHeight;noStroke(),push(),fill(255,5),translate(-20,0),beginShape(),curveVertex(-10,o),curveVertex(-10,o-i),curveVertex(.25*windowWidth,o),curveVertex(.5*windowWidth,o-i),curveVertex(.75*windowWidth,o),curveVertex(1.25*windowWidth,o-i),curveVertex(1.5*windowWidth,o-i),curveVertex(1.5*windowWidth,o+t+.7*i),curveVertex(1.25*windowWidth,o+t+i),curveVertex(.75*windowWidth,o+t),curveVertex(.5*windowWidth,o+t+.7*i),curveVertex(.25*windowWidth,o+t),curveVertex(-10,o+t+.7*i),curveVertex(-10,o),endShape(),pop()}},this.update=function(){this.starbrightness=this.starbrightness+this.starbrightnessSpeed,this.brightnesscheck()?this.starbrightnessSpeed=1*this.starbrightnessSpeed:this.starbrightnessSpeed=-1*this.starbrightnessSpeed},this.brightnesscheck=function(){return this.starbrightness>20&&this.starbrightness<150?!0:!1}}function star(e,t,i,o,r){var s=TWO_PI/r,n=s/2;beginShape();for(var a=0;a<TWO_PI;a+=s){var h=e+cos(a)*o,u=t+sin(a)*o;vertex(h,u),h=e+cos(a+n)*i,u=t+sin(a+n)*i,vertex(h,u)}endShape(CLOSE)}function error(){errorpage.show();var e=select(".retry");e.mousePressed(loadInt)}function forminit(){formCity=select("#formCity"),searchform=select(".searchform"),searchpage=select(".searchpage"),submitbutton=select(".submitbutton"),clearbutton=select(".clearbutton"),formCity.mousePressed(enterFormfield),clearbutton.mousePressed(clearPressed),submitbutton.mousePressed(submitPressed)}function enterFormfield(){addsearchpage()}function clearPressed(){formCity.value(null),addsearchpage()}function keyPressed(e){if(13===keyCode)if(checkform())reloadCity(),document.activeElement.blur(),removesearchpage();else if(!checkform())return e.preventDefault(),!1}function submitPressed(){checkform()&&(reloadCity(),document.activeElement.blur(),removesearchpage())}function addsearchpage(){1>searchpagecounter&&(searchpage.addClass("searchpage__show"),searchpagecounter++),1>clearbuttoncounter&&(clearbutton.addClass("clearbutton__hide"),clearbutton.removeClass("clearbutton__show"),clearbuttoncounter++)}function removesearchpage(){searchpagecounter=0,clearbuttoncounter=0,searchpage.addClass("searchpage__transout"),searchpage.removeClass("searchpage__show"),setTimeout(removetransout,640),setTimeout(clearbuttonOut,640)}function removetransout(){searchpage.removeClass("searchpage__transout")}function clearbuttonOut(){clearbutton.removeClass("clearbutton__hide"),clearbutton.addClass("clearbutton__show")}function resetForm(e){e.myButton.disabled=!1,e.myButton.value="Submit"}function checkform(){var e=formCity.value();return""==e?(console.log("checkform false"),!1):(console.log("checkform true"),!0)}function windowResized(){resizeCanvas(windowWidth,windowHeight),responsiveScaleCalc()}var baseurl="http://api.openweathermap.org/data/2.5/forecast?q=",city="Amsterdam, NL",country="NL",type="&type=like",mode="JSON",appid="&appid=ab756baaa116a71f8636682c58f7bb84",lang="&lang=nl",unit="&units=metric",url=baseurl+city+type+mode+appid+unit+lang,locationData,geolat,geolong,weatherData,windSpeed,amountRain,amountSnow,tempColor,temperature,weatherType,weatherDescription,raindrops=[],snowflakes=[],clouds=[],weerbeer,weathericon=[],weathericonsAmount=4,cloudicons=[],cloudpicker,stars=[],timedata,nightorday,nightordayicon=[],weatherTime,date,hours,responsiveRatio,minRespL=.7,maxRespL=1,minRespP=.55,maxRespP=1.3,outerpadding=20,buttonSize=40,darkblue=[26,35,38],tomred=[206,79,58],tomyellow=[234,167,0],buttonF,clearbutton,formCity,searchform,searchpage,errorpage,timer1;document.addEventListener("deviceready",function(){navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity,currentlocationerror,{timeout:3e4})},!1);var currentcloudpush=0,searchpagecounter=0,clearbuttoncounter=0;window.addEventListener("orientationchange",function(){windowResized(),raindrops=[],snowflakes=[],clouds=[],weerbeerPush(),temperaturePush()},!1);