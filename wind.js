function cloudPush() {
    var cloudPosXGrid = [-10, -110, -210];
    var cloudPosXpicker = floor(random(cloudPosXGrid.length));
    var cloudPosX = cloudPosXGrid[cloudPosXpicker];
    var cloudPosYGrid = [windowHeight*0.4, windowHeight*0.5, windowHeight*0.6, windowHeight*0.7];
    var cloudPosYpicker = floor(random(cloudPosYGrid.length));
    var cloudPosY = cloudPosYGrid[cloudPosYpicker];
    var cloudLifespan = round(random(10,80));
    var cloudRatio = windowWidth / 100;
    var cloudAmount = round(cloudRatio);
    cloudpicker = floor(random(2));
    
    if (clouds.length <= cloudAmount && weatherData) {
     
        if (second() % 2 == 0 && random(1000) < 40) {
             clouds.push(new Cloud( cloudPosX,
                        cloudPosY, cloudLifespan, cloudpicker
            ));
        } 
    }
}

//single cloud
function Cloud(x,y,lifespan, cloudpicker) {
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.lifespan = lifespan;
    this.width = 100 * responsiveRatio;
    this.height = 80 * responsiveRatio;
    this.windSpeedMotion = map(windSpeed, 0, 32.7, 1, 6);
    this.windowRatioSpeed = windowWidth/1000;
    this.windmovementX = this.windSpeedMotion * this.windowRatioSpeed;
    this.fadeInX = 0;
    this.fadeOutX = windowWidth;
    this.translate = 0;
    
    this.display = function() {
        push();
        translate(this.translate, this.translate);
//        text(this.lifespan, this.x, this.y - 32);
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