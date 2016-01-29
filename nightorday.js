function nightordayPush() {
    var PosX = windowWidth/2;
    var PosY = windowHeight/2;
    nightorday = new Nightorday(PosX,PosY);
    
}

function Nightorday(x,y) {
    this.x = x;
    this.y = y;
    this.size = 72;
    
    this.display = function() {
        imageMode(CENTER);
        if (weatherType >= 200 && weatherType < 300) {
//            image(nightordayIcon[0], this.x, this.y, this.size, this.size*1.4);   
            rect(x,y,this.size, this.size);
         } if (weatherType >= 500 && weatherType < 600){
            image(nightordayicon[1], this.x, this.y, this.size, this.size);   
         }
    }
}
