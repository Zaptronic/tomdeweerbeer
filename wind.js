function cloudPush() {
    var cloudPosxA = -(windowWidth / 5);
    var cloudPosxB = -100;
    var cloudRatio = windowWidth / 100;
//    var cloudAmount = 2;
    var cloudAmount = round(cloudRatio);
    cloudpicker = floor(random(2));
//    console.log(cloudAmount);
    if (clouds.length <= cloudAmount && weatherData) {
     
        if (second() % 2 == 0 && random(100) < 10 && currentcloudpusher >= 1) {
             clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                        random(windowHeight*0.45, windowHeight*0.6), 
                        round(random(10,80)),
                        cloudpicker
            ));
        } 
    }
}

function currentclouds() {
    if (timer1.counter() % 10 == 0 && currentcloudpusher <= 2) {
        currentcloudpusher++;
    } else {
        currentcloudpusher = 0;
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
    this.intersectcheck = function(othercloud) {
        var dis = dist(this.x, this.y, othercloud.x, othercloud.y);
        if (dis < this.radius) {
            return true;
        } else {
            return false;
        }       
    }
    this.intersecting = function() {
        this.translate = this.radius + 10;
//        othercloud.translate = -(othercloud.radius);
    }
}