import Block from '../../core/Block';

export default class SignIn extends Block {
  static componentName = 'SignIn';

  constructor() {
    super();
  }

  render(): string {
    return `
      <div class='container'>
        {{{ FormContainer data='{
          "header": "Вход",
          "fields": [
            {
              "fieldLabel": "Логин",
              "fieldName": "login",
              "fieldType": "text",
              "ref": "loginInput"
            },
            {
              "fieldLabel": "Пароль",
              "fieldName": "password",
              "fieldType": "password",
              "ref": "passwordInput"
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
