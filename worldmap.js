function checkData(data) {
    worldmapcities = data;
    console.log('prefabcity ' + worldmapcities.cities[1].name);
}


function worldmapScene(worldmapDistance) {
    // this.position = createVector(windowWidth/2, windowHeight/2);
    this.position = createVector(worldmapDistance); // distance moet in update worden berekend  deltaX -= ( prevPosition - currPosition );
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

    this.update = function() {
        mouse = createVector(mouseX, mouseY); //niet op mouse dan wordt de kaart opnieuw gereset
        this.velocity = p5.Vector.sub(mouse, this.position);
        // this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
    this.display = function() {
        fill(255);
        translate(this.position.x, 0);
        image(worldmapimage, 0, 0, image.width, image.height, 0, windowHeight/2, windowHeight*2, windowHeight);
        fill(255, 100, 0);
        rect(0, 100, 50,50);
    }
}

function mousePosition() {
    push();
    var strokelengte = 10;
    stroke(250,0,220);
    strokeWeight(4);
    translate(mousers.x, mousers.y);

    rotate(PI);
    line(0, 0, strokelengte, strokelengte);

    rotate(HALF_PI);
    line(0, 0, strokelengte, strokelengte);

    rotate(-HALF_PI);
    line(0, 0, -strokelengte, -strokelengte);

    rotate(HALF_PI);
    line(0, 0, -strokelengte, -strokelengte);
    pop();
}
