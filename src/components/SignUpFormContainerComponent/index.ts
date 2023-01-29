import Block from "../../core/Block";
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
} from "../../utils/validation";

export type TValues = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};
export type TState = {
  values: TValues;
};

export default class SignUpFormContainer extends Block {
  static componentName = "SignUpFormContainer";

  state: TState = {
    values: {
      email: "",
      login: "",
      first_name: "",
      second_name: "",
      phone: "",
      password: "",
    },
  };

  constructor() {
    super();
    this.setProps({
      onClick: (e: Event) => this.handleRegister(e),
      onBlur: this.handleBlur.bind(this),
      error: null,
      onChange: (e: Event) => this.handleChange(e),
    });
  }

  handleBlur() {
    if (this.props.error === null) {
      this.setProps({
        ...this.props,
        error: {
          email: validateEmail(""),
          login: validateLogin(""),
          first_name: validateFirstName(""),
          second_name: validateFirstName(""),
          phone: validatePhone(""),
          password: validatePassword(""),
        },
      });
    }
  }

  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.state = {
      ...this.state,
      values: {
        ...this.state.values,
        [target.name]: target.value,
      },
    };
  }

  handleRegister(e: Event) {
    e.preventDefault();
    const items: { [key: string]: HTMLInputElement } = {};

    for (const [key, value] of Object.entries(this.refs)) {
      items[key] = value.children[1] as HTMLInputElement;
    }

    if (this.props.error !== "") {
      this.setProps({
        ...this.props,
        error: "",
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
        case "email":
          validatedEmail = validateEmail(value.value);
          break;
        case "login":
          validatedLogin = validateLogin(value.value);
          break;
        case "first_name":
          validatedName = validateFirstName(value.value);
          break;
        case "second_name":
          validatedSecondName = validateFirstName(value.value);
          break;
        case "phone":
          validatedPhone = validatePhone(value.value);
          break;
        case "password":
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
          first_name: validatedName,
          second_name: validatedSecondName,
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
              onInput=onChange
              value=this.state.values.email
            }}}
            {{{ Input
              id="login"
              fieldName="login"
              fieldType="text"
              fieldLabel="Логин"
              ref="login"
              error=error.login
              onFocus=onFocus
              onBlur=onBlur
              onInput=onChange
            }}}
            {{{ Input
              id="first_name"
              fieldName="first_name"
              fieldType="text"
              fieldLabel="Имя"
              ref="first_name"
              error=error.first_name
              onFocus=onFocus
              onBlur=onBlur
              onInput=onChange
            }}}
            {{{ Input
              id="second_name"
              fieldName="second_name"
              fieldType="text"
              fieldLabel="Фамилия"
              ref="second_name"
              onFocus=onFocus
              onBlur=onBlur
              error=error.second_name
              onInput=onChange
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
              onInput=onChange
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
              onInput=onChange
            }}}
            {{{ Button text="Зарегистрироваться" className='u-margin-top-big' onClick=onClick}}}
          </form>
          {{{ ButtonLink text="Войти" className='form-container__link'}}}
        </div>
      </div>
    `;
  }
}
