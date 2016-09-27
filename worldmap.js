function checkData(data) {
    worldmapcities = data;
    console.log('prefabcity ' + worldmapcities.cities[1].name);
}


function worldmapScene() {
    this.x = windowWidth/2;

    this.update = function() {
        this.x = worldmapDistance;
    }
    this.display = function() {
        push();
        fill(255);
        translate(lerp(this.x, worldmapDistance, 20), 0);
        image(worldmapimage, 0, 0, image.width, image.height, 0, windowHeight/2, windowHeight*2, windowHeight);
        fill(255, 100, 0);
        rect(10, 100, 50,50);
        pop();
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