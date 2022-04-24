let requeteAlertes = new XMLHttpRequest();
requeteAlertes.open('GET', 'php/temperature.json')
requeteAlertes.onload = function () {
    let data = JSON.parse(requeteAlertes.responseText);
    historique(data, 24);
    console.log(data);
}
requeteAlertes.send();

function historique(data, element) {
    let history = document.getElementById('historique');
    let content = document.createElement("section");
    for (let i = 0; i < data.length; i++) {
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        let donnees = document.createElement("p");
        summary.append("Alertes du " + data[i].date);
        verificationCapteur(data,i,donnees);
        details.appendChild(summary);
        details.appendChild(donnees);
        content.appendChild(details);
    }
    history.appendChild(content);

}

function verificationCapteur(data, element, balise) {
    let averageTemp = (data[element].tempExterieurMax + data[element].tempExterieurMin) / 2;
    if (averageTemp > 35) {
        balise.append("Alerte capteur extérieur: Hot Hot Hot ! Température : " + averageTemp + ".\n");
        verificationCapteurInterieur(data, element, balise);
    } else if (averageTemp < 0) {
        balise.append("Alerte capteur extérieur: Banquise en vue ! Température : " + averageTemp + ".\n ");
        verificationCapteurInterieur(data, element, balise);
    } else {
        balise.append("Pas d'elertes pour le capteur extérieur. Température : " + averageTemp + ".\n\t ");
        verificationCapteurInterieur(data, element, balise);
    }
}
function verificationCapteurInterieur(data, element, balise) {
    let averageTemp = (data[element].tempInterieurMax + data[element].tempInterieurMin) / 2;
    if (averageTemp > 22) {
        balise.append("Alerte capteur interieur: Baissez le chauffage ! Température : " + averageTemp);
    } else if (averageTemp > 50) {
        balise.append("Alerte capteur interieur: Appelez les pompiers ou arrêtez votre barbecue ! Température : " + averageTemp);
    } else if (averageTemp < 12 && averageTemp > 0) {
        balise.append("Alerte capteur interieur: montez le chauffage ou mettez un gros pull  ! Température : " + averageTemp);
    } else if (averageTemp < 0) {
        balise.append("Alerte capteur interieur: canalisations gelées, appelez SOS plombier - et mettez un bonnet ! Température : " + averageTemp);
    } else {
        balise.append("Pas d'elertes pour le capteur intérieur. Température : " + averageTemp);
    }
}
export {verificationCapteur};