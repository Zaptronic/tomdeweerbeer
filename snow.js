function snowflakePush() {
    var snowPosxA = -(windowWidth * 0.15);
    var snowPosxB = windowWidth - (windowWidth * 0.15);
    
    if (snowflakes.length < amountSnow && weatherType != 800) {
         snowflakes.push(new Snowflake(random(snowPosxA,snowPosxB), random(-windowHeight/8,0), round(random(10,windowHeight/2))));
    }
}

//single raindrop
function Snowflake(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = random(10, 25);
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/10;
    this.windmovementY = windSpeed/2;
    this.raindropRotator = -HALF_PI/10;
    
    this.display = function() {
        push();
        rotate(this.raindropRotator);
        noStroke();
        fill(255, this.lifespan);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();

        
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        this.y = this.y + this.windmovementY;
        this.lifespan--;
        this.windmovementY = this.windmovementY + 0.001;
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
