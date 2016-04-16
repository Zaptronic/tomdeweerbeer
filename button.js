function ButtonObject(padding,buttonSize) {
    this.padding = padding;
    this.x = this.padding*2;
    this.y = windowHeight - this.padding*2;
    this.radius = buttonSize;

    this.display = function() {
        push();
        ellipseMode(CENTER);
        noStroke();
        fill(tomred);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
    }
    this.click = function() {
        if(touchX <= this.padding + this.radius && touchY >= windowHeight - (this.padding + this.radius)){
            console.log('buttonhit is true');
            return true;
        } else {
            return false;
        }
    }
}


function ExitButton(padding,buttonSize) {
    this.padding = padding;
    this.x = windowWidth - this.padding*2;
    this.y = this.padding*2;
    this.radius = buttonSize;

    this.display = function() {
        push();
        ellipseMode(CENTER);
        noStroke();
        fill(tomyellow);
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
        push();
        strokeCap(ROUND);
        strokeWeight(4);
        stroke(255);
        line(this.x - this.radius * 0.2, this.y - this.radius * 0.2, this.x + this.radius * 0.2, this.y + this.radius * 0.2);
        line(this.x + this.radius * 0.2, this.y - this.radius * 0.2, this.x - this.radius * 0.2, this.y + this.radius * 0.2);
        pop();
    }
    this.exit = function() {
        if(touchX >= windowWidth - (this.padding + this.radius) && touchY <= this.padding + this.radius){
            console.log('exithit is true');
            return true;
        } else {
            return false;
        }
    }
}
