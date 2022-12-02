import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps =  steps;
    this.value = value;
    this.elem = this.render;
  }

  get render() {
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb"">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
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
    return this.elem
  }

  onClick(event) {
    //if (event.target.closest('.slider__steps span')) {
        const slider = event.target.closest('.slider');
        const thumb = slider.querySelector('.slider__thumb');
        const progress = slider.querySelector('.slider__progress');
        let active = slider.querySelector('.slider__step-active');
        const sliderValue = slider.querySelector('.slider__value');

        // active.classList.remove('slider__step-active');
        // event.target.classList.add('slider__step-active');
        console.log(event)
        //let leftPercents = 1 + sliderSteps.childElementCount - (slider.clientWidth / event.layerX); // Значение в процентах от 0 до 100
        let leftPercents = event.layerX / slider.clientWidth * 100;
        console.log(leftPercents.toFixed(0))
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        sliderValue.textContent = leftPercents.toFixed(0);

    //}


     // Создание нового события 
      let newEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
      event.target.dispatchEvent(newEvent);
    
  }
}
