import Block from '../../core/Block';

export default class NotFoundPage extends Block {
  static componentName = 'NotFoundPage';

  render(): string {
    return `
      <div class='container'>
        {{{ StatusContainer code='404' text='Не туда попал'}}}
      </div>
    `;
  }
}
