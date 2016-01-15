function preload(){standardFont=loadFont("../fonts/Cof.ttf");for(var e=0;weathericonsAmount>e;e++)weathericon[e]=loadImage("../images/weather"+e+".png");for(var e=0;3>e;e++)cloudicons[e]=loadImage("../images/clouds"+e+".png")}function setup(){var e=createCanvas(windowWidth,windowHeight);e.position(0,0),fill(255),textFont(standardFont),textSize(48),formCity=select("#formCity"),clearbutton=select(".clearbutton"),clearbutton.mousePressed(clearPressed),loadJSON(url,gotData,"jsonp"),setInterval(loadInt,1e5),setInterval(raindropPush,400),setInterval(snowflakePush,400),cloudPush(),setInterval(cloudPush,5e3),weerbeerPush(),setInterval(weerbeerPush,1250),setTimeout(backgroundColorCalculator,1250),tempColorMappedR=200,tempColorMappedR=200,tempColorMappedR=200,keyPressed()}function draw(){if(background(tempColorMappedR,tempColorMappedG,tempColorMappedB),weatherData){for(var e=clouds.length-1;e>0;e--)clouds[e].update(),clouds[e].display(),clouds[e].lifespancheck()&&clouds.splice(e,1);weerbeer.display(),temperaturePush();for(var e=raindrops.length-1;e>0;e--)raindrops[e].update(),raindrops[e].display(),raindrops[e].lifespancheck()&&raindrops.splice(e,1);for(var e=snowflakes.length-1;e>0;e--)snowflakes[e].update(),snowflakes[e].display(),snowflakes[e].lifespancheck()&&snowflakes.splice(e,1)}}function keyPressed(){keyCode===ENTER&&reloadCity()}function clearPressed(){formCity.value("")}function backgroundColorCalculator(){return tempColorMappedR=26,tempColorMappedG=35,tempColorMappedB=38,tempColorMappedR;return tempColorMappedG;return tempColorMappedB}function temperaturePush(){push(),textAlign(CENTER),text(floor(temperature)+"*C",windowWidth/2,windowHeight-100),pop()}function loadInt(){loadJSON(url,gotData,"jsonp")}function loadCity(){url=baseurl+formCity.value()+type+mode+appid+unit+lang,loadJSON(url,gotData,"jsonp")}function gotData(e){weatherData=e,windSpeed=1.2*e.list[0].wind.speed,city=e.city.name,country=e.city.country;var t=round(e.city.coord.lon),i=round(e.city.coord.lat);console.log(t+", "+i),formCity.value(city+", "+country),e.list[0].rain?(amountRain=e.list[0].rain["3h"],amountRain=round(200*amountRain)):amountRain=0,e.list[0].snow?(amountSnow=e.list[0].snow["3h"],amountSnow=round(200*amountSnow)):amountSnow=0,temperature=e.list[0].main.temp,tempColor=e.list[0].main.temp,weatherType=e.list[0].weather[0].id}function reloadCity(){loadCity(),clouds=[]}function raindropPush(){var e=-(.15*windowWidth),t=windowWidth-.15*windowWidth;raindrops.length<amountRain&&raindrops.push(new Raindrop(random(e,t),random(-windowHeight/4,0),round(random(100,windowHeight/2))))}function Raindrop(e,t,i){this.x=e,this.y=t,this.radius=50,this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(121,219,226,this.lifespan),beginShape(),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x+10,this.y),curveVertex(this.x+12,this.y+16),curveVertex(this.x+5,this.y+22),curveVertex(this.x-2,this.y+16),curveVertex(this.x,this.y),curveVertex(this.x+5,this.y-5),curveVertex(this.x,this.y),endShape(CLOSE),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.01},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function snowflakePush(){var e=-(.15*windowWidth),t=windowWidth-.15*windowWidth;snowflakes.length<amountSnow&&snowflakes.push(new Snowflake(random(e,t),random(-windowHeight/8,0),round(random(10,windowHeight/2))))}function Snowflake(e,t,i){this.x=e,this.y=t,this.radius=random(10,25),this.lifespan=i,this.windmovementX=windSpeed/10,this.windmovementY=windSpeed/2,this.raindropRotator=-HALF_PI/10,this.display=function(){push(),rotate(this.raindropRotator),noStroke(),fill(255,this.lifespan),ellipse(this.x,this.y,this.radius,this.radius),pop()},this.update=function(){this.x=this.x+this.windmovementX,this.y=this.y+this.windmovementY,this.lifespan--,this.windmovementY=this.windmovementY+.001},this.lifespancheck=function(){return this.lifespan<0?!0:!1}}function cloudPush(){var e=-(windowWidth/4),t=-50,i=windowWidth/500,o=1+i;cloudpicker=floor(random(2)),clouds.length<o&&clouds.push(new Cloud(random(e,t),random(.45*windowHeight,.625*windowHeight),round(random(10,100)),cloudpicker))}function Cloud(e,t,i,o){this.x=e,this.y=t,this.lifespan=i,this.radius=100,this.width=150,this.height=120,this.windSpeedMotion=windSpeed/2,this.windowRatioSpeed=windowWidth/100,this.windmovementX=this.windSpeedMotion/this.windowRatioSpeed,this.fadeInX=0,this.fadeOutX=windowWidth,this.display=function(){push(),imageMode(CENTER),image(cloudicons[o],this.x,this.y,this.width,this.height),pop()},this.update=function(){this.x=this.x+this.windSpeedMotion,this.x<this.fadeInX&&(this.lifespan+=.5),this.x>this.fadeOutX&&this.lifespan--},this.lifespancheck=function(){return this.lifespan<=0?!0:!1}}function weerbeerPush(){var e=windowWidth/2,t=windowHeight/2;weerbeer=new Weerbeer(e,t)}function Weerbeer(e,t){this.x=e,this.y=t,this.radius=500,this.fillColor=255,this.display=function(){imageMode(CENTER),weatherType>=200&&300>weatherType&&(push(),noStroke(),fill(this.fillColor-100),ellipse(this.x,this.y,this.radius,this.radius),pop()),weatherType>=300&&400>weatherType&&(console.log("drizzle"),push(),rectMode(CENTER),noStroke(),fill(this.fillColor,120,200),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=500&&600>weatherType&&image(weathericon[2],this.x,this.y,this.radius,1.4*this.radius),weatherType>=600&&700>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),weatherType>=700&&800>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,255,255),rect(this.x,this.y,this.radius,this.radius),pop()),800==weatherType&&image(weathericon[1],this.x,this.y),weatherType>=801&&900>weatherType&&(push(),rectMode(CENTER),noStroke(),fill(this.fillColor,76,255),ellipse(this.x,this.y,this.radius,this.radius),pop(),console.log("clouds")),weatherType>=900&&(push(),rectMode(CENTER),noStroke(),fill(0,0,0),ellipse(this.x,this.y,this.radius,this.radius),pop())}}function windowResized(){resizeCanvas(windowWidth,windowHeight)}var baseurl="http://api.openweathermap.org/data/2.5/forecast?q=",city="Amsterdam, NL",type="&type=like",mode="JSON",appid="&appid=2de143494c0b295cca9337e1e96b00e0",lang="&lang=en",unit="&units=metric",url=baseurl+city+type+mode+appid+unit+lang,weatherData,windSpeed,amountRain,amountSnow,tempColor,temperature,weatherType,tempColorMappedR=0,tempColorMappedG=0,tempColorMappedB=0,raindrops=[],snowflakes=[],clouds=[],weerbeer,weathericon=[],weathericonsAmount=3,cloudicons=[],cloudpicker,direction=1,standardFont,buttonF,clearbutton,formCity;window.addEventListener("orientationchange",function(){windowResized(),raindrops=[],snowflakes=[],clouds=[],weerbeerPush(),temperaturePush()},!1);