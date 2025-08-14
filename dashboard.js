document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Compute summary
  const total = DATA.weekUsage.reduce((a,b)=>a+b, 0);
  const top = [...DATA.devices].sort((a,b)=>b.usage - a.usage)[0];

  document.getElementById('metric-total').textContent = `${total} kWh`;
  const firstHalf = DATA.weekUsage.slice(0,3).reduce((a,b)=>a+b,0);
  const secondHalf = DATA.weekUsage.slice(4).reduce((a,b)=>a+b,0);
  const trend = secondHalf > firstHalf ? "increasing" : secondHalf < firstHalf ? "decreasing" : "stable";
  document.getElementById('metric-trend').textContent = `Trend: ${trend}`;
  document.getElementById('metric-top-device').textContent = top?.name ?? "—";
  document.getElementById('metric-top-usage').textContent = `${top?.usage ?? "—"} kWh`;

  // Chart
  const canvas = document.getElementById('usageChart');
  if (canvas && window.Chart) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: DATA.days,
        datasets: [{
          label: 'kWh',
          data: DATA.weekUsage,
          tension: 0.35,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { labels: { boxWidth: 12 } } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'kWh' } },
          x: { title: { display: true, text: 'Day' } }
        }
      }
    });
  }
});
