function cloudPush(cloudtimer) {
    var cloudPosxA = -(windowWidth/4);
    var cloudPosxB = -50;
    var cloudRatio = ceil(windowWidth/500);
    var cloudAmount = 1 + cloudRatio;
    cloudpicker = floor(random(3));
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                    random(windowHeight*0.45, windowHeight*0.625), 
                    round(random(10,150)),
                    cloudpicker
                    ));
    }
}

//single cloud
function Cloud(x,y,lifespan, cloudpicker) {
    this.x = x;
    this.y = y;
    this.lifespan = lifespan;
    this.radius = 100;
//    this.moveover = 25;
    this.width = 150;
    this.height = 120;
    this.windSpeedMotion = windSpeed/10;
    this.windowRatioSpeed = windowWidth/500;
    this.maxSpeed = 2;
    this.windmovementX = constrain(this.windSpeedMotion + this.windowRatioSpeed, this.windSpeedMotion, this.maxSpeed);
    this.fadeInOpacity = 0;
    this.fadeInX = windowWidth/2;
    this.fadeOutX = windowWidth/2 + (windowWidth/6);
    
    this.display = function() {
        push();
        imageMode(CENTER);
//        ellipse(this.x, this.y, this.radius, this.radius);
        tint(255,this.fadeInOpacity);
        image(cloudicons[cloudpicker], this.x, this.y, this.width, this.height);
//        text(this.lifespan, this.x+10, this.y+10);
//        text(this.fadeInOpacity, this.x+10, this.y+50);
        pop();
    }
    
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        if (this.x < this.fadeInX) {
            this.lifespan++;
            this.fadeInOpacity++;
        } if (this.x > this.fadeOutX) {
            this.lifespan--;
            this.fadeInOpacity--;
        }
    }
    
//    this.randomizer = function() {
//        this.cloudtimer = round(random(10));
//        console.log(this.cloudtimer);
//        if (this.cloudtimer == 2) {
//            this.lifespan = 0;
//        }
////        return cloudtimer;
//    }
    
    this.updateWind = function() {
        this.windmovementX = constrain(this.windSpeedMotion + this.windowRatioSpeed, this.windSpeedMotion, this.maxSpeed);
    }
    
    this.intersects = function(otherCloud) {
        var d = dist(this.x, this.y, otherCloud.x, otherCloud.y);
        if (d < (this.radius + otherCloud.radius)) {
            return true;
        } else {
            return false;
        }
    }
	this.lifespancheck = function() {
		 if (this.lifespan <= 0) {
            return true;
         } else {
			return false;
		 }
	}
}
