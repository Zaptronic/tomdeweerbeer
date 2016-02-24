function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
    responsiveScaleCalc();
}

window.addEventListener("orientationchange", function() {
    windowResized();
    raindrops = [];
    snowflakes = [];
    clouds = [];
    weerbeerPush();
    temperaturePush();
}, false);