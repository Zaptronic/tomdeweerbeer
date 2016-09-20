function checkData(data) {
    worldmapcities = data;
    console.log('prefabcity ' + worldmapcities.cities[1].name);
}


function worldmapScene() {
    fill(255);
    // imageMode(CENTER);
    image(worldmapimage, 0, 0, image.width, image.height, worldmapPosition, windowHeight/2, windowHeight*2, windowHeight);
    fill(255, 100, 0);
    rect(PworldmapPosition, 100, 50,50);
    console.log(worldmapPosition);
}
