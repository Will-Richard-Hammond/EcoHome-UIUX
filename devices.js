document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Populate devices table
  const tbody = document.getElementById('deviceTable');
  const sorted = [...DATA.devices].sort((a,b)=>b.usage - a.usage);
  sorted.forEach((d, idx) => {
    const tr = document.createElement('tr');
    if (idx === 0) tr.classList.add('top-row');
    tr.innerHTML = `<td>${d.name}</td><td>${d.usage}</td>`;
    tbody.appendChild(tr);
  });
});
