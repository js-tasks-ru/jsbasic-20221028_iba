import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || product === undefined) {
      return
    } else {
      // если корзина не пуста
    if (this.cartItems.length > 0) {
      let ifIncludes = this.cartItems.filter(item => item.product.id === product.id);
      if (ifIncludes.length > 0) {
        // если такой продукт уже есть, увеличиваем количество
        this.cartItems.forEach((item) => {
          if (item.product.id === product.id) {
            this.cartItem = {
              product,
              count: item.count += 1,
            };
          }
        });
      } else {
        // если такого продукта нет, добавляем
        this.cartItem = {
          product,
          count: 1,
        };
        this.cartItems.push(this.cartItem);
      }
    
    } else {
      // если корзина пустая, то просто добавляем товар
      this.cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(this.cartItem);
    }
    this.onProductUpdate(this.cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => {
      return item.product.id === productId;
    });

    if (!cartItem) {
      return;
    }

    if (amount === 1) {
      cartItem.count++;
    } else {
      cartItem.count--;
    }

    if (cartItem.count === 0) {
      this.cartItems.forEach((item, index) => {
        if (item.product.id === cartItem.product.id) {
          this.cartItems.splice(index, 1);
        }
      });
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // Возвращает true если корзина пустая и false если в корзине есть хотя бы один товар.
    if (this.cartItems.length > 0) {
      return false
    } else {
      return true
    }
  }

  getTotalCount() {
    let count = this.cartItems.reduce((item, elem) => {
      return item + elem.count
    }, 0);
    return count
  }

  getTotalPrice() {
    let fullPrice = this.cartItems.reduce((item, elem) => {
      return item + (elem.count * elem.product.price)
    }, 0);
    return fullPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form" method="POST" action="https://httpbin.org/post">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }


  renderModal() {
    let popup = new Modal();
    this.popup = popup;
    let items = createElement('<div></div>');
    this.cartItems.forEach(item => {
      items.append(this.renderProduct(item.product, item.count));
    });
    items.append(this.renderOrderForm());

    this.popup.setTitle('Your order');
    this.popup.setBody(items);
    this.popup.open();
    const modalBody = this.popup.popup.querySelector('.modal__body');
    const form = this.popup.popup.querySelector(".cart-form");
    modalBody.addEventListener('click', this.updateCart);
    form.addEventListener('submit', (evt) => {
      this.onSubmit(evt);
    });
  }

  updateCart = (event) => {
    if(event.target.closest('.cart-counter__button_minus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
    }

    if(event.target.closest('.cart-counter__button_plus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
    }
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      
      if (this.cartItem === null || this.cartItem.count == 0) {
        event.target.closest('.cart-product').remove();
      } else {
        let elementInCart = event.target.closest('.cart-product');
        // Элемент, который хранит количество товаров с таким productId в корзине
        let productCount = elementInCart.querySelector('.cart-counter__count');
        // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = elementInCart.querySelector('.cart-product__price');
        let infoPrice = this.popup.popup.querySelector('.cart-buttons__info-price');
        let productPriceSum = Number(cartItem.product.price) * Number(cartItem.count)
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${productPriceSum.toFixed(2)}`;
        infoPrice.innerHTML = `€${Number(this.getTotalPrice()).toFixed(2)}`;
      }

      if (this.getTotalCount() <= 0) {
        this.popup.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const form = this.popup.popup.querySelector('.cart-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.add('is-loading');

    let formData = new FormData(form);
    fetch('https://httpbin.org/post', { method: "POST", body: formData })
    .then((response) => {
      return response.json;
    })
    .then(() => {
        this.cartItems = [];
        this.cartIcon.update(this);
        this.popup.setTitle('Success!');
        this.popup.setBody(createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `));
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

