import Block from '../../core/Block';

export default class ErrorPage extends Block {
  static componentName = 'ErrorPage';

  render(): string {
    return `
      <div class='container'>
        {{{ StatusContainer code='500' text='Мы уже фиксим'}}}
      </div>
    `;
  }
}
