import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.popup = new Modal();
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
    this.cartItems.forEach((item, i) => {
        if (item.product.id === productId) {
          item.count = Number(item.count) + Number(amount);
          this.cartItem.count = item.count;

          if(this.cartItem.count <= 0) {
           if (this.cartItems[i].product.id === this.cartItem.product.id) {
            this.cartItems.splice(i, 1); 
            this.cartItem = null;
           }
          }
        }
    });
    this.onProductUpdate(this.cartItem);
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
    return createElement(`<form class="cart-form">
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
    let items = createElement('<div></div>');
    this.cartItems.forEach(item => {
      items.append(this.renderProduct(item.product, item.count));
    });
    items.append(this.renderOrderForm());

    this.popup.setTitle('Your order');
    this.popup.setBody(items);
    this.popup.open();
    const modalBody = document.querySelector('.modal__body');

    modalBody.addEventListener('click', this.updateCart);
    this.onSubmit(event);
  }

  _getParents = (elem) => {
    let parents = [];
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      parents.push(elem);
    }
    return parents;
  }

  updateCart = (event) => {
    let parents = this._getParents(event.target);
    if(event.target.closest('.cart-counter__button_minus') && event.target.parentElement.closest('.cart-counter__button_minus')) {
      parents.forEach(elem => {
        if (elem.classList.contains('cart-product')) {
          this.updateProductCount(elem.dataset.productId, -1);
        }
      });
    }

    if(event.target.closest('.cart-counter__button_plus') && event.target.parentElement.closest('.cart-counter__button_plus')) {
      parents.forEach(elem => {
        if (elem.classList.contains('cart-product')) {
          this.updateProductCount(elem.dataset.productId, 1);
        }
      });
    }
  }

  onProductUpdate(cartItem) {
    let productCount;
    let productPrice;
    let infoPrice;
    if (document.body.classList.contains('is-modal-open')) {
      let parents = this._getParents(event.target);
      parents.forEach(elem => {
        if (elem.classList.contains('cart-product')) {
          productCount = elem.querySelector('.cart-counter__count');
          productPrice = elem.querySelector('.cart-product__price')
          infoPrice = document.querySelector('.cart-buttons__info-price');
          
          if (this.cartItem === null || this.cartItem.count == 0) {
            elem.remove();
          } else {
            let productPriceSum = Number(this.cartItem.product.price) * Number(this.cartItem.count)
            productCount.innerHTML = this.cartItem.count;
            productPrice.innerHTML = `€${productPriceSum.toFixed(2)}`;
            infoPrice.innerHTML = `€${Number(this.getTotalPrice()).toFixed(2)}`;
          }

          if (this.getTotalCount() <= 0) {
            this.popup.close();
          }
        }
      });
  

 

    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

