let mainChart, distChart;

function initCharts() {
    const ctxMain = document.getElementById('mainChart').getContext('2d');
    mainChart = new Chart(ctxMain, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Power (W)',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
        }
    });

    const ctxDist = document.getElementById('distChart').getContext('2d');
    distChart = new Chart(ctxDist, {
        type: 'doughnut',
        data: {
            labels: ['Current Output', 'Remaining'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#3b82f6', '#1e293b'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '80%' }
    });
}