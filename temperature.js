function temperaturePush() {
    fill(0);
    temperature = floor(temperature);
    var weeromschrijving = select('.omschrijving', '.weeromschrijving');
    var temperatuur = select('.temperatuur', '.weeromschrijving');
    weeromschrijving.html(weatherDescription);
    temperatuur.html(temperature + '*C');
}