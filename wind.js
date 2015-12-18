function cloudPush() {
    var cloudPosxA = 0;
    var cloudPosxB = 100;
    var cloudAmount = 4;
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB), random(windowHeight/2, windowHeight-200), round(random(100,windowWidth))));     
        //call color function in raindrop in for loop 
        //raindrop[i].pickcolor bv
    }
}

//single raindrop
function Cloud(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/2;
    this.windmovementY = windSpeed/2;
    this.raindropRotator = -HALF_PI/10;
    
    this.display = function() {
        push();
        noStroke();
        fill(255, 120, 0);
        rect(this.x, this.y, this.radius, this.radius);
        pop();

        
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
//        this.y = this.y + this.windmovementY;
        this.windmovementX = this.windmovementX + 0.001;
        if (this.x > windowWidth) {
            this.lifespan = this.lifespan - 2;
        }
//        console.log(this.lifespan);
    }
	this.lifespancheck = function() {
		 if (this.lifespan < 0) {
            return true;
         } else {
			return false;
		 }
	}
}
