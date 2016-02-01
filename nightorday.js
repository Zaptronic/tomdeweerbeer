function nightordayPush() {
    var PosX = windowWidth/2 + windowWidth/3;
    var PosY = windowHeight/5;
    var nightordaystandard = 120;
    var nightordaysizer = nightordaystandard * responsiveRatio;
    nightorday = new Nightorday(PosX,PosY, nightordaysizer);
}

function Nightorday(x,y, nightordaysizer) {
    this.x = x;
    this.y = y;
    this.size = nightordaysizer;
    
    this.display = function() {
        imageMode(CENTER);
        if ((hours >= 0 && hours < 6) || (hours > 18 && hours <= 23)) {
            image(nightordayicon[1], this.x, this.y, this.size, this.size);
         } if (hours >= 6 && hours <= 18 ){
            image(nightordayicon[0], this.x, this.y, this.size, this.size);
         }
    }
}
