function weerbeerPush() {
    var PosX = windowWidth/2;
    var PosY = windowHeight/2;
    weerbeer = new Weerbeer(PosX,PosY);
}

function Weerbeer(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 500;
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
            image(weathericon[2], this.x, this.y, this.radius, this.radius*1.4);
             
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
