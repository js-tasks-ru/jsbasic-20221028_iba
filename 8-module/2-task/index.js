import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#createElem();
    this.#showCards();
  }
  
  #createElem() {
    //const card = new ProductCard(this.products);
    const grid = createElement(`<div class="products-grid"><div class="products-grid__inner"></div></div>`);
    const productsInner = grid.querySelector('.products-grid__inner');

    this.products.forEach((card) => {
      let cardClass = new ProductCard(card);
      productsInner.append(cardClass.elem);
    });

    return  grid
  }

  #showCards() {
    let filteredProducts = this.products;
    if (this.filters) {
      for(const [key, value] of Object.entries(this.filters)) {
        if (key === 'noNuts' && value === true) {
          filteredProducts = filteredProducts.filter((item) => item['nuts'] !== value);
        }
        if (key === 'vegeterianOnly' && value === true) {
          filteredProducts = filteredProducts.filter((item) => item['vegeterian'] === value);
        }
        if (key === 'maxSpiciness') {
          filteredProducts = filteredProducts.filter((item) => item['spiciness'] <= value);
        }
        if (key === 'category' && value)  {
          filteredProducts = filteredProducts.filter((item) => item[key] === value);
        }

      }

    }
    const holder = this.elem.querySelector('.products-grid__inner');
    holder.innerHTML = '';
    for (const product of filteredProducts) {
      let card = new ProductCard(product);
      holder.append(card.elem);
    };

  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    this.#showCards();
  }
 
}
