function cloudPush() {
    var cloudPosxA = -(windowWidth/4);
    var cloudPosxB = -50;
    var cloudRatio = windowWidth/500;
    var cloudAmount = 1 + cloudRatio;
    cloudpicker = floor(random(3));
    console.log(cloudpicker);
    
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
    this.width = 150;
    this.height = 120;
    this.windSpeedMotion = windSpeed/2;
    this.windowRatioSpeed = windowWidth/100;
    this.windmovementX = this.windSpeedMotion / this.windowRatioSpeed;
    this.fadeInOpacity = 0;
    this.fadeInX = windowWidth/2;
    this.fadeOutX = windowWidth/2 + (windowWidth/6);
    
    this.display = function() {
        push();
        imageMode(CENTER);
//        ellipse(this.x, this.y, this.radius, this.radius);
//        tint(255,this.fadeInOpacity);
        image(cloudicons[cloudpicker], this.x, this.y, this.width, this.height);
        console.log(this.windmovementX);
        pop();
    }
    
    
    this.update = function() {
        this.x = this.x + this.windSpeedMotion;
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
        this.windmovementX = this.windSpeedMotion / this.windowRatioSpeed;
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
