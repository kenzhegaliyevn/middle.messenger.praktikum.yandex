import Block from '../../core/Block';

export default class FormContainer extends Block {
  static componentName = 'FormContainer';

  constructor({ data }: any) {
    super({ data: JSON.parse(data) });
    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
      onBlur: this.handleBlur.bind(this),
      error: '',
    });
  }

  handleBlur() {
    const error = this.props.error as string;
    const { loginInput, passwordInput } = this.refs;
    const inputLoginElement = loginInput.children[0] as HTMLInputElement;
    const inputPasswordElement = passwordInput.children[0] as HTMLInputElement;
    if (
      error === '' &&
      inputLoginElement.value === '' &&
      inputPasswordElement.value === ''
    ) {
      this.setProps({
        ...this.props,
        error: 'Введите логин и пароль',
      });
    }
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const { loginInput, passwordInput } = this.refs;
    const inputLoginElement = loginInput.children[1] as HTMLInputElement;
    const inputPasswordElement = passwordInput.children[1] as HTMLInputElement;
    console.log({
      login: inputLoginElement.value,
      password: inputPasswordElement.value,
    });
    if (this.props.error !== '') {
      this.setProps({
        ...this.props,
        error: '',
      });
    }
    if (
      this.props.error === '' &&
      (inputLoginElement.value === '' || inputPasswordElement.value === '')
    ) {
      this.setProps({
        ...this.props,
        error: 'Введите логин и пароль',
      });
    }
  }

  render() {
    return `
      <div class='form-container-wrapper'>
        <div class='form-container'>
          <h2 class='form-container__header'>{{data.header}}</h2>
          <form class='form-container__form'>
            {{#each data.fields}}
              {{{ Input
                  id=fieldName
                  fieldName=fieldName
                  fieldType=fieldType
                  fieldLabel=fieldLabel
                  ref=ref
                  onFocus=onFocus
                  onBlur=onBlur
              }}}
            {{/each}}
            <p>${this.props.error}</p>
            {{{ Button text=data.button.text className='u-margin-top-big' onClick=onClick}}}
          </form>
          {{{ ButtonLink text=data.subButton className='form-container__link'}}}
        </div>
      </div>
    `;
  }
}
