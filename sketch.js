//var weather;
var baseurl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var city = 'Amsterdam, NL';
var country = 'NL';
var type = '&type=like';
var mode = 'JSON';
var appid = '&appid=9010cdbc3c106b77c2db30db4e547a9a';
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
var minRespP = 0.7;
var maxRespP = 1.3;

// variables for typography
var standardFont;
var textsizestandard = 48;

//variables for DOM elements
var buttonF;
var clearbutton;
var formCity;

function preload() {
    console.log('1');
//    standardFont = loadFont("fonts/Cof.ttf");
    for (var i = 0; i < weathericonsAmount; i++) {
         weathericon[i] = loadImage('images/weather'+i+'.png');   
    }
    for (var i = 0; i < 3; i++) {
        cloudicons[i] = loadImage('images/clouds'+i+'.png');
    }
    for (var i = 0; i < 2; i++) {
        nightordayicon[i] = loadImage('images/nightorday'+i+'.png');
    }
}

function setup() {
    console.log('2');
    var cnv = createCanvas (windowWidth, windowHeight);
    cnv.position (0,0);
    formCity = select('#formCity');
console.log('3');
    if (navigator.geolocation) {
	   navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror);
    } else {
        loadInt();
        alert("Sorry, geolocation is not supported.");
    }
    
//    navigator.geolocation.getCurrentPosition(geolocationSuccess,
//                                         geolocationError);
//    
//    var onSuccess = function(position) {
//    alert('Latitude: '          + position.coords.latitude          + '\n' +
//          'Longitude: '         + position.coords.longitude         + '\n' +
//          'Altitude: '          + position.coords.altitude          + '\n' +
//          'Accuracy: '          + position.coords.accuracy          + '\n' +
//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//          'Heading: '           + position.coords.heading           + '\n' +
//          'Speed: '             + position.coords.speed             + '\n' +
//          'Timestamp: '         + position.timestamp                + '\n');
//};
//
//// onError Callback receives a PositionError object
////
//function onError(error) {
//    alert('code: '    + error.code    + '\n' +
//          'message: ' + error.message + '\n');
//}
//
//navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    console.log('4');
    responsiveScaleCalc();
    fill(255);
//    textFont(standardFont);
    textSize(textsizestandard);
    clearbutton = select('.clearbutton');
    clearbutton.mousePressed(clearPressed);
//    buttonF = select('#buttonCity');
    setInterval(raindropPush, 400);
    setInterval(snowflakePush, 400);
    cloudPush();
    setInterval(cloudPush, 5000);
    weerbeerPush();
    setInterval(weerbeerPush, 1250);
    nightordayPush();
    setInterval(nightordayPush, 1250);
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    keyPressed();
    
//    for (var i = clouds.length-1; i > 0; i--) {
//        clouds[i].randomizer();
//    }

//    for (var i = 0; i < 3; i++) {
////            raindrops[i] = new Raindrop(random(100,200), random(windowHeight/2,windowHeight/2+20));
////        
//        
//    }        
}

function draw() {
    background(26,35,38);

    if (weatherData) {
        for (var i = clouds.length-1; i  > 0; i--) {
            clouds[i].update();
            clouds[i].display();
        
            if (clouds[i].lifespancheck()) {
            clouds.splice(i,1);
            }
        }
        weerbeer.display();
        nightorday.display();
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
}
function keyPressed() {
    if (keyCode === ENTER){
        reloadCity();
    }
}
function clearPressed() {
    formCity.value('');
}

function temperaturePush() {
//    push();
    temperature = floor(temperature);
    text(temperature + '*' + 'C', 32,windowHeight-60);
//    pop();
//    push();
    textSize(textsizestandard/2);
    text(weatherDescription, 32, windowHeight-32);
//    pop();
}
function responsiveScaleCalc() {
        var responsiveScaler = (windowWidth/1000);
        if (windowWidth > windowHeight && windowWidth < 990 && windowHeight < 800){ //landscape
            var responsiveScaler = (windowWidth/2000);     
            responsiveRatio = constrain (responsiveScaler, minRespL, maxRespL);    
        } else {
            var responsiveScaler = (windowHeight/1000);    
            responsiveRatio = constrain (responsiveScaler, minRespP, maxRespP);
        }
        return responsiveRatio;
}
