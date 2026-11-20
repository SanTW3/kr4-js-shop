function productCard(product) {
  const card = el('article',undefined,'product-card');
  const illustration = el('div',product.title,'product-illustration');
  const body = el('div',undefined,'product-card__body');
  const link = el('a',product.title); link.href = `product.html?id=${product.id}`;
  const title = el('h2'); title.append(link);
  const button = el('button', product.isAvailable ? 'В корзину' : 'Нет в наличии','button');
  button.type = 'button'; button.dataset.id = product.id; button.disabled = !product.isAvailable;
  button.addEventListener('click', () => addToCart(button.dataset.id));
  body.append(el('p',product.category),title,el('p',product.description),el('p',`Рейтинг: ${product.rating} / 5`),el('p',formatPrice(product.price),'product-card__price'),button);
  card.append(illustration,body); return card;
}
const filterForm = document.querySelector('#filters');
if (filterForm) {
  const search = document.querySelector('#search'), category = document.querySelector('#category'), sort = document.querySelector('#sort'), available = document.querySelector('#available');
  [...new Set(products.map(p => p.category))].forEach(value => { const option = el('option',value); option.value = value; category.append(option); });
  function renderCatalog() {
    let result = products.filter(p => p.title.toLocaleLowerCase('ru').includes(search.value.trim().toLocaleLowerCase('ru')) && (!category.value || p.category === category.value) && (!available.checked || p.isAvailable));
    if (sort.value === 'asc') result.sort((a,b) => a.price-b.price);
    if (sort.value === 'desc') result.sort((a,b) => b.price-a.price);
    if (sort.value === 'title') result.sort((a,b) => a.title.localeCompare(b.title,'ru'));
    document.querySelector('#products').replaceChildren(...result.map(productCard));
    const average = result.length ? result.reduce((sum,p) => sum+p.price,0)/result.length : 0;
    document.querySelector('#results').textContent = result.length ? `Найдено: ${result.length}. Средняя цена: ${formatPrice(average)}.` : 'Товары не найдены. Измените условия поиска.';
  }
  filterForm.addEventListener('submit',event => event.preventDefault());
  filterForm.addEventListener('input',renderCatalog);
  filterForm.addEventListener('change',renderCatalog);
  filterForm.addEventListener('reset',() => setTimeout(renderCatalog,0));
  renderCatalog();
}
const detail = document.querySelector('#product-detail');
if (detail) {
  const id = new URLSearchParams(location.search).get('id') || 1;
  const product = findProduct(id);
  detail.append(product ? productCard(product) : el('p','Товар не найден.'));
}
