const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.site-nav');
if (toggle && nav) toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded',String(nav.classList.toggle('is-open'))));
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products.find(p => p.title === button.dataset.product);
  if (product) addToCart(product.id); else location.href = 'catalog.html';
}));
renderCart();
