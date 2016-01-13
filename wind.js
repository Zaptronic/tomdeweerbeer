function cloudPush() {
    var cloudPosxA = -100;
    var cloudPosxB = 0;
    var cloudAmount = 4;
    cloudpicker = floor(random(3));
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                    random(windowHeight*0.45, windowHeight*0.6), 
                    round(random(100,400)),
                    cloudpicker
                         ));
    }
}

//single cloud
function Cloud(x,y,lifespan, cloudpicker) {
    this.x = x;
    this.y = y;
    this.radius = 25;
    this.moveover = 25;
    this.width = 150;
    this.height = 120;
    this.windmovementX = windSpeed/10 * (windowWidth/500);
    this.fadeInOpacity = 0;
    this.fadeInX = windowWidth/2;
    this.fadeOutX = windowWidth - (windowWidth/3);
    
    this.display = function() {
        push();
        imageMode(CENTER);
        tint(255,this.fadeInOpacity);
        image(cloudicons[cloudpicker], this.x, this.y, this.width, this.height);
        pop();
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        if (this.x < this.fadeInX && this.fadeInOpacity <= 160) {
            this.fadeInOpacity++;
        } if (this.x > this.fadeOutX) {
            this.lifespan--;
            this.fadeInOpacity--;
        }
    }
    this.updateWind = function() {
        this.windmovementX = windSpeed/3;
    }
    
    this.rearrange = function(){
        this.x = this.x * this.radius*2;
        this.y = this.y + this.radius*2;
    }
    this.intersects = function(otherCloud) {
        var d = dist(this.x, this.y, otherCloud.x, otherCloud.y);
        if (d < (this.radius*3 + otherCloud.radius)) {
            return true;
        } else {
            return false;
        }
    }
	this.lifespancheck = function() {
		 if (this.lifespan < 0 || this.fadeInOpacity <= 0) {
            return true;
         } else {
			return false;
		 }
	}
}
