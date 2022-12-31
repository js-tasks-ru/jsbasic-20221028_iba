import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  popup = null;
  title = null;
  body = null;
  constructor() {
    this.popup = this.#createPopup();
    this.title = this.popup.querySelector('.modal__title');
    this.body = this.popup.querySelector('.modal__body');
  }

  #createPopup() {
    let popup = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>`)
   
    return popup
  }

  open() {
    const page = document.body;
    page.append(this.popup);
    page.classList.add('is-modal-open');
    
    document.addEventListener('keydown', this.keydownHandler);
    this.popup.addEventListener('click', this.closeModal);
  }

  setTitle(text) {
    this.title.textContent = text;
  }

  setBody(node) {
    this.body.innerHTML = '';
    this.body.append(node);
  }

  close() {
      const page = document.body;
      page.classList.remove('is-modal-open');
      this.popup.remove();
      document.removeEventListener('keydown', this.keydownHandler);
      document.removeEventListener('click', this.closeModal);
  }

  keydownHandler = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  closeModal = (event) => {
    if (event.target.closest('.modal__close')) {
      this.close();
    }
  }
}
