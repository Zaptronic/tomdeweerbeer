function error() {
    errorpage.show();
    var retryButton = select('.retry');
    retryButton.mousePressed(loadInt);
    
    //TODO
    //draw function recalls loadInt 300 times???
    //error is redrawn in drwan evryr frame making the load each frame as well
    //only one call is allowd to make
}