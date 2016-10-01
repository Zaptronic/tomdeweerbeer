function nightordayPush() {
    var PosX = windowWidth * 0.85;
    var PosY = windowHeight * 0.20;
    var nightordaystandard = 80;
    var nightordaysizer = nightordaystandard * responsiveRatio;
    nightorday = new Nightorday(PosX, PosY, nightordaysizer);
}

function Nightorday(x,y, nightordaysizer) {
    this.x = x;
    this.y = y;
    this.size = nightordaysizer;

    this.display = function() {
        imageMode(CENTER);
        if ((hours >= -3 && hours < 6) || (hours > 18 && hours <= 23)) {
            image(nightordayicon[1], this.x, this.y, this.size, this.size);

         } if (hours >= 6 && hours <= 18 ){
             image(nightordayicon[0], this.x, this.y, this.size, this.size);
         }
    }
}

function starsbynightPush() {
    var x = [0.73,0.82,0.93,0.225,0.1];
    var y = [0.17,0.3,0.28,0.31,0.26];
    var innerRadius = [4, 8, 4, 6, 4];
    var starBrightness = [90, 60, 20, 120, 70];

    for(var i = 0; i < innerRadius.length; i++ ) {
        stars.push(new Starbynight(x[i], y[i], innerRadius[i], starBrightness[i]));
    }
}

function Starbynight(x,y, innerRadius, starBrightness) {
    this.x = x;
    this.y = y;
    this.innerRadius = innerRadius * responsiveRatio;
    this.outerRadius = innerRadius * 2;
    this.starbrightness = starBrightness;
    this.starbrightnessSpeed = 1;

    this.display = function() {
        if ((hours >= -3 && hours < 6) || (hours > 18 && hours <= 23)) {
            noStroke();

            for (var i = 0; i < stars.length; i++) {
                push();
                fill(234, 167, 0, this.starbrightness);
                translate(width*this.x, height*this.y);
                rotate(frameCount / -150.0);
                star(0, 0, this.innerRadius, this.outerRadius, 5);
                pop();
            }


         } if (hours >= 6 && hours <= 18 ){
                var offset = 20;
                var curveheight = 15;
                var baseline = windowHeight * 0.54;
                noStroke();

                push();
                fill(255, 5);
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

                push();
                fill(255, 4);
                translate(-80, 20);
                beginShape();
                curveVertex(-10, baseline);
                curveVertex(-10, baseline - curveheight);
                curveVertex(windowWidth*0.25, baseline);
                curveVertex(windowWidth*0.5, baseline - curveheight * 0.6);
                curveVertex(windowWidth*0.75, baseline);
                curveVertex(windowWidth*1.25, baseline - curveheight * 0.7);
                curveVertex(windowWidth*1.5, baseline - curveheight);
                curveVertex(windowWidth*1.5, baseline + offset/2 + curveheight * 0.3);
                curveVertex(windowWidth*1.25, baseline + offset/2 + curveheight);
                curveVertex(windowWidth*0.75, baseline + offset/2);
                curveVertex(windowWidth*0.5, baseline + offset/2 + curveheight * 0.4);
                curveVertex(windowWidth*0.25, baseline + offset/2);
                curveVertex(-10, baseline + offset/2 + curveheight * 0.2);
                curveVertex(-10, baseline);
                endShape();
                pop();

         }
    }
    this.update = function() {
        this.starbrightness = this.starbrightness + this.starbrightnessSpeed;

        if (this.brightnesscheck()) {
           this.starbrightnessSpeed = this.starbrightnessSpeed * 1;
        } else {
           this.starbrightnessSpeed = this.starbrightnessSpeed * -1;
        }
    }
    this.brightnesscheck = function() {
		 if (this.starbrightness > 20 && this.starbrightness < 150) {
            return true;
         } else {
			return false;
		 }
	}
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
