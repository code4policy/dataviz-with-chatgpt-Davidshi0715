// Full dataset of reasons and counts
const fullData = [
    { reason: "Abandoned Bicycle", count: 1318 },
    { reason: "Administrative & General Requests", count: 2025 },
    { reason: "Air Pollution Control", count: 35 },
    { reason: "Alert Boston", count: 3 },
    { reason: "Animal Issues", count: 4155 },
    { reason: "Billing", count: 6 },
    { reason: "Boston Bikes", count: 64 },
    { reason: "Bridge Maintenance", count: 8 },
    { reason: "Building", count: 5209 },
    { reason: "Catchbasin", count: 621 },
    { reason: "Cemetery", count: 29 },
    { reason: "Code Enforcement", count: 31812 },
    { reason: "Employee & General Comments", count: 2166 },
    { reason: "Enforcement & Abandoned Vehicles", count: 61541 },
    { reason: "Environmental Services", count: 4416 },
    { reason: "Fire Hydrant", count: 205 },
    { reason: "General Request", count: 196 },
    { reason: "Generic Noise Disturbance", count: 109 },
    { reason: "Graffiti", count: 1839 },
    { reason: "Health", count: 1349 },
    { reason: "Highway Maintenance", count: 25096 },
    { reason: "Housing", count: 7590 },
    { reason: "MBTA", count: 1 },
    { reason: "Massport", count: 8 },
    { reason: "Needle Program", count: 7413 },
    { reason: "Neighborhood Services Issues", count: 28 },
    { reason: "Noise Disturbance", count: 832 },
    { reason: "Notification", count: 607 },
    { reason: "Office of The Parking Clerk", count: 18 },
    { reason: "Operations", count: 283 },
    { reason: "Park Maintenance & Safety", count: 7932 },
    { reason: "Parking Complaints", count: 19 },
    { reason: "Pothole", count: 85 },
    { reason: "Programs", count: 6 },
    { reason: "Recycling", count: 9955 },
    { reason: "Sanitation", count: 59389 },
    { reason: "Sidewalk Cover / Manhole", count: 291 },
    { reason: "Signs & Signals", count: 11209 },
    { reason: "Street Cleaning", count: 45659 },
    { reason: "Street Lights", count: 8499 },
    { reason: "Traffic Management & Engineering", count: 751 },
    { reason: "Trees", count: 10390 },
    { reason: "Valet", count: 7 },
    { reason: "Weights and Measures", count: 52 }
];

// Sort full dataset by count in descending order
const sortedFullData = [...fullData].sort((a, b) => b.count - a.count);

// Extract top 10 data
const top10Data = sortedFullData.slice(0, 10);

let isShowingTop10 = true;
let chart;

// Function to create the chart
function createChart(data) {
    const labels = data.map(item => item.reason);
    const counts = data.map(item => item.count);

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Calls',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 0,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Calls',
                        font: {
                            size: 16,
                            family: 'Arial, sans-serif',
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Reasons',
                        font: {
                            size: 16,
                            family: 'Arial, sans-serif',
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Initialize with top 10 data
createChart(top10Data);

// Toggle chart data on button click
document.getElementById('toggleChart').addEventListener('click', () => {
    if (isShowingTop10) {
        createChart(sortedFullData);
        document.getElementById('toggleChart').textContent = 'Show Top 10 Reasons';
    } else {
        createChart(top10Data);
        document.getElementById('toggleChart').textContent = 'Show All Reasons';
    }
    isShowingTop10 = !isShowingTop10;
});
