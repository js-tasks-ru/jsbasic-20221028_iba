import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render;
  }

  get render() {
    this.elem = createElement(`<div class="card" data-id="${this.product.id}">
                                <div class="card__top">
                                    <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product ${this.product.name}">
                                    <span class="card__price">€${this.product.price.toFixed(2)}</span>
                                </div>
                                <div class="card__body">
                                    <div class="card__title">${this.product.name}</div>
                                    <button type="button" class="card__button">
                                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                    </button>
                                </div>
                            </div>`);
    this.elem.addEventListener('click', this.onClick);

    return this.elem
  }

  onClick(event) {
    console.log(this.product)
    if (event.target.classList.contains('card__button') || event.target.parentElement.classList.contains('card__button')) {
      let newEvent = new CustomEvent('product-add', { // имя события должно быть именно "product-add"
        detail: event.currentTarget.dataset.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      event.currentTarget.dispatchEvent(newEvent);
    }
  }
}

