const API_BIKES = 'bikes.json';

const grid = document.getElementById('bikes-grid');
const status = document.getElementById('status');
const overlay = document.getElementById('modal-overlay');

// Fetch all bikes
async function loadBikes() {
  try {
    const res = await fetch(API_BIKES);
    if (!res.ok) throw new Error('Network response was not ok');

    const bikes = await res.json();

    status.style.display = 'none';
    grid.style.display = 'grid';

    renderGrid(bikes);

    // store bikes globally for modal use
    window.allBikes = bikes;

  } catch (err) {
    status.innerHTML = `<p style="color:#e25050">Failed to load bikes.</p>`;
  }
}

function renderGrid(bikes) {
  grid.innerHTML = "";

  bikes.forEach((bike, i) => {
    const card = document.createElement('div');
    card.className = 'bike-card';

    card.innerHTML = `
      <img class="bike-card-img" src="${bike.img_url}" alt="${bike.model}">
      <div class="bike-card-body">
        <div class="bike-card-model">${bike.model}</div>
        <div class="bike-card-manuf">${bike.manuf}</div>
      </div>
    `;

    card.addEventListener('click', () => openModal(bike.id));
    grid.appendChild(card);
  });
}

// open modal using same JSON data
function openModal(id) {

  const bike = window.allBikes.find(b => b.id === id);

  if (!bike) return;

  document.getElementById('modal-img').src = bike.img_url;
  document.getElementById('modal-model').textContent = bike.model;
  document.getElementById('spec-manuf').textContent = bike.manuf;
  document.getElementById('spec-gear').textContent = bike.gear;
  document.getElementById('spec-gear-manuf').textContent = bike.gear_manuf;
  document.getElementById('spec-size').textContent = bike.size;
  document.getElementById('modal-details').textContent = bike.details;

  overlay.classList.add('open');
}

function closeModal() {
  overlay.classList.remove('open');
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

loadBikes();