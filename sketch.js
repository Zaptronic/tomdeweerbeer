//var weather;
var baseurl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var city = 'poznan';
var mode = 'JSON';
var appid = '&appid=2de143494c0b295cca9337e1e96b00e0';
var lang = '&lang=en'
var unit = '&units=metric';
var url = baseurl+city+mode+appid+unit+lang;
// land toevoegen aan city met land selectiebox/ land iccon? 
// button.mousepressed calls function with find and put it in an array with city and country then list them as text and then mousepressed an duse the value to chagne the global city value


//variables from API
var weatherData;
var windSpeed;
var amountRain;
var amountSnow;
var tempColor;
var temperature;
var weatherType;

//variables for colors
var tempColorMappedR = 0;
var tempColorMappedG = 0;
var tempColorMappedB = 0;

// variables for objects
var raindrops = [];
var snowflakes = [];
var weerbeer;
var weathericon = [];
var weathericonsAmount = 3;

// variables for animation
var direction = 1; //unused

// variables for typography
var standardFont;

//variables for DOM elements
var buttonF;
var formCity;

function preload() {
//    loadJSON(url); 
    standardFont = loadFont("../fonts/Cof.ttf");
    for (var i = 0; i < weathericonsAmount; i++) {
         weathericon[i] = loadImage('../images/weather'+i+'.png');   
    }
}

function setup() {
    var cnv = createCanvas (windowWidth, windowHeight);
    cnv.position (0,0);
//    cnv.parent("sketch");
    fill(255);
    textFont(standardFont);
    textSize(36);
    formCity = select('#formCity');
    buttonF = select('#buttonCity');
    buttonF.mousePressed(loadCity);
    loadJSON(url, gotData, 'jsonp'); 
    setInterval(loadInt, 100000);
    setInterval(raindropPush, 100);
    setInterval(snowflakePush, 100);
    weerbeerPush();
    setInterval(weerbeerPush, 1250);
    setTimeout(backgroundColorCalculator, 1250);
    tempColorMappedR = 200;
    tempColorMappedR = 200;
    tempColorMappedR = 200;


//    for (var i = 0; i < 3; i++) {
//            raindrops[i] = new Raindrop(random(100,200), random(windowHeight/2,windowHeight/2+20));
//    }        
}

function draw() {
    background(tempColorMappedR, tempColorMappedG, tempColorMappedB);
        keyPressed();
    
    if (weatherData) {
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
}
function keyPressed() {
    if (keyCode === ENTER){
        loadCity();
        console.log('enter');
    }
}

function backgroundColorCalculator() {
    tempColorMappedR = round(map(hour(),0, 23, 0, 20));
    tempColorMappedG = tempColorMappedR;
    tempColorMappedB = round(map(tempColor,-20, 40, 0, 100));
    return tempColorMappedR;
    return tempColorMappedG;
    return tempColorMappedB;
}

function temperaturePush() {
    push();
//    translate(width/6,-100);
//    rotate(210);
    text(floor(temperature), windowWidth/2,windowHeight-100);
    pop();
}