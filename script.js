//Load dummy data
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        //graph script
        const ctx = document.getElementById('usageChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.days,
                datasets: [{
                    label: 'kWh',
                    data: data.weekUsage,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    fill: true
                }]
            }
        });

        //device table script
        const table = document.getElementById('deviceTable');
        data.devices.forEach(device => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${device.name}</td><td>${device.usage}</td>`;
            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));