ocument.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const fmt = (n, digits = 0) =>
    (typeof n === 'number' ? n : 0).toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });

  const elecTotal = (DATA.weekUsage || []).reduce((a,b)=>a+b, 0);
  const topDevice = [...(DATA.devices || [])].sort((a,b)=>b.usage - a.usage)[0];

  const firstHalfElec = (DATA.weekUsage || []).slice(0,3).reduce((a,b)=>a+b,0);
  const secondHalfElec = (DATA.weekUsage || []).slice(4).reduce((a,b)=>a+b,0);
  const elecTrend = secondHalfElec > firstHalfElec ? "increasing"
                  : secondHalfElec < firstHalfElec ? "decreasing" : "stable";

  document.getElementById('metric-total').textContent = `${fmt(elecTotal)} kWh`;
  document.getElementById('metric-trend').textContent = `Trend: ${elecTrend}`;
  document.getElementById('metric-top-device').textContent = topDevice?.name ?? "—";
  document.getElementById('metric-top-usage').textContent = `${fmt(topDevice?.usage)} kWh`;

  const waterTotal = (DATA.waterWeekLitres || []).reduce((a,b)=>a+b, 0);
  const firstHalfWater = (DATA.waterWeekLitres || []).slice(0,3).reduce((a,b)=>a+b,0);
  const secondHalfWater = (DATA.waterWeekLitres || []).slice(4).reduce((a,b)=>a+b,0);
  const waterTrend = secondHalfWater > firstHalfWater ? "increasing"
                   : secondHalfWater < firstHalfWater ? "decreasing" : "stable";

  const elWaterTotal = document.getElementById('metric-water-total');
  const elWaterTrend = document.getElementById('metric-water-trend');
  if (elWaterTotal) elWaterTotal.textContent = `${fmt(waterTotal)} L`;
  if (elWaterTrend) elWaterTrend.textContent = `Trend: ${waterTrend}`;


  const factor = Number(DATA.co2FactorKgPerKWh) || 0;
  const co2TotalKg = elecTotal * factor;
  const elCO2 = document.getElementById('metric-co2-total');
  if (elCO2) elCO2.textContent = `${fmt(co2TotalKg, 1)} kg`;
  const elCO2Note = document.getElementById('metric-co2-note');
  if (elCO2Note) elCO2Note.textContent = 'From electricity only';

  
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