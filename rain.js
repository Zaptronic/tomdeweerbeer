function raindropPush() {
    var rainPosxA = -(windowWidth * 0.15);
    var rainPosxB = windowWidth - (windowWidth * 0.15);
    
    if (raindrops.length < amountRain) {
         raindrops.push(new Raindrop(random(rainPosxA,rainPosxB), random(-windowHeight/4,0), round(random(100,windowHeight/2))));     
        //call color function in raindrop in for loop 
        //raindrop[i].pickcolor bv
    }
}

//single raindrop
function Raindrop(x,y,lifespan) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.lifespan = lifespan;
    this.windmovementX = windSpeed/10;
    this.windmovementY = windSpeed/2;
    this.raindropRotator = -HALF_PI/10;
    
    this.display = function() {
        push();
        rotate(this.raindropRotator);
        noStroke();
        fill(121,219,226, this.lifespan);
        
        beginShape();
        curveVertex(this.x,  this.y);
        curveVertex(this.x,   this.y);
        curveVertex(this.x+3,  this.y+3);
        curveVertex(this.x+5,  this.y+20);
        curveVertex(this.x,  this.y+26);
        curveVertex(this.x-5,  this.y+20);    
        curveVertex(this.x-3,   this.y+3);    
        curveVertex(this.x,  this.y);
        endShape(CLOSE); 
        
        pop();
    }
    
    this.update = function() {
        this.x = this.x + this.windmovementX;
        this.y = this.y + this.windmovementY;
        this.lifespan--;
        this.windmovementY = this.windmovementY + 0.01;
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
