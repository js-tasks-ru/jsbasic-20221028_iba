import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.popup = this._createPopup;
    this.title = this.title;
    this.body = this.body;
  }

  get _createPopup() {
    this.popup = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
      </div>
    </div>

  </div>
    `)
   
    return this.popup
  }

  setTitle(text) {
    this.title = document.createElement('h3');
    this.title.classList.add('modal__title');
    this.title.textContent = text;
    
    return this.title
  }

  setBody(node) {
    this.body = document.createElement('div');
    this.body.classList.add('modal__body');
    this.body.append(node);
    
    return this.body
  }

  open() {
    const page = document.body;
    page.append(this.popup);
    const modalHeader = this.popup.querySelector('.modal__header');
    const modalInner = this.popup.querySelector('.modal__inner');
    modalHeader.append(this.title);
    modalInner.append(this.body);
    page.classList.add('is-modal-open');
    
    document.addEventListener('keydown', event => {
      if(event.code === 'Escape') {
        page.classList.remove('is-modal-open');
        this.popup.remove();
      }
    });
    modalInner.addEventListener('click', this.close);
  }

  close(event) {
    if (event.target.closest('.modal__close') || event.target.offsetParent.closest('.modal__close')) {
      const page = document.body;
      const popup = event.target.closest('div.modal');
   
      page.classList.remove('is-modal-open');
      popup.remove();
      document.removeEventListener('keydown',  event => {
        if(event.code === 'Escape') {
          page.classList.remove('is-modal-open');
          this.popup.remove();
        }
      });
    }
  }
}
