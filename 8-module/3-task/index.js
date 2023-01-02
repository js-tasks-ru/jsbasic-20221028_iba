export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

