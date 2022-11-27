import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.name = slides.name;
    this.price = slides.price;
    this.image = slides.image;
    this.id = slides.id;
  }

  createSlide(sliderBody) {
    const slideLayout = createElement(`
    <div class="carousel__slide" data-id="${this.id}">
        <img src="/assets/images/carousel/${this.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${this.price}</span>
          <div class="carousel__title">${this.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    this.slides.forEach(() => {
      sliderBody.append(slideLayout);
    });
  }

  createSlider() {
    const sliderLayout = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>
    `);
    const sliderBody = sliderLayout.querySelector('.carousel__inner');
    let body = document.querySelector('body');
    body.append(sliderLayout);
    this.createSlide(sliderBody);
    return sliderLayout
  }
  get elem() {
    return this.createSlider()
  }
}
