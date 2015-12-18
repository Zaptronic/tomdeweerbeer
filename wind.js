function cloudPush() {
    var cloudPosxA = -windowWidth/2;
    var cloudPosxB = 0;
    var cloudAmount = 6;
    
    if (clouds.length < cloudAmount) {
         clouds.push(new Cloud(random(cloudPosxA,cloudPosxB), random(windowHeight*0.66, windowHeight-200), round(random(100,windowWidth))));     
        //call color function in raindrop in for loop 
        //raindrop[i].pickcolor bv
    }
}

//single raindrop
function Cloud(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = 25;
    this. moveover = 25;
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/2;
    this.color = color(255, 120, 0);
    
    this.display = function() {
        push();
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
        //array with different img clouds one is random picked for ech new cloud 
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        
        if (this.x > windowWidth) {
            this.lifespan = this.lifespan - 2;
        }
    }
    this.changecolor = function(){
        this.x = this.x * this.radius*2;
        this.y = this.y + this.radius*2;
    }
    this.intersects = function(otherCloud) {
        var d = dist(this.x, this.y, otherCloud.x, otherCloud.y);
        if (d < (this.radius*4 + otherCloud.radius)) {
//            console.log(d);
            return true;
        } else {
            return false;
        }
    }
	this.lifespancheck = function() {
		 if (this.lifespan < 0) {
            return true;
         } else {
			return false;
		 }
	}
}
