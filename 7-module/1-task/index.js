import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render;
  }

  get render() {
    this.elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`); 

    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.categories.forEach((link, index) => {
      let ribbonLink = document.createElement('a');
      ribbonLink.href = "#";
      ribbonLink.classList.add('ribbon__item');
      ribbonLink.dataset.id = link.id;
      ribbonLink.textContent = link.name;
      if (index === 0) {
        ribbonLink.classList.add('ribbon__item_active');
      }
      ribbonInner.append(ribbonLink);
    });

    this.elem.addEventListener('click', this.onClick);

    return this.elem
  }

  onClick(event) {
    // Создание нового события при клике на ссылку
    if (event.target.classList.contains('ribbon__item')) {
      event.preventDefault();

      // активный класс
      let activeItem = document.querySelector('.ribbon__item_active');
      activeItem.classList.remove('ribbon__item_active');
      event.target.classList.add('ribbon__item_active');

      let newEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно "product-add"
        detail: event.target.dataset.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      event.target.dispatchEvent(newEvent);
    }
  }
}
