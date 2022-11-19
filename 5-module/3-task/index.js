'use strict'
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = carousel.querySelector('.carousel__inner');
  const slide = carousel.querySelector('.carousel__slide');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const btnLeft = carousel.querySelector('.carousel__arrow_left');
  const btnRight = carousel.querySelector('.carousel__arrow_right');
  // позиция карусели по умолчанию 0
  carouselInner.dataset.position = 0;
  // кнопка "налево" скрыта по умолчанию
  btnLeft.style.display = 'none';

  function moveSlides(event) {
    const carouselArrowLeft = event.target.classList.contains('carousel__arrow_left');
    const carouselArrowImgLeft = event.target.offsetParent.classList.contains('carousel__arrow_left');
    const carouselArrowRight = event.target.classList.contains('carousel__arrow_right');
    const carouselArrowImgRight = event.target.offsetParent.classList.contains('carousel__arrow_right');

    // проверка нажатия именно на кнопки назад
    if (carouselArrowLeft || carouselArrowImgLeft) {
      carouselInner.dataset.position = Number(carouselInner.dataset.position) + Number(slide.offsetWidth);
    }
    // проверка нажатия именно на кнопки вперед
    if (carouselArrowRight || carouselArrowImgRight) {
      carouselInner.dataset.position = Number(carouselInner.dataset.position) - Number(slide.offsetWidth);
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
    if (`${carouselInner.dataset.position}` === `-${slide.offsetWidth * slides.length - slide.offsetWidth}`) {
      btnRight.style.display = 'none';
    }
    // показать кнопку "направо" на всех слайдах, кроме последнего
    if (carouselInner.dataset.position > -(slide.offsetWidth * slides.length - slide.offsetWidth)) {
      btnRight.style.display = '';
    }
  }

  carousel.addEventListener('click', moveSlides);
}
