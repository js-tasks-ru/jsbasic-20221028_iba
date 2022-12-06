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
      <div class="slider__thumb">
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

    document.addEventListener('pointerdown', this.onMouseDown);
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
    //процент каждой точки от слайдера
    let dotsPercent = [];
    //процент от слайдера, куда нажимает пользватель
    let leftPercent = (((event.clientX - event.target.closest('.slider').getBoundingClientRect().left) / sliderSteps.offsetWidth) * 100).toFixed(0);
    active.classList.remove('slider__step-active');

    for(let i = 0; i < sliderSteps.children.length; i++) {
      let x = 0;
      x += ((100 / (sliderSteps.children.length - 1)) * i);
      dotsPercent.push(x);
    }
  
    dotsPercent.forEach((dot, index) => {
      if ((Number(leftPercent) -  dot) > 0 && (Number(leftPercent) - dot) < (dotsPercent[1] / 2) ||
          (Number(leftPercent) -  dot) <= 0 && (Number(leftPercent) - dot) >= ((dotsPercent[1] / 2) * -1)
      ) {
        thumb.style.left = `${dotsPercent[index]}%`;
        progress.style.width = `${dotsPercent[index]}%`;
        sliderValue.textContent = index;
        sliderSteps.children[index].classList.add('slider__step-active');


        // Создание нового события
      let newEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: index, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
        })
        event.target.dispatchEvent(newEvent);
      }
    });
  }

  onMouseDown(event) {
    if (event.target.closest('.slider__thumb')) {
      const slider = event.target.closest('.slider');
      const thumb = slider.querySelector('.slider__thumb');
      const progress = slider.querySelector('.slider__progress');
      const sliderValue = slider.querySelector('.slider__value');
      const sliderSteps = slider.querySelector('.slider__steps');
       
      function onMouseMove(moveEvent) {
      slider.classList.add('slider_dragging');
  
      let leftPercent = (((moveEvent.clientX - slider.getBoundingClientRect().left) / sliderSteps.offsetWidth) * 100).toFixed(0);
         
  
      if (leftPercent <= 100 && leftPercent >= 0) {
        thumb.style.left =  leftPercent + '%'; 
        progress.style.width = leftPercent + '%'; 
      }
  
       }
  
      document.addEventListener('pointermove', onMouseMove);
  
      document.onpointerup = function(event) {
      document.removeEventListener('pointermove', onMouseMove);
      slider.classList.remove('slider_dragging');

      let active = slider.querySelector('.slider__step-active');
      active.classList.remove('slider__step-active');
      let leftPercent = (((event.clientX - slider.getBoundingClientRect().left) / sliderSteps.offsetWidth) * 100).toFixed(0);
         
      let dotsPercent = [];   
      for(let i = 0; i < sliderSteps.children.length; i++) {
        let x = 0;
        x += ((100 / (sliderSteps.children.length - 1)) * i);
        dotsPercent.push(x);
      }
        
      dotsPercent.forEach((dot, index) => {
        if ((Number(leftPercent) -  dot) > 0 && (Number(leftPercent) - dot) < (dotsPercent[1] / 2) ||
          (Number(leftPercent) -  dot) <= 0 && (Number(leftPercent) - dot) >= ((dotsPercent[1] / 2) * -1)
          ) {
            thumb.style.left = `${dotsPercent[index]}%`;
            progress.style.width = `${dotsPercent[index]}%`;
            sliderValue.textContent = index;
            sliderSteps.children[index].classList.add('slider__step-active');
    
    
            // Создание нового события
          let newEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
            detail: index, // значение 0, 1, 2, 3, 4
            bubbles: true // событие всплывает - это понадобится в дальнейшем
            })
            event.target.dispatchEvent(newEvent);
          }
        });
        thumb.onpointerup = null;
       };
  
      thumb.ondrugstart = () => false;
       
    }
  }
}