function nightordayPush() {
    var PosX = windowWidth * 0.85;
    var PosY = windowHeight * 0.20;
    var nightordaystandard = 80;
    var nightordaysizer = nightordaystandard * responsiveRatio;
    nightorday = new Nightorday(PosX,PosY, nightordaysizer);
}

function Nightorday(x,y, nightordaysizer) {
    this.x = x;
    this.y = y;
    this.size = nightordaysizer;
    var stars = [4, 8, 4, 6, 4];
    var innerRadius = stars[0] * responsiveRatio;
    var outerRadius = innerRadius * 2;
    this.starbrightness = 100;
    this.starbrightnessSpeed = 1;
    
    this.display = function() {
        imageMode(CENTER);
        if ((hours >= -3 && hours < 6) || (hours > 18 && hours <= 23)) {
            image(nightordayicon[1], this.x, this.y, this.size, this.size);
            
            fill(234, 167, 0, this.starbrightness); 
            noStroke();
            push();
            innerRadius = stars[0] * responsiveRatio;
            outerRadius = innerRadius * 2;
            translate(width*0.73, height*0.17);
            rotate(frameCount / -150.0);
            star(0, 0, innerRadius, outerRadius, 5); 
            pop();

            push();
            innerRadius = stars[1] * responsiveRatio;
            outerRadius = innerRadius * 2;
            translate(width*0.82, height*0.3);
            rotate(frameCount / -200.0);
            star(0, 0, innerRadius, outerRadius, 5); 
            pop();

            push();
            innerRadius = stars[2] * responsiveRatio;
            outerRadius = innerRadius * 2;
            translate(width*0.93, height*0.28);
            rotate(frameCount / 100.0);
            star(0, 0, innerRadius, outerRadius, 5); 
            pop();

            push();
            innerRadius = stars[3] * responsiveRatio;
            outerRadius = innerRadius * 2;
            translate(width*0.225, height*0.31);
            rotate(frameCount / 100.0);
            star(0, 0, innerRadius, outerRadius, 5); 
            pop();

            push();
            innerRadius = stars[4] * responsiveRatio;
            outerRadius = innerRadius * 2;
            translate(width*0.1, height*0.25);
            rotate(frameCount / -120.0);
            star(0, 0, innerRadius, outerRadius, 5); 
            pop();
            
         } if (hours >= 6 && hours <= 18 ){
             image(nightordayicon[0], this.x, this.y, this.size, this.size);
//            image(nightordayicon[1], this.x, this.y, this.size, this.size);
//            fill(tomyellow, 40); 
//            fill(255, this.starbrightness); 
         }
        
        
        var offset = 20;   
        var curveheight = 15;
        var baseline = windowHeight * 0.56;
        noStroke();
        fill(255, 25);        
        
        push();
        translate(-20, 0);
        beginShape();
        curveVertex(-10, baseline);
        curveVertex(-10, baseline - curveheight);
        curveVertex(windowWidth*0.25, baseline);
        curveVertex(windowWidth*0.5, baseline - curveheight);
        curveVertex(windowWidth*0.75, baseline);
        curveVertex(windowWidth*1.25, baseline - curveheight);
        curveVertex(windowWidth*1.5, baseline - curveheight);
        curveVertex(windowWidth*1.5, baseline + offset + curveheight * 0.7);
        curveVertex(windowWidth*1.25, baseline + offset + curveheight);
        curveVertex(windowWidth*0.75, baseline + offset);
        curveVertex(windowWidth*0.5, baseline + offset + curveheight * 0.7);
        curveVertex(windowWidth*0.25, baseline + offset);
        curveVertex(-10, baseline + offset + curveheight * 0.7);        
        curveVertex(-10, baseline);
        endShape();
        pop();
        
    }
    this.update = function() {
        this.starbrightness = this.starbrightness + this.starbrightnessSpeed;
        
        if (this.brightnesscheck()) {
           this.starbrightnessSpeed = this.starbrightnessSpeed * 1;
        } else {
           this.starbrightnessSpeed = this.starbrightnessSpeed * -1;
        }
        console.log(this.starbrightness);
    }
    this.brightnesscheck = function() {
		 if (this.starbrightness > 50 && this.starbrightness < 200) {
            return true;
         } else {
			return false;
		 }
	}
    
//                var baseline = windowHeight/2;
//        var a = 0.0;
//        for (var i = 0; i < windowWidth; i++) {
//            var repeat = 400;
//            var inc = PI / repeat;
//            var waver = sin(a) * 16.0;
//            console.log(waver);
//            var offset = 40;
//            stroke(255, 40);
//            line(i, (baseline-offset) - waver, i, (baseline+offset) + waver);
//            a = a + inc;
//        }
    
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
