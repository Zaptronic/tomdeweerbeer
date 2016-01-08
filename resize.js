function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
    raindrops = [];
    snowflakes = [];
    clouds = [];
}

window.addEventListener("orientationchange", function() {
    windowResized();
    weerbeerPush();
    temperaturePush();
}, false);
