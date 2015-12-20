function cloudPush() {
    var cloudPosxA = -100;
    var cloudPosxB = 0;
    var cloudAmount = 3;
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB),
                    random(windowHeight*0.66, windowHeight-200), 
                    round(random(100,200))));
    }
}

//single cloud
function Cloud(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = 25;
    this.moveover = 25;
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/3;
    this.fadeInOpacity = 0;
    this.fadeInX = windowWidth/2;
    this.fadeOutX = windowWidth - (windowWidth/3);
    
    this.display = function() {
        push();
        noStroke();
        fill(255, 120, 0, this.fadeInOpacity);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
        //array with different img clouds one is random picked for ech new cloud 
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
		 if (this.lifespan < 0 && this.fadeInOpacity <= 0) {
            return true;
         } else {
			return false;
		 }
	}
}
