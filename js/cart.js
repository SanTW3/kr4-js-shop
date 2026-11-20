// Храним только проверенные идентификаторы и целое количество от 1 до 99.
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem('kr4-cart') || '[]');
  if (Array.isArray(saved)) cart = saved.filter((row, i, all) => row && findProduct(row.id)?.isAvailable && Number.isInteger(row.quantity) && row.quantity > 0 && row.quantity <= 99 && all.findIndex(x => x?.id === row.id) === i);
} catch { cart = []; }
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.classList.add(className);
  return node;
}
function saveCart() {
  try { localStorage.setItem('kr4-cart', JSON.stringify(cart)); }
  catch { document.querySelector('#notice').textContent = 'Хранилище недоступно: корзина сохранится только до перезагрузки.'; }
  renderCart();
}
function addToCart(id) {
  const product = findProduct(id);
  if (!product?.isAvailable) return;
  const row = cart.find(row => row.id === product.id);
  if (row && row.quantity >= 99) return;
  if (row) row.quantity++; else cart.push({id: product.id, quantity: 1});
  saveCart();
  document.querySelector('#notice').textContent = `${product.title} добавлен в корзину.`;
}
function renderCart() {
  document.querySelectorAll('[data-cart-count]').forEach(node => node.textContent = cart.reduce((sum,row) => sum + row.quantity, 0));
  const container = document.querySelector('#cart-items');
  if (!container) return;
  container.replaceChildren();
  if (!cart.length) container.append(el('p','Корзина пуста. Добавьте товары из каталога.'));
  cart.forEach(row => {
    const product = findProduct(row.id), box = el('article', undefined, 'panel');
    box.append(el('h2',product.title), el('p', `${formatPrice(product.price)} × ${row.quantity}`));
    [['−',-1],['+',1],['Удалить',0]].forEach(([label,delta]) => {
      const button = el('button',label,'button'); button.type = 'button';
      button.setAttribute('aria-label', `${label} — ${product.title}`);
      button.disabled = delta === 1 && row.quantity >= 99;
      button.addEventListener('click', () => {
        row.quantity = delta ? row.quantity + delta : 0;
        cart = cart.filter(item => item.quantity > 0); saveCart();
      }); box.append(button);
    }); container.append(box);
  });
  document.querySelector('#cart-total').textContent = `Итого: ${formatPrice(cart.reduce((sum,row) => sum + findProduct(row.id).price * row.quantity,0))}`;
}
