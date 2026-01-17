const API_URL = 'php/getdata.php';

document.addEventListener('DOMContentLoaded', () => {
    // Set the live date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('full-date').innerText = new Date().toLocaleDateString(undefined, options);

    initCharts();
    fetchData();
    setInterval(fetchData, 3000); // 3-second refresh
});

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        
        if (data.length > 0) {
            const latest = data[data.length - 1];
            updateUI(latest);
            updateCharts(data);
            setConnectionStatus(true);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        setConnectionStatus(false);
    }
}

function updateUI(d) {
    // Updating the Glassmorphism cards
    document.getElementById('val-power').innerText = `${parseFloat(d.power).toFixed(2)} W`;
    document.getElementById('val-volt').innerText = `${parseFloat(d.voltage).toFixed(1)} V`;
    document.getElementById('val-curr').innerText = `${parseFloat(d.current).toFixed(2)} A`;
    document.getElementById('val-temp').innerText = `${parseFloat(d.temp).toFixed(1)}°C`;
    
    // Add a quick flash effect to the power card to show it updated
    const powerCard = document.getElementById('val-power').parentElement;
    powerCard.style.transition = '0.3s';
    powerCard.style.opacity = '0.7';
    setTimeout(() => powerCard.style.opacity = '1', 300);
}

function updateCharts(history) {
    // Update Line Chart (Power Trend)
    mainChart.data.labels = history.map(row => row.timestamp.split(' ')[1]);
    mainChart.data.datasets[0].data = history.map(row => row.power);
    mainChart.update('none'); // 'none' prevents laggy animations on every tick

    // Update Efficiency Doughnut
    const currentPower = parseFloat(history[history.length - 1].power);
    const maxCapacity = 200; // 200W panel
    const percentage = (currentPower / maxCapacity) * 100;
    
    distChart.data.datasets[0].data = [currentPower, maxCapacity - currentPower];
    distChart.update();
}

function setConnectionStatus(isOnline) {
    const dot = document.querySelector('.pulse-icon');
    const text = document.querySelector('.connection-status span');
    if (isOnline) {
        dot.style.background = '#10b981';
        text.innerText = "Server Connected";
    } else {
        dot.style.background = '#ef4444';
        text.innerText = "Connection Lost";
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.className = document.body.classList.contains('light-mode') ? 'ph ph-sun' : 'ph ph-moon';
}