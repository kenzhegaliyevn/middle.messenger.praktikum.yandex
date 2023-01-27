import Block from '../../core/Block';

export default class SignUpPage extends Block {
  static componentName = 'SignUpPage';

  constructor() {
    super();
  }

  render(): string {
    return `
      <div class='container'>
        {{{ SignUpFormContainer }}}
      </div>
    `;
  }
}
