import Block from '../../core/Block';

export default class SignUp extends Block {
  static componentName = 'SignUp';

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
