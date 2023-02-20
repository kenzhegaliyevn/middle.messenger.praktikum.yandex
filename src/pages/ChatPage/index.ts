import Block from '../../core/block/Block';

export default class ChatPage extends Block {
  static componentName = 'ChatPage';

  constructor() {
    super();
  }

  render(): string {
    return `
      <div class='container'>
        <div class='chat-wrapper'>
          <div class='row'>
            <div class='col-1-of-3'>
              <div class='chat-list-wrapper'>
                <div class='chat-list__header'>
                  <a href='' class='chat-list__header__btn'>Профиль</a>
                </div>
                <div class='chat-list__search-wrapper'>
                  <input type='text' placeholder='Поиск' />
                </div>
                <div class='chat-list__item'>
                  <div class='chat-list__item__img'></div>
                  <div class='chat-list__item__text'>
                    <span class='chat-list__item__text--name'>Андрей</span>
                    <span class='chat-list__item__text--msg'>Изображение</span>
                  </div>
                  <div class='chat-list__item-right'>
                    <span class='chat-list__item-right--time'>10:49</span>
                    <span class='chat-list__item-right--notify'>2</span>
                  </div>
                </div>
              </div>
            </div>
            <div class='col-2-of-3'>
              <div class='content-wrapper'>
                <p class='content__text'>
                  Выберите чат чтобы отправить сообщение
                </p>
              </div>
            </div>
          </div>
        </div>      
      </div>
    `;
  }
}
