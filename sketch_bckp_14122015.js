//var weather;
var baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'brussel';
var appid = '&appid=2de143494c0b295cca9337e1e96b00e0';
var lang = '&lang=nl'
var unit = '&units=metric';
var url = baseurl+city+appid+unit+lang;

//variables from API
var weatherData;
var windSpeed;
var amountRain;
var tempColor;

//variables for colors
var tempColorMappedR;
var tempColorMappedG;
var tempColorMappedB;

// variables for objects
var raindrops = [];

// variables for animation
var direction = 1; //unused


function setup() {
    var cnv = createCanvas (windowWidth, windowHeight);
    cnv.position (0,0);
    loadJSON(url, gotData, 'jsonp');
    setInterval(loadInt, 100000);
    setInterval(raindropPush, 100);
    setInterval(backgroundColorCalculator, 1000);
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    tempColorMappedR = 200;

//    for (var i = 0; i < 3; i++) {
//            raindrops[i] = new Raindrop(random(100,200), random(windowHeight/2,windowHeight/2+20));
//    }        
}

function draw() {
    background(tempColorMappedR, tempColorMappedG, tempColorMappedB);
//    windSpeed = windSpeed + 1;
    console.log(windSpeed);
        
    if (weatherData) {
        for (var i = raindrops.length-1; i  > 0; i--) {
            raindrops[i].update();
            raindrops[i].display();
        
            if (raindrops[i].lifespancheck()) {
            raindrops.splice(i,1);
            }
        }
    }   
}

function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function backgroundColorCalculator() {
    tempColorMappedR = round(map(hour(),0, 23, 0, 20));
    tempColorMappedG = tempColorMappedR;
    tempColorMappedB = round(map(tempColor,-20, 40, 0, 100));
    return tempColorMappedR;
    return tempColorMappedG;
    return tempColorMappedB;
}

function gotData(data){
    weatherData = data;
    windSpeed = data.wind.speed*1.2;
    amountRain = data.wind.speed*2;
    tempColor = data.main.temp;
    return windSpeed;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}