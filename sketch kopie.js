//var weather;
var baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'reykjavik';
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
var raindroptest = [];

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
    
    for (var i = 0; i < 3; i++) {
            raindroptest[i] = new Raindrop(random(100,200), random(windowHeight/2,windowHeight/2+20));
    }        
}

function draw() {
    background(tempColorMappedR, tempColorMappedG, tempColorMappedB);
//    windSpeed = windSpeed + 1;
        console.log(windSpeed);   
    
    if (weatherData) {
        for (var i = raindroptest.length-1; i  > 0; i--) {
            raindroptest[i].update();
            raindroptest[i].display();
        
            if (raindroptest[i].lifespancheck()) {
            raindroptest.splice(i,1);
            }
        }
    }   
}

function raindropPush() {
    if (raindroptest.length < windSpeed) {
         raindroptest.push(new Raindrop(random(0,windowWidth), random(10,800)));      
    }
}

//single raindrop
function Raindrop(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.lifespan = 500;
    this.windmovement = windSpeed/2;
    
    this.display = function() {
        push();
        noStroke();
        ellipseMode(CENTER);
        fill(255, this.lifespan);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
    }
    
    this.update = function() {
        this.x = this.x + this.windmovement;
        this.y = this.y + 1;
        this.lifespan--;
//        console.log(this.lifespan);
    }
	this.lifespancheck = function() {
		 if (this.lifespan < 0) {
            return true;
         } else {
			return false;
		 }
	}
}

function loadInt() {
    loadJSON(url, gotData, 'jsonp');
}

function backgroundColorCalculator() {
    tempColorMappedR = round(map(hour(),0, 23, 0, 50));
    tempColorMappedG = tempColorMappedR;
    tempColorMappedB = round(map(tempColor,-20, 40, 0, 255));
    return tempColorMappedR;
    return tempColorMappedG;
    return tempColorMappedB;
}

function gotData(data){
    weatherData = data;
    windSpeed = data.wind.speed;
    amountRain = data.wind.speed;
    tempColor = data.main.temp;
    return windSpeed;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

//function createRain() {
//    var rain = [];
//    var raindropDistance = 20;
//    var lifeblock = sin(raindropDistance);
//
//    for (var i = 0; i < amountRain; i++){
//        rain[i] = [];
//        for (var j = 0; j < amountRain; j++){
//            push();
//            translate([i]+raindropDistance,raindistance, [j]+raindropDistance);
//            rain[i][j] = new Raindrop();
//            rain[i][j].display();
//            rain[i][j].update();
//            pop();
//
//            console.log(rain[i][j].lifespan);
//            
//            if (rain[i][j].lifespan < 0) {
////                rain.splice(j,10);
////                rain.splice(i,10);
////                rain[i][j].length = 0;
//                raindistance = 100;
//                rain[i][j].lifespan = 100;
//
//                
//            }
//        }
//    }
//        
//}