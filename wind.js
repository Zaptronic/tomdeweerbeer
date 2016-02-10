function cloudPush() {
    var cloudPosxA = -(windowWidth / 5);
    var cloudPosxB = -50;
    var cloudRatio = windowWidth / 10;
    var cloudAmount = 3 + cloudRatio;
    cloudpicker = floor(random(2));
//    console.log(windSpeed);
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                    random(windowHeight*0.45, windowHeight*0.6), 
                    round(random(10,100)),
                    cloudpicker
        ));
    }
}

//single cloud
function Cloud(x,y,lifespan, cloudpicker) {
    this.x = x;
    this.y = y;
    this.lifespan = lifespan;
    this.width = 100 * responsiveRatio;
    this.height = 80 * responsiveRatio;
    this.windSpeedMotion = map(windSpeed, 0, 32.7, 1, 6);
//    console.log(this.windSpeedMotion);
    this.windowRatioSpeed = windowWidth/1000;
//    this.windmovementX = 5;
    this.windmovementX = this.windSpeedMotion * this.windowRatioSpeed;
    this.fadeInX = 0;
    this.fadeOutX = windowWidth;
    
    this.display = function() {
        push();
        imageMode(CENTER);
        image(cloudicons[cloudpicker], this.x, this.y, this.width, this.height);
        pop();
    }
    
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        if (this.x < this.fadeInX) {
            this.lifespan+= 0.5;
        } if (this.x > this.fadeOutX) {
            this.lifespan--;
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
