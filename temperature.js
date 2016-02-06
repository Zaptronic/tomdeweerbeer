function temperaturePush() {
    fill(0);
    textSize(textsizestandard);
    temperature = floor(temperature);
    text(temperature + '*' + 'C', outerpadding,windowHeight-(outerpadding + 20));
    textSize(textsizestandard/2);
    text(weatherDescription, outerpadding, windowHeight-outerpadding);
}