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
    rect(windowWidth/2, windowHeight/2, 50,50);
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

function raindropPush() {
    var rainPosxA = windowWidth * 0.1;
    var rainPosxB = windowWidth - (windowWidth * 0.25);
    
    if (raindrops.length < amountRain) {
         raindrops.push(new Raindrop(random(rainPosxA,rainPosxB), random(-windowHeight/4,0), round(random(100,windowHeight/2))));     
        //call color function in raindrop in for loop 
        //raindrop[i].pickcolor bv
    }
}

//single raindrop
function Raindrop(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/10;
    this.windmovementY = windSpeed/2;
    this.raindropRotator = -HALF_PI/10;
    
    this.display = function() {
        push();
//        translate(-300,-200);
        rotate(this.raindropRotator);
        noStroke();
        fill(255, this.lifespan);

//        beginShape();
//        curveVertex(this.x,  this.y);
//        curveVertex(this.x+10,  this.y-10);
//        curveVertex(this.x+20,  this.y);
//        curveVertex(this.x+25,  this.y+25);
//        curveVertex(this.x+10,  this.y+35);    
//        curveVertex(this.x-5,   this.y+25);
//        curveVertex(this.x,   this.y);
//        curveVertex(this.x+10,   this.y-10);        
//        curveVertex(this.x,  this.y);
//        endShape(CLOSE);
        
        beginShape();
        curveVertex(this.x,  this.y);
        curveVertex(this.x+5,  this.y-5);
        curveVertex(this.x+10,  this.y);
        curveVertex(this.x+12,  this.y+16);
        curveVertex(this.x+5,  this.y+22);    
        curveVertex(this.x-2,   this.y+16);
        curveVertex(this.x,   this.y);
        curveVertex(this.x+5,   this.y-5);        
        curveVertex(this.x,  this.y);
        endShape(CLOSE);
//
//                fill(255,0,0);
//        text(this.x, this.x, this.y);
//        
        pop();

        
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        this.y = this.y + this.windmovementY;
        this.lifespan--;
        this.windmovementY = this.windmovementY + 0.01;
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


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}