let requeteData = new XMLHttpRequest();
requeteData.open('GET', 'php/temperature.json');

requeteData.onload = function () {
    let data = JSON.parse(requeteData.responseText);
    let exterieurMax = data.map(function (elem) {
        return elem.tempExterieurMax;
    })
    let interieurMax = data.map(function (elem) {
        return elem.tempInterieurMax;
    })
    let exterieurMin = data.map(function (elem) {
        return elem.tempExterieurMin;
    })
    let interieurMin = data.map(function (elem) {
        return elem.tempInterieurMin;
    })
    let date = data.map(function (elem) {
        return elem.date;
    })
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'Temp Max',
                    data: interieurMax,
                    backgroundColor: 'rgba(255,0,0)',
                    borderColor: 'rgba(255,0,0)',
                    borderWidth: 2
                },
                {
                    label: 'Temp Min',
                    data: interieurMin,
                    backgroundColor: 'rgba(5,0,255)',
                    borderColor: 'rgba(5,0,255)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: false,
            animation: false,
            maintainAspectRatio: true,
            stacked: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Capteur Interieur'
                }
            },
            scales: {
                y: {
                    suggestedMin: -10,
                    suggestedMax: 50,
                    ticks: {
                        stepSize: 5
                    }
                },
            }
        }
    });
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    label: 'Temp Max',
                    data: exterieurMax,
                    backgroundColor: 'rgb(255,153,0)',
                    borderColor: 'rgba(255,153,0)',
                    borderWidth: 2
                },
                {
                    label: 'Temp Min',
                    data: exterieurMin,
                    backgroundColor: 'rgb(9,255,0)',
                    borderColor: 'rgb(9,255,0)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: false,
            animation: false,
            maintainAspectRatio: false,
            stacked: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Capteur Exterieur'
                }
            },
            scales: {
                y: {
                    suggestedMin: -10,
                    suggestedMax: 50,
                    ticks: {
                        stepSize: 5
                    }
                },
            }
        }
    });
}
requeteData.send();
