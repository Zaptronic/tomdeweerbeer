function preload(){standardFont=loadFont("../fonts/Cof.ttf");for(var t=0;weathericonsAmount>t;t++)weathericon[t]=loadImage("../images/weather"+t+".png");for(var t=0;3>t;t++)cloudicons[t]=loadImage("../images/clouds"+t+".png")}function setup(){var t=createCanvas(windowWidth,windowHeight);t.position(0,0),fill(255),textFont(standardFont),textSize(48),formCity=select("#formCity"),clearbutton=select(".clearbutton"),clearbutton.mousePressed(clearPressed),loadJSON(url,gotData,"jsonp"),setInterval(loadInt,1e5),setInterval(raindropPush,400),setInterval(snowflakePush,400),cloudPush(),setInterval(cloudPush,5e3),weerbeerPush(),setInterval(weerbeerPush,1250),setTimeout(backgroundColorCalculator,1250),tempColorMappedR=200,tempColorMappedR=200,tempColorMappedR=200,keyPressed();for(var e=clouds.length-1;e>0;e--)clouds[e].randomizer()}function draw(){if(background(tempColorMappedR,tempColorMappedG,tempColorMappedB),weatherData){for(var t=clouds.length-1;t>0;t--)clouds[t].update(),clouds[t].display(),clouds[t].lifespancheck()&&clouds.splice(t,1);weerbeer.display(),temperaturePush();for(var t=raindrops.length-1;t>0;t--)raindrops[t].update(),raindrops[t].display(),raindrops[t].lifespancheck()&&raindrops.splice(t,1);for(var t=snowflakes.length-1;t>0;t--)snowflakes[t].update(),snowflakes[t].display(),snowflakes[t].lifespancheck()&&snowflakes.splice(t,1)}}function keyPressed(){keyCode===ENTER&&reloadCity()}function clearPressed(){formCity.value("")}function backgroundColorCalculator(){return tempColorMappedR=26,tempColorMappedG=35,tempColorMappedB=38,tempColorMappedR;return tempColorMappedG;return tempColorMappedB}function temperaturePush(){push(),textAlign(CENTER),text(floor(temperature)+"*C",windowWidth/2,windowHeight-100),pop()}function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function gotData(t){weatherData=t,windSpeed=1.2*t.list[0].wind.speed,city=t.city.name,country=t.city.country;var e=round(t.city.coord.lon),i=round(t.city.coord.lat);console.log(e+", "+i),formCity.value(city+", "+country),t.list[0].rain?(amountRain=t.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,t.list[0].snow?(amountSnow=t.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=t.list[0].main.temp,tempColor=t.list[0].main.temp,weatherType=t.list[0].weather[0].id}function reloadCity(){loadCity();for(var t=clouds.length-1;t>0;t--)clouds[t].updateWind()}function raindropPush(){var t=-(.15*windowWidth),e=windowWidth-.15*windowWidth;raindrops.length<amountRain&&raindrops.push(new Raindrop(random(t,e),random(-windowHeight/4,0),round(random(100,windowHeight/2))))}function Raindrop(t,e,i){this.x=t,this.y=e,this.radius=50,this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(121,219,226,this.lifespan),beginShape(),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x+10,this.y),curveVertex(this.x+12,this.y+16),curveVertex(this.x+5,this.y+22),curveVertex(this.x-2,this.y+16),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x,this.y),endShape(CLOSE),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.01},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function snowflakePush(){var t=-(.15*windowWidth),e=windowWidth-.15*windowWidth;snowflakes.length<amountSnow&&snowflakes.push(new Snowflake(random(t,e),random(-windowHeight/8,0),round(random(10,windowHeight/2))))}function Snowflake(t,e,i){this.x=t,this.y=e,this.radius=random(10,25),this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(255,this.lifespan),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.001},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function cloudPush(t){var e=-(windowWidth/4),i=-50,o=ceil(windowWidth/500),n=1+o;cloudpicker=floor(random(3)),clouds.length<n&&clouds.push(new Cloud(random(e,i),random(.45*windowHeight,.625*windowHeight),round(random(10,150)),cloudpicker))}function Cloud(t,e,i,o){this.x=t,this.y=e,this.lifespan=i,this.radius=100,this.width=150,this.height=120,this.windSpeedMotion=windSpeed/10,this.windowRatioSpeed=windowWidth/500,this.maxSpeed=2,this.windmovementX=constrain(this.windSpeedMotion+this.windowRatioSpeed,this.windSpeedMotion,this.maxSpeed),this.fadeInOpacity=0,this.fadeInX=windowWidth/2,this.fadeOutX=windowWidth/2+windowWidth/6,this.display=function(){push(),imageMode(CENTER),tint(255,this.fadeInOpacity),image(cloudicons[o],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.x<this.fadeInX&&(this.lifespan++,this.fadeInOpacity++),this.x>this.fadeOutX&&(this.lifespan--,this.fadeInOpacity--)},this.updateWind=function(){this.windmovementX=constrain(this.windSpeedMotion+this.windowRatioSpeed,this.windSpeedMotion,this.maxSpeed)},this.intersects=function(t){var e=dist(this.x,this.y,t.x,t.y);return e<this.radius+t.radius?!0:!1},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}function weerbeerPush(){var t=windowWidth/2,e=windowHeight/2;weerbeer=new Weerbeer(t,e)}function Weerbeer(t,e){this.x=t,this.y=e,this.radius=500,this.fillColor=255,this.display=function(){imageMode(CENTER),weatherType>=200&&300>weatherType&&(push(),noStroke(),fill(this.fillColor-100),ellipse(this.x,this.y,this.radius,this.radius),pop()),weatherType>=300&&400>weatherType&&(console.log("drizzle"),push(),rectMode(CENTER),noStroke(),fill(this.fillColor,120,200),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=500&&600>weatherType&&image(weathericon[2],this.x,this.y,this.radius,1.4*this.radius),weatherType>=600&&700>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=700&&800>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),800==weatherType&&image(weathericon[1],this.x,this.y),weatherType>=801&&900>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,76,255),ellipse(this.x,this.y,this.radius,this.radius),pop(),console.log("clouds")),weatherType>=900&&(push(),rectMode(CENTER),noStroke(),fill(0,0,0),ellipse(this.x,this.y,this.radius,this.radius),pop())}}function windowResized(){resizeCanvas(windowWidth,windowHeight)}var baseurl="http://api.openweathermap.org/data/2.5/forecast?q=",city="Amsterdam, NL",type="&type=like",mode="JSON",appid="&appid=2de143494c0b295cca9337e1e96b00e0",lang="&lang=en",unit="&units=metric",url=baseurl+city+type+mode+appid+unit+lang,weatherData,windSpeed,amountRain,amountSnow,tempColor,temperature,weatherType,tempColorMappedR=0,tempColorMappedG=0,tempColorMappedB=0,raindrops=[],snowflakes=[],clouds=[],weerbeer,weathericon=[],weathericonsAmount=3,cloudicons=[],cloudpicker,cloudtimer=[],direction=1,standardFont,buttonF,clearbutton,formCity;window.addEventListener("orientationchange",function(){windowResized(),raindrops=[],snowflakes=[],clouds=[],weerbeerPush(),temperaturePush()},!1);