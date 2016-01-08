var hoogte;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

window.onorientationchange = function() {
  resizeCanvas(windowWidth, windowHeight);
};

window.addEventListener("orientationchange", function() {
    getsizes();
    resizeCanvas(windowWidth, hoogte);
    alert(hoogte);   
}, false);

function getsizes() {
    var pix = devicePixelRatio;
    hoogte = floor(windowHeight*pix);
    return hoogte;
}