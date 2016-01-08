function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

window.addEventListener("orientationchange", function() {
    windowResized();
    raindrops = [];
    snowflakes = [];
    clouds = [];
    weerbeerPush();
    temperaturePush();
}, false);
