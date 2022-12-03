import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render;
  }

  get render() {
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb"">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0"></div>
      <div class="slider__steps">
      </div>
    </div>`);
    const sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      let step = document.createElement('span');
      sliderSteps.append(step);

      if (i === 0) {
        step.classList.add('slider__step-active');
      }
    }

    this.elem.addEventListener('click', this.onClick);
    return this.elem;
  }

  onClick(event) {
    const slider = event.target.closest('.slider');
    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    let active = slider.querySelector('.slider__step-active');
    const sliderValue = slider.querySelector('.slider__value');
    const sliderSteps = slider.querySelector('.slider__steps');
    const slidesLength = sliderSteps.children.length - 1;
    let stepWidth = sliderSteps.offsetWidth / slidesLength;
    let pointCoordinate = 0;
    let activeStepNumber = 0;
    let left = 0;
    const stepPointsPesrents = [0];
    active.classList.remove('slider__step-active');

    for (let i = 0; i < slidesLength; i++) {
      pointCoordinate += stepWidth;
      stepPointsPesrents.push(pointCoordinate);
    }

    // если нажание на спан
    if (event.target.closest('.slider__steps span')) {
      event.target.classList.add('slider__step-active');

      Array.from(event.target.parentElement.closest('.slider__steps').children).forEach((span, index) => {
        if (span.classList.contains('slider__step-active')) {
          activeStepNumber = index;
          left = index * stepWidth + 'px';
          thumb.style.left = stepWidth * index + 'px';
          progress.style.width = stepWidth * index + 'px';
          sliderValue.textContent = index;
        }
      });
    } else {
      // если нажание не на спан
      stepPointsPesrents.forEach((dot, index) => {
        if (
          dot - (event.clientX - event.target.getBoundingClientRect().left) <=  stepWidth / 2 &&
          dot - (event.clientX - event.target.getBoundingClientRect().left) > 0
        ) {
          thumb.style.left = stepWidth * index + 'px';
          progress.style.width = stepWidth * index + 'px';
          sliderValue.textContent = index;
          sliderSteps.children[index].classList.add('slider__step-active');
        } else if (
          dot - (event.clientX - event.target.getBoundingClientRect().left) >= -(stepWidth / 2) &&
          dot - (event.clientX - event.target.getBoundingClientRect().left) < 0
        ) {
          thumb.style.left = stepWidth * index + 'px';
          progress.style.width = stepWidth * index + 'px';
          sliderValue.textContent = index;
          sliderSteps.children[index].classList.add('slider__step-active');
        }
      });
    }

    // Создание нового события
    let newEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })
    event.target.dispatchEvent(newEvent);
  }
}
