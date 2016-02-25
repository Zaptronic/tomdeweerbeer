function cloudPush() {
    var cloudPosxA = -(windowWidth / 5);
    var cloudPosxB = -50;
    var cloudRatio = windowWidth / 10;
    var cloudAmount = 2 + cloudRatio;
    cloudpicker = floor(random(2));
//    console.log(windSpeed);
    
    if ((timer1.counter() % 2 && random(100) < 1) && (timer2.counter() % 3) && clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                    random(windowHeight*0.45, windowHeight*0.6), 
                    round(random(60,120)),
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
    this.windowRatioSpeed = windowWidth/1000;
    this.windmovementX = this.windSpeedMotion * this.windowRatioSpeed;
    this.fadeInX = 0;
    this.fadeOutX = windowWidth;
    this.translate = 0;
    
    this.display = function() {
        push();
        translate(this.translate, 0);
        text(this.lifespan, this.x, this.y - 32);
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
        if (dis < this.x + othercloud.x || dis < this.y + othercloud.y) {
            return true;
        } else {
            return false;
        }       
    }
    this.intersecting = function() {
//        this.lifespan = this.lifespan -2;
//        console.log('hit');
        this.translate = -(this.width + 10);
    }
}
