import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.title = this.title;
    this.body = this.body;
    this.close = this.close;
    this.page = document.body;
  }

  _createPopup() {
    let popup = document.createElement('div');
    popup.classList.add('modal');

    popup.innerHTML = `<div class="modal">
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

  </div>`;
   
    return popup
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
    this.page.append(this._createPopup());
    const modalHeader = document.querySelector('.modal__header');
    const modalInner = document.querySelector('.modal__inner');
    modalHeader.append(this.title);
    modalInner.append(this.body);
    this.page.classList.add('is-modal-open');
    document.addEventListener('keydown', this._closeByEsk)
  }

  close() {
    console.log('234');
  }

  _closeByEsk(event) {
    if(event.code === 'Escape') {
      console.log(this.page)
      this.page.classList.remove('is-modal-open')
    }
  }
}
