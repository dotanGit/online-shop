const chartContainer = document.getElementById('chartContainer');

// Retrieve data from the data attributes
const monthlyLabels = JSON.parse(chartContainer.getAttribute('data-monthly-labels'));
const monthlyData = JSON.parse(chartContainer.getAttribute('data-monthly-data'));

const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');

// Create the bar chart for monthly revenue
const monthlyRevenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthlyLabels,  // Months
        datasets: [{
            label: 'Revenue by Month',
            data: monthlyData,  // Revenue for each month
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true
    }
});
