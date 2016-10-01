var cities = [];
var mappedy = [];
var mappedx = [];

function checkData(data) {
    worldmapcities = data;
    for(var i = 0; i < worldmapcities.cities.length; i++) {
        cities.push(worldmapcities.cities[i].name);
        mappedx.push(map(worldmapcities.cities[i].coord.lon, -180, 180, 0, windowHeight * 2));
        mappedy.push(map(worldmapcities.cities[i].coord.lat, 90, -90, 0, windowHeight));
        console.log(cities);
    }
}

function worldmapScene(worldmapcities) {
    this.prevPositionX = 0;
    this.x = 0;

    this.update = function(worldmapDistance) {
            this.x = this.prevPositionX - worldmapDistance;
    }
    this.scrollCheck = function() {
        var maxWscroll = -1000;
        var minWscroll = 10;

        //todo fix stuck scroll
        if (this.x < maxWscroll ) {
            return true;
        } else {
            return true;
        }
    }
    this.display = function() {
        push();
        fill(255);
        translate(this.x, 0);
        imageMode(CORNERS);
        image(worldmapimage, 0, 0, image.width, image.height, 0, 0, windowHeight*2, windowHeight);
        fill(255, 100, 0);
        ellipseMode(CENTER);
        for (var i = 0; i < mappedx.length; i++) {
            ellipse(mappedx[i], mappedy[i], 20, 20);
        }
        pop();
    }
    this.ended = function() {
        this.prevPositionX = this.x;
        return this.prevPositionX;
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
