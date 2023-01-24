import Block from '../../core/Block';

export default class SignIn extends Block {
  static componentName = 'SignIn';

  constructor() {
    super();
  }

  // add blur
  // submit

  // handleBlur() {
  //   const error = this.props.error as string;
  //   const { loginInput, passwordInput } = this.refs;
  //   const inputLoginElement = loginInput.children[0] as HTMLInputElement;
  //   const inputPasswordElement = passwordInput.children[0] as HTMLInputElement;
  //   if (
  //     error === '' &&
  //     inputLoginElement.value === '' &&
  //     inputPasswordElement.value === ''
  //   ) {
  //     this.setProps({
  //       ...this.props,
  //       error: 'Введите логин и пароль',
  //     });
  //   }
  // }

  render(): string {
    return `
      <div class='container'>
        {{{ FormContainer data='{
          "header": "Вход",
          "fields": [
            {
              "fieldLabel": "Логин",
              "fieldName": "login",
              "fieldType": "text"
            },
            {
              "fieldLabel": "Пароль",
              "fieldName": "password",
              "fieldType": "password"
            }
          ],
          "button": {
            "type": "submit",
            "text": "Войти"
          },
          "subButton": "Нет аккаунта?"
        }'}}}
      </div>
    `;
  }
}
