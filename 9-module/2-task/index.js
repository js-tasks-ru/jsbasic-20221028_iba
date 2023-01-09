import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    const dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    const dataSliderHolder = document.querySelector('[data-slider-holder]');
    const dataCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    const dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');

    const carousel = new Carousel(slides);
    const ribbonMenu = new RibbonMenu(categories);
    const stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    const cartIcon = await new CartIcon();
    const cart = new Cart(cartIcon);

    dataCarouselHolder.append(carousel.elem);
    dataRibbonHolder.append(ribbonMenu.elem);
    dataSliderHolder.append(stepSlider.elem);
    dataCartIconHolder.append(cartIcon.elem);

    let serverResponse = await fetch('./products.json');

    let products = await serverResponse.json();

    dataProductsGridHolder.innerHTML = '';

    const productsGrid = await new ProductsGrid(products);

    dataProductsGridHolder.append(productsGrid.elem);

    const nutsCheckbox = document.getElementById('nuts-checkbox');
    const vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    productsGrid.updateFilter({
      noNuts: nutsCheckbox.checked,
      vegeterianOnly: vegeterianCheckbox.checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.body.addEventListener('product-add', (evt) => {
      let productId = evt.detail;

      let currentProduct = products.find((item) => {
        return item.id = productId;
      });

      cart.addProduct(currentProduct);
    });

    dataSliderHolder.addEventListener('slider-change', (evt) => {
      let value = evt.detail;

      productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    dataRibbonHolder.addEventListener('ribbon-select', (evt) => {
      let categoryId = evt.detail;

      productsGrid.updateFilter({
        category: categoryId
      });
    });

    nutsCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    vegeterianCheckbox.addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
