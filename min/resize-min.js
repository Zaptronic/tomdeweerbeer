function windowResized(){resizeCanvas(windowWidth,windowHeight)}function getsizes(){var i=devicePixelRatio;return hoogte=floor(windowHeight*i)}var hoogte;window.onorientationchange=function(){resizeCanvas(windowWidth,windowHeight)},window.addEventListener("orientationchange",function(){getsizes(),resizeCanvas(windowWidth,hoogte),alert(hoogte)},!1);