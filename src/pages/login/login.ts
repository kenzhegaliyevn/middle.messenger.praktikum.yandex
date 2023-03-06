import tmpl from './login.hbs';
import compile from '../../utils/compile';

import { Label, Input, Button, ErrorMessage } from '../../components';
import { isValid } from '../../utils/validator';
import { GlobalEvents } from '../../utils/globaleventbus';
import Page, { PageProps } from '../../utils/page';
import { FormDataType } from '../../utils/types';

export class Login extends Page {

  private _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', props);
    this.g.EventBus.on(GlobalEvents.VALIDATE_LOGIN_FAILED, this._onValidateLoginFailed.bind(this));
    this.g.EventBus.on(GlobalEvents.ACTION_LOGIN_FAILED, this._onActionLoginFailed.bind(this));
    this.g.EventBus.on(GlobalEvents.ACTION_LOGIN_SUCCEED, this._onActionLoginSucceed.bind(this));
  }

  private _onValidateLoginFailed(formData: FormDataType) {

    Object.keys(formData).forEach(key => {
      if (!formData[key].isValid) {
        const element = document.querySelector(`input[name=${key}]`);
        element?.classList.add(this.props.styles['input-error']);
      }
    });
    throw new Error('Incorrect field value');
  }

  private _onActionLoginSucceed() {
    this.g.EventBus.emit(GlobalEvents.ACTION_GETUSER);
    this.g.EventBus.emit(GlobalEvents.ACTION_GETCHATS);
  }

  private _onActionLoginFailed(data: XMLHttpRequest) {
    const text = JSON.parse(data.responseText).reason;
    // throw new Error(text);
    this._errorMessage.setProps({
      text: text,
      class: this.props.styles.error,
    });
  }

  private _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
    }
  }

  render() {

    const inputLogin = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-login']}`,
      name: 'login',
      validationType: 'login',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const errorMessage = new ErrorMessage({
      class: `${this.props.styles.error} ${this.props.styles['error-hide']}`,
    });

    const inputPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['input-password']}`,
      name: 'password',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const buttonLogin = new Button({
      text: 'Авторизоваться',
      class: `${this.props.styles.button} ${this.props.styles['login-form-button-primary']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [inputLogin, inputPassword];

          inputs.forEach(input => input.element.classList.remove(this.props.styles['input-error']));
          this._errorMessage.setProps({ text: '' });

          try {
            this.g.EventBus.emit(GlobalEvents.VALIDATE_LOGIN, inputs);
            this.g.EventBus.emit(GlobalEvents.ACTION_LOGIN, inputs, '/chats');

          } catch (error) {
            this._errorMessage.setProps({
                text: error,
                class: this.props.styles.error,
            });
          }
        },
      },
    });
    const buttonSignup = new Button({
      text: 'Нет аккаунта?',
      class: `${this.props.styles.button} ${this.props.styles['login-form-button-secondary']}`,
      events: {
        click: (e) => {
          e.preventDefault();
          this.props.router.go('/signup');
        },
      },
    });

    const labelLogin = new Label({
      text: 'Логин',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword = new Label({
      text: 'Пароль',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });

    this._errorMessage = errorMessage;

    return compile(tmpl, {
      styles: this.props.styles,
      buttonLogin,
      buttonSignup,
      labelLogin,
      labelPassword,
      inputLogin,
      inputPassword,
      errorMessage,
    });
  }
}
