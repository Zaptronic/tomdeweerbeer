function weerbeerPush() {
    var PosX = windowWidth/2;
    var weerbeerstandard = 1050;
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
        // console.log('weathertype ' + weatherType);
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

         } if ((weatherType == 500) || (weatherType >= 515 && weatherType < 522)){
            image(weathericon[0], this.x, this.y, this.radius, this.radius);

         } if ((weatherType >= 501 && weatherType < 515)  || (weatherType >= 522 && weatherType < 600)) {
            image(weathericon[3], this.x, this.y, this.radius, this.radius);

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

         } if (weatherType == 800 && temperature > 0){
            push();
            image(weathericon[1], this.x, this.y, this.radius, this.radius);
            pop();

            //onbewolkt min 0 graden

         } if (weatherType >= 801 && weatherType < 900){
            push();
            image(weathericon[2], this.x, this.y, this.radius, this.radius);
            pop();

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
