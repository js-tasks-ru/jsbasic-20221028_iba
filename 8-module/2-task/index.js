import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this._createElem;
    this.productsInner = this.elem.querySelector('.products-grid__inner');
    this.updateFilter = this.updateFilter;
  }
  get _createElem() {
    //const card = new ProductCard(this.products);
    const grid = createElement(`<div class="products-grid"><div class="products-grid__inner"></div></div>`);
    const productsInner = grid.querySelector('.products-grid__inner');

    this.products.forEach((card) => {
      let cardClass = new ProductCard(card);
      productsInner.append(cardClass.elem);
    });

    return  grid
  }

  _appendProducts() {
    this.products.forEach((card) => {
      let cardClass = new ProductCard(card);
      this.productsInner.append(cardClass.elem);
    });
  }

  updateFilter(obj) {
    const pageCards = Array.from(this.elem.querySelectorAll('.card'));
    this.productsInner.innerHTML = '';


    if (!event.currentTarget.checked) {
      this._appendProducts();
    } else {
      pageCards.forEach(card => {
        console.log(card.dataset)
        if (
          obj.category && card.dataset.category && obj.category === card.dataset.category ||
          obj.maxSpiciness && card.maxSpiciness && card.maxSpiciness <= obj.maxSpiciness ||
          obj.vegeterianOnly && card.vegeterianOnly ||
          obj.noNuts && card.noNuts
          ) {
          this.productsInner.append(card);
        }
      });
    }
  }
}
