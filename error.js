function error() {
    errorpage.show();
    var retryButton = select('.retry');
    retryButton.mousePressed(loadInt);
}