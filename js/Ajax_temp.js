let requete = new XMLHttpRequest();
requete.open('GET', 'php/temperature.json')
requete.onload = function () {
    let data = JSON.parse(requete.responseText);
    injectionBalise(data, 0);
    console.log(data[0]);
}
requete.send();

function injectionBalise(data, element) {
    let capteur1 = document.getElementById("capteurData1");
    let capteur2 = document.getElementById("capteurData2");
    let averageTempInt = (data[element].tempInterieurMax + data[element].tempInterieurMin) / 2;
    let averageTempEx = (data[element].tempExterieurMax + data[element].tempExterieurMin) / 2;
    capteur1.append(averageTempInt);
    capteur2.append(averageTempEx);
}
