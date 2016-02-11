//todo: error message in case mobile data is off

//var weather;
var baseurl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var city = 'Amsterdam, NL';
var country = 'NL';
var type = '&type=like';
var mode = 'JSON';
var appid = '&appid=ab756baaa116a71f8636682c58f7bb84';
var lang = '&lang=nl';
var unit = '&units=metric';
var url = baseurl+city+type+mode+appid+unit+lang;

//var geo 
var locationData;
var geolat;
var geolong;

//variables from API
var weatherData;
var windSpeed;
var amountRain;
var amountSnow;
var tempColor;
var temperature;
var weatherType;
var weatherDescription;

// variables for objects
var raindrops = [];
var snowflakes = [];
var clouds = [];
var weerbeer;
var weathericon = [];
var weathericonsAmount = 3;
var cloudicons =  [];
var cloudpicker;
var stars = [];


//variables for time
var timedata;
var nightorday;
var nightordayicon = [];
var weatherTime;
var date;
var hours;

var responsiveRatio;
var minRespL = 0.7;
var maxRespL = 1.0;
var minRespP = 0.55;
var maxRespP = 1.3;

//variables for ui
var outerpadding = 20;
var buttonSize = 40;

// variables for colors
var darkblue = [26,35,38];
var tomred = [206,79,58];
var tomyellow = [234,167,0];

//variables for DOM elements
var buttonF;
var clearbutton;
var formCity;

function setup() {
    var cnv = createCanvas (windowWidth, windowHeight);
    cnv.position (0,0);
	for (var i = 0; i < weathericonsAmount; i++) {
         weathericon[i] = loadImage('images/tomtypes/weather'+i+'.png');   
    }
    for (var i = 0; i < 3; i++) {
        cloudicons[i] = loadImage('images/clouds'+i+'.png');
    }
    for (var i = 0; i < 2; i++) {
        nightordayicon[i] = loadImage('images/nightorday'+i+'.png');
    }

    //   alleen voor testen in browser
    navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror, { timeout: 30000 });
    

    mobilesizes();
    setInterval(loadInt, 1000000);
    formCity = select('#formCity');
    responsiveScaleCalc();
    fill(255);
    clearbutton = select('.clearbutton');
    clearbutton.mousePressed(clearPressed);
    setInterval(raindropPush, 400);
    setInterval(snowflakePush, 400);
    cloudPush();
    setInterval(cloudPush, 4000);
    weerbeerPush();
    setInterval(weerbeerPush, 5000);
    nightordayPush();
    starsbynightPush();
//    setInterval(nightordayPush, 5000);
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    keyPressed();   
}

function draw() {
    background(darkblue);

    if (weatherData) {
        nightorday.display();
        for (var i = 0; i < stars.length; i++) {
            stars[i].display();   
            stars[i].update();
        }

        for (var i = clouds.length-1; i  > 0; i--) {
            clouds[i].update();
            clouds[i].display();
        
            if (clouds[i].lifespancheck()) {
            clouds.splice(i,1);
            }
        }
        weerbeer.display();
        temperaturePush();

        for (var i = raindrops.length-1; i  > 0; i--) {
            raindrops[i].update();
            raindrops[i].display();
        
            if (raindrops[i].lifespancheck()) {
            raindrops.splice(i,1);
            }
        }
        for (var i = snowflakes.length-1; i  > 0; i--) {
            snowflakes[i].update();
            snowflakes[i].display();
        
            if (snowflakes[i].lifespancheck()) {
            snowflakes.splice(i,1);
            }
        }
    }   
    push();
    ellipseMode(CENTER);
    fill(tomred);
    noStroke();
    ellipse(windowWidth - outerpadding*2, windowHeight - outerpadding*2, buttonSize, buttonSize);
    fill(255);
    ellipse(outerpadding*2, windowHeight - outerpadding*2, buttonSize, buttonSize);
    pop();
}

function keyPressed() {
    if (keyCode === 13 ){
        reloadCity();
		document.activeElement.blur();
    }
}

function clearPressed() {
    formCity.value('');
	document.getElementById('formCity').focus();
}

function responsiveScaleCalc() {
        var responsiveScaler = (windowWidth/1000);
        if (windowWidth > windowHeight && windowWidth < 370 && windowHeight < 800){ //landscape
            responsiveScaler = (windowWidth/2000);     
            responsiveRatio = constrain (responsiveScaler, minRespL, maxRespL);    
        } else {
            responsiveScaler = (windowHeight/1000);    
            responsiveRatio = constrain (responsiveScaler, minRespP, maxRespP);
        }
        return responsiveRatio;
}

function mobilesizes() {
    if (windowWidth < 372) { 
        minRespP = 0.18; 
    }
    if (windowWidth > 760) {
        outerpadding = 30;
        buttonSize = 60;
    }
}

document.addEventListener("deviceready", function(){
    navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror, { timeout: 3000 });
    document.addEventListener("pause", onPause, false);
}, false);

