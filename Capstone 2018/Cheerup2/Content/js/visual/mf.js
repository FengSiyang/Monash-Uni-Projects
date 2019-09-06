var ctx = document.getElementById("myBar").getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["low", "medium", "high", "very high"],
        datasets: [{
            label: 'male',
            data: [724.8, 249.8, 87.2, 39.4],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1
        },
        {
            label: 'female',
            data: [597.4, 245.3, 157.9, 47.3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1
        }],
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Psychological Distress Level in Australia (age: 18-24)',
            fontSize: 20
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'number of people'
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Distress Level'
                },
                ticks: {
                    beginAtZero: true
                }
            }],
        }
    }
});