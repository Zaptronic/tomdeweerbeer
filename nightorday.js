function nightordayPush() {
    var PosX = windowWidth/2 + windowWidth/3;
    var PosY = windowHeight/5;
    nightorday = new Nightorday(PosX,PosY);
}

function Nightorday(x,y) {
    this.x = x;
    this.y = y;
    this.size = 120;
    
    this.display = function() {
        imageMode(CENTER);
        if ((hours >= 0 && hours < 6) || (hours > 18 && hours <= 23)) {
            console.log('nacht');
            image(nightordayicon[1], this.x, this.y, this.size, this.size);
         } if (hours >= 6 && hours <= 18 ){
            image(nightordayicon[0], this.x, this.y, this.size, this.size);
             console.log('dag');
         }
    }
}
