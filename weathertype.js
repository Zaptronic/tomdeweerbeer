function weerbeerPush() {
    var PosX = windowWidth/2;
    var weerbeerstandard = 850;
    var weerbeersizer = weerbeerstandard * responsiveRatio;
    var PosY = ceil(windowHeight - (weerbeersizer / 2));
    weerbeer = new Weerbeer(PosX,PosY, weerbeersizer);
}

function Weerbeer(x,y, weerbeersizer) {
    this.x = x;
    this.y = y;
    this.radius = weerbeersizer;
    this.fillColor = 255;
    
    this.display = function() {
        imageMode(CENTER);
        if (weatherType >= 200 && weatherType < 300) {
            push();
            noStroke();
            fill(this.fillColor - 100);
            ellipse(this.x, this.y, this.radius, this.radius);
            pop(); 
            
         } if (weatherType >= 300 && weatherType < 400){
            console.log('drizzle');
            push();
            rectMode(CENTER);
            noStroke();
            fill(this.fillColor, 120,200);
            rect(this.x, this.y, this.radius, this.radius);
            pop();

         } if (weatherType >= 500 && weatherType < 600){
             console.log('rain');
            image(weathericon[0], this.x, this.y, this.radius, this.radius);
             
         } if (weatherType >= 600 && weatherType < 700){
            push();
            rectMode(CENTER);
            noStroke();
            fill(this.fillColor,255,255);
            rect(this.x, this.y, this.radius, this.radius);
            pop();
             
         } if (weatherType >= 700 && weatherType < 800){
            push();
            rectMode(CENTER);
            noStroke();
            fill(this.fillColor,255,255);
            rect(this.x, this.y, this.radius, this.radius);
            pop();
             
         } if (weatherType == 800){
            image(weathericon[1], this.x, this.y);
             
         } if (weatherType >= 801 && weatherType < 900){
            push();
            rectMode(CENTER);
            noStroke();
            fill(this.fillColor,76,255);
            ellipse(this.x, this.y, this.radius, this.radius);
            pop();
            console.log('clouds');
             
         } if (weatherType >= 900){
            push();
            rectMode(CENTER);
            noStroke();
            fill(0,0,0);
            ellipse(this.x, this.y, this.radius, this.radius);
            pop();
             
         }
    }
}
