const products = [
  { name: 'The Daily Dish', type: 'care', detail: 'Ceramic food bowl', price: '$24', emoji: '🍲', color: '#f4cd69', tag: 'Fan favorite' },
  { name: 'Cloud Nine Bed', type: 'cozy', detail: 'Plush sleep nest', price: '$68', emoji: '🛏️', color: '#b9d6d4', tag: 'New' },
  { name: 'The Zoomie Ball', type: 'play', detail: 'Interactive felt toy', price: '$12', emoji: '🧶', color: '#e7b8c0', tag: 'Cat favorite' },
  { name: 'Snooze Blanket', type: 'cozy', detail: 'Reversible knit throw', price: '$35', emoji: '🧣', color: '#ef825b', tag: '' }
];

const grid = document.querySelector('#productGrid');
const count = document.querySelector('#cartCount');
const toast = document.querySelector('#toast');
let cart = 0;

function renderProducts(filter = 'all') {
  grid.innerHTML = products.filter(p => filter === 'all' || p.type === filter).map(p => `
    <article class="product-card">
      <div class="product-image" style="background:${p.color}">${p.tag ? `<small>${p.tag}</small>` : ''}<span aria-hidden="true">${p.emoji}</span></div>
      <h3>${p.name}</h3><p>${p.detail}</p><p class="price">${p.price}</p>
      <button class="add-button" aria-label="Add ${p.name} to bag" data-product="${p.name}">+</button>
    </article>`).join('');
}

renderProducts();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  renderProducts(button.dataset.filter);
}));

grid.addEventListener('click', event => {
  if (!event.target.matches('.add-button')) return;
  cart += 1;
  count.textContent = cart;
  toast.textContent = `${event.target.dataset.product} added to your bag 🐾`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#cartButton').addEventListener('click', () => {
  toast.textContent = cart ? `You have ${cart} item${cart === 1 ? '' : 's'} in your bag` : 'Your bag is waiting for a little something 🐾';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('#formMessage').textContent = `You're on the list — welcome, ${email.value}!`;
  email.value = '';
});
