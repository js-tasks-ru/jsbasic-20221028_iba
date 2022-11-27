import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render;
  }

  get render() {
    this.elem = createElement(`<div class="carousel"><div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div></div>`);
    let slidesList = this.slides
      .map(({name, price, image, id}) => {
        let slide = `<div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide ${name}">
        <div class="carousel__caption">
          <span class="carousel__price">${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`
      return slide
      })
      .join('');

      const carouselInner = document.createElement('div');
      carouselInner.classList.add('carousel__inner');
      carouselInner.innerHTML = slidesList;
      this.elem.append(carouselInner);

      // позиция карусели по умолчанию 0
      carouselInner.dataset.position = 0;

      // кнопка "налево" скрыта по умолчанию
      const btnLeft = this.elem.querySelector('.carousel__arrow_left');
      btnLeft.style.display = 'none';

      this.elem.addEventListener('click', this.onClick);

    return this.elem
  }

  onClick(event) {
    const carouselInner = document.querySelector('.carousel__inner');
    const slides = document.querySelectorAll('.carousel__slide');
    const carouselArrowLeft = event.target.classList.contains('carousel__arrow_left');
    const carouselArrowImgLeft = event.target.offsetParent.classList.contains('carousel__arrow_left');
    const carouselArrowRight = event.target.classList.contains('carousel__arrow_right');
    const carouselArrowImgRight = event.target.offsetParent.classList.contains('carousel__arrow_right');
    const btnLeft = document.querySelector('.carousel__arrow_left');
    const btnRight = document.querySelector('.carousel__arrow_right');

    // проверка нажатия именно на кнопки назад
    if (carouselArrowLeft || carouselArrowImgLeft) {
      carouselInner.dataset.position = Number(carouselInner.dataset.position) + Number(slides[0].offsetWidth);
    }
    // проверка нажатия именно на кнопки вперед
    if (carouselArrowRight || carouselArrowImgRight) {
      carouselInner.dataset.position = Number(carouselInner.dataset.position) - Number(slides[0].offsetWidth);
    }
    // пепредвижение контейнера
    carouselInner.style.transform = `translateX(${carouselInner.dataset.position}px)`;

    // показать кнопку "налево" на втором и последующих слайдах
    if (carouselInner.dataset.position < 0) {
      btnLeft.style.display = '';
    } 
    // скрыть кнопку налево на первом слайде
    if (carouselInner.dataset.position === '0') {
      btnLeft.style.display = 'none';
    }
    // скрыть кнопку "направо" на последнем слайде
    if (`${carouselInner.dataset.position}` === `-${slides[0].offsetWidth * slides.length - slides[0].offsetWidth}`) {
      btnRight.style.display = 'none';
    }
    // показать кнопку "направо" на всех слайдах, кроме последнего
    if (carouselInner.dataset.position > -(slides[0].offsetWidth * slides.length - slides[0].offsetWidth)) {
      btnRight.style.display = '';
    }

    // Создание нового события 
    if (event.target.classList.contains('carousel__button') || event.target.parentElement.classList.contains('carousel__button')) {
      let newEvent = new CustomEvent('product-add', { // имя события должно быть именно "product-add"
        detail: event.target.closest('.carousel__slide').dataset.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      event.target.closest('.carousel__slide').dispatchEvent(newEvent);
    }
  }
}
