function nightordayPush() {
    var PosX = (windowWidth/2) + (windowWidth * 0.35);
    var PosY = windowHeight * 0.19;
    var nightordaystandard = 80;
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
             push();
             image(nightordayicon[0], this.x, this.y, this.size, this.size);
         }
    }
}
