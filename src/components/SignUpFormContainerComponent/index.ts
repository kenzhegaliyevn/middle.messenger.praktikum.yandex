import Block from '../../core/Block';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
} from '../../utils/validation';

export default class SignUpFormContainer extends Block {
  static componentName = 'SignUpFormContainer';

  constructor() {
    super();
    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
      error: '',
    });
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const items: { [key: string]: HTMLInputElement } = {};

    for (const [key, value] of Object.entries(this.refs)) {
      items[key] = value.children[1] as HTMLInputElement;
    }

    if (this.props.error !== '') {
      this.setProps({
        ...this.props,
        error: '',
      });
    }

    let validatedEmail;
    let validatedLogin;
    let validatedName;
    let validatedSecondName;
    let validatedPhone;
    let validatedPassword;
    let generalError;
    for (const [key, value] of Object.entries(items)) {
      switch (key) {
        case 'email':
          validatedEmail = validateEmail(value.value);
          break;
        case 'login':
          validatedLogin = validateLogin(value.value);
          break;
        case 'first_name':
          validatedName = validateFirstName(value.value);
          break;
        case 'second_name':
          validatedSecondName = validateFirstName(value.value);
          break;
        case 'phone':
          validatedPhone = validatePhone(value.value);
          break;
        case 'password':
          validatedPassword = validatePassword(value.value);
          break;
        default:
          generalError = `Sorry, we are out of ${key}.`;
      }

      this.setProps({
        ...this.props,
        error: {
          email: validatedEmail,
          login: validatedLogin,
          firstName: validatedName,
          secondName: validatedSecondName,
          phone: validatedPhone,
          password: validatedPassword,
        },
      });
    }
  }

  render() {
    return `
      <div class='form-container-wrapper'>
        <div class='form-container'>
          <h2 class='form-container__header'>Регистрация</h2>
          <form class='form-container__form'>
            {{{ Input
              id="email"
              fieldName="email"
              fieldType="text"
              fieldLabel="Почта"
              ref="email"
              onFocus=onFocus
              onBlur=onBlur
              error=error.email
            }}}
            {{{ Input
              id="login"
              fieldName="login"
              fieldType="text"
              fieldLabel="Логин"
              ref="login"
              onFocus=onFocus
              onBlur=onBlur
              error=error.login
            }}}
            {{{ Input
              id="first_name"
              fieldName="firstName"
              fieldType="text"
              fieldLabel="Имя"
              ref="first_name"
              onFocus=onFocus
              onBlur=onBlur
              error=error.firstName
            }}}
            {{{ Input
              id="second_name"
              fieldName="second_name"
              fieldType="text"
              fieldLabel="Фамилия"
              ref="second_name"
              onFocus=onFocus
              onBlur=onBlur
              error=error.secondName
            }}}
            {{{ Input
              id="phone"
              fieldName="phone"
              fieldType="text"
              fieldLabel="Телефон"
              ref="phone"
              onFocus=onFocus
              onBlur=onBlur
              error=error.phone
            }}}
            {{{ Input
              id="password"
              fieldName="password"
              fieldType="password"
              fieldLabel="Пароль"
              ref="password"
              onFocus=onFocus
              onBlur=onBlur
              error=error.password
            }}}
            {{{ Button text="Зарегистрироваться" className='u-margin-top-big' onClick=onClick}}}
          </form>
          {{{ ButtonLink text="Войти" className='form-container__link'}}}
        </div>
      </div>
    `;
  }
}
