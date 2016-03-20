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
var errorpage;

//var currentcloudpusher = 0;

var timer1;

function setup() {
    var cnv = createCanvas (windowWidth, windowHeight);
    cnv.position (0,0);
	for (var i = 0; i < weathericonsAmount; i++) {
         weathericon[i] = loadImage('images/tomtypes/weather'+i+'.png');   
    }
    for (var i = 0; i < 4; i++) {
        cloudicons[i] = loadImage('images/clouds/clouds'+i+'.png');
    }
    for (var i = 0; i < 2; i++) {
        nightordayicon[i] = loadImage('images/nightorday'+i+'.png');
    }

    //   alleen voor testen in browser
 navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror, { timeout: 30000 });
//    
    

    timer1 = new TimerObject(0, 100, 32, windowHeight - 32);
    timer1.counterclock();
    
    mobilesizes();
    errorpage = select('.errorpage');
    setInterval(loadInt, 1000000);
    formCity = select('#formCity');
    responsiveScaleCalc();
    fill(255);
    searchpage = select('.searchpage');
    clearbutton = select('.searchbutton');
    clearbutton.mousePressed(clearPressed);
    setInterval(raindropPush, 400);
    setInterval(snowflakePush, 400);
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
        errorpage.hide();
        nightorday.display();
        
        if (timer1.counter() % 10 == 0 && weatherType != 800) {
            cloudPush();
        }    
        
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
    } if (!weatherData) {
        error();
    }
    
    
    
    push();
    ellipseMode(CENTER);
    fill(tomred);
    noStroke();
    ellipse(windowWidth - outerpadding*2, windowHeight - outerpadding*2, buttonSize, buttonSize);
    fill(255);
    ellipse(outerpadding*2, windowHeight - outerpadding*2, buttonSize, buttonSize);
    pop();
    
//    debug();
}
function keyPressed() {
    if (keyCode === 13){
		reloadCity();
		document.activeElement.blur();
		clearbutton.show();
        searchpage.removeClass('searchpage__show');
        searchpage.addClass('searchpage__hide');
    }
}

function resetForm(form)  {
    form.focus(); //test to see if this works on ios
    form.select();
    form.myButton.disabled = false;
    form.myButton.value = "Submit";
}

//clear formfield by clicking on it
//works faster and is more clwar to the user
//add search button for realoadCity;
//activate the searchmode

function clearPressed() {
    formCity.value('');		
	clearbutton.hide();
    searchpage.removeClass('searchpage__hide');
    searchpage.addClass('searchpage__show');
    //clearbutton.removeClass('searchpage__hide');
    //clearbutton.addClass('searchpage__show');
	//not button but first select searchpage and then addclass to page
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

document.addEventListener("deviceready", function(){
 navigator.geolocation.getCurrentPosition(currentlocationtocurrentcity, currentlocationerror, { timeout: 30000 });
}, false);

function mobilesizes() {
    if (windowWidth < 372) { 
        minRespP = 0.18; 
    }
    if (windowWidth > 760) {
        outerpadding = 30;
        buttonSize = 60;
    }
}