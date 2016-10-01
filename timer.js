function TimerObject(counter, interval, x, y) {
    this.x = x;
    this.y = y;
    this.interval = interval;

    this.display = function() {
        text('timer: ' + counter, this.x, this.y);
    }
    this.update = function() {
        counter++;
    }
    this.counterclock = function() {
        setInterval(this.update, this.interval);
    }
    this.counter = function() {
        return counter;
        console.log('hit');
    }
}


function debug() {
    push();
    fill(255,0,0);
    textSize(24);
    timer1.display();
    pop();
    push();
    fill(255,0,0);
    textSize(64);
    var rate = floor(frameRate());
    text(rate, 32, windowHeight - 64);
    pop();

}
