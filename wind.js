var currentcloudpush = 0;

function cloudpushControl() {
    if (currentcloudpush < 50) {
        currentcloudpush++;        
    } else {
        currentcloudpush = currentcloudpush;
    }
    if (currentcloudpush <= 4) {
        return true;
    } else {
        return false;
    }
}

function cloudPush() {
    var cloudPosXGrid = [-120, -240, -360];
    var cloudPosXpicker = floor(random(cloudPosXGrid.length));
    var cloudPosX = cloudPosXGrid[cloudPosXpicker];
    var cloudPosYGrid = [windowHeight*0.4, windowHeight*0.5, windowHeight*0.6];
    var cloudPosYpicker = floor(random(cloudPosYGrid.length));
    var cloudPosY = cloudPosYGrid[cloudPosYpicker];
    var cloudLifespan = round(random(10,80));
    var cloudRatio = windowWidth / 100;
    var cloudAmount = round(cloudRatio);
    cloudpicker = floor(random(4));
    
    if (clouds.length <= cloudAmount && weatherData && cloudpushControl() == false) {
     
        if (second() % 2 == 0 && random(1000) < 50) {
             clouds.push(new Cloud( cloudPosX,
                        cloudPosY, cloudLifespan, cloudpicker
            ));
        } 
    } else if (clouds.length <= cloudAmount && weatherData && cloudpushControl() == true) {
        clouds.push(new Cloud( cloudPosX, cloudPosY, cloudLifespan, cloudpicker));
    }
}

//single cloud
function Cloud(x,y,lifespan, cloudpicker) {
    this.x = x;
    this.y = y;
    this.lifespan = lifespan;
    this.width = 120 * responsiveRatio;
    this.height = 96 * responsiveRatio;
    this.windSpeedMotion = map(windSpeed, 0, 32.7, 1, 6);
//    this.windowRatioSpeed = 1000/windowWidth;
    this.windmovementX = this.windSpeedMotion;
    this.fadeInX = 0;
    this.fadeOutX = windowWidth;
    
    this.display = function() {
        push();
//        text(this.lifespan, this.x, this.y - 32);
        imageMode(CENTER);
        image(cloudicons[cloudpicker], this.x, this.y, this.width, this.height);
        pop();
    }
    
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        if (this.x < this.fadeInX) {
            this.lifespan += 0.5;
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