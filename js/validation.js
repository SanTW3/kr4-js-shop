const checkout = document.querySelector('#checkout');
if (checkout) {
  function validate() {
    const data = new FormData(checkout), errors = {};
    if (String(data.get('name')).trim().length < 2) errors.name = 'Введите имя: минимум 2 символа.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email')).trim())) errors.email = 'Введите корректную электронную почту.';
    const phone = String(data.get('phone')).trim();
    if (!/^[+\d\s()-]+$/.test(phone) || !/^\d{10,15}$/.test(phone.replace(/\D/g,''))) errors.phone = 'Телефон должен содержать от 10 до 15 цифр.';
    if (!data.get('agreement')) errors.agreement = 'Необходимо согласие на обработку данных.';
    for (const name of ['name','email','phone','agreement']) {
      checkout.elements[name].setAttribute('aria-invalid',String(Boolean(errors[name])));
      document.querySelector(`#${name}-error`).textContent = errors[name] || '';
    }
    return errors;
  }
  checkout.addEventListener('submit',event => {
    event.preventDefault();
    const errors = validate();
    document.querySelector('#form-status').textContent = Object.keys(errors).length ? 'Исправьте отмеченные поля.' : 'Заявка проверена! Это имитация отправки: данные не передавались на сервер.';
    if (Object.keys(errors).length) checkout.elements[Object.keys(errors)[0]].focus();
  });
  checkout.addEventListener('input',() => { document.querySelector('#form-status').textContent = ''; });
}
