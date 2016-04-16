function temperaturePush() {
    fill(0);
    temperature = floor(temperature);
    weeromschrijving = select('.omschrijving', '.weeromschrijving');
    temperatuur = select('.temperatuur', '.weeromschrijving');
    weeromschrijving.html(weatherDescription);
    temperatuur.html(temperature + '*C');
}
