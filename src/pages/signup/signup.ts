import tmpl from './signup.hbs';
import compile from '../../utils/compile';
import { Label, Input, Button, ErrorMessage } from '../../components';

import { isValid } from '../../utils/validator';
import GlobalEventBus from '../../utils/globaleventbus';
import Page, { PageProps } from '../../utils/page';

export class Signup extends Page {
  private _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', props);
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.VALIDATE_SIGNUP_FAILED,
      this._onValidateSignupFailed.bind(this),
    );
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_SIGNUP_FAILED,
      this._onActionSignupFailed.bind(this),
    );
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_SIGNUP_SUCCEED,
      this._onActionSignupSucceed.bind(this),
    );
  }

  private _onValidateSignupFailed(formData: { [index: string]: any }) {
    Object.keys(formData).forEach((key) => {
      if (!formData[key].isValid) {
        const element = document.querySelector(`input[name=${key}]`);
        element?.classList.add(this.props.styles['input-error']);
      }
    });
    throw new Error('Validation Error');
  }

  private _onActionSignupFailed(data: XMLHttpRequest) {
    const text = JSON.parse(data.responseText).reason;
    this._errorMessage.setProps({
      text: text,
      class: this.props.styles.error,
    });
    console.log('Error on signup: ', text);
  }

  private _onActionSignupSucceed() {
    this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETUSER);
    this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS);
  }

  private _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
    }
    if (element.name == 'password2') {
      const password1 = (element.form?.elements as { [key: string]: any })
        .password;
      if (password1 && element.value !== password1.value) {
        element.classList.add(this.props.styles['input-error']);
      }
    }
  }

  render() {
    const inputEmail = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-email']}`,
      name: 'email',
      validationType: 'email',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
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
    const inputFirstName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-first-name']}`,
      name: 'first_name',
      validationType: 'name',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputSecondName = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-second-name']}`,
      name: 'second_name',
      validationType: 'name',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputPhone = new Input({
      type: 'text',
      class: `${this.props.styles.input} ${this.props.styles['input-phone']}`,
      name: 'phone',
      validationType: 'phone',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
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
    const inputPassword2 = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['input-password']}`,
      name: 'password2',
      validationType: 'password,name=password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const errorMessage = new ErrorMessage({
      class: `${this.props.styles.error} ${this.props.styles['error-hide']}`,
    });

    const buttonSignup = new Button({
      text: 'Зарегистрироваться',
      class: `${this.props.styles.button} ${this.props.styles['signup-form-button-primary']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          this._errorMessage.setProps({
            text: '',
            class: this.props.styles.error,
          });

          const inputs = [
            inputEmail,
            inputLogin,
            inputFirstName,
            inputSecondName,
            inputPhone,
            inputPassword,
            inputPassword2,
          ];

          try {
            this.g.EventBus.emit(
              GlobalEventBus.EVENTS.VALIDATE_SIGNUP,
              inputs,
            );
            this.g.EventBus.emit(
              GlobalEventBus.EVENTS.ACTION_SIGNUP,
              inputs,
              '/chats',
            );
          } catch (error) {
            console.log('Error caught', error);
          }
        },
      },
    });
    const buttonLogin = new Button({
      text: 'Войти',
      class: `${this.props.styles.button} ${this.props.styles['signup-form-button-secondary']}`,
      events: {
        click: (e) => {
          e.preventDefault();
          this.props.router.go('/');
        },
      },
    });

    const labelEmail = new Label({
      text: 'Почта',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelLogin = new Label({
      text: 'Логин',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelFirstName = new Label({
      text: 'Имя',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelSecondName = new Label({
      text: 'Фамилия',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPhone = new Label({
      text: 'Телефон',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword = new Label({
      text: 'Пароль',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });
    const labelPassword2 = new Label({
      text: 'Пароль (еще раз)',
      class: `${this.props.styles.label} ${this.props.styles['form-label']}`,
    });

    this._errorMessage = errorMessage;

    return compile(tmpl, {
      styles: this.props.styles,
      labelEmail,
      labelLogin,
      labelFirstName,
      labelSecondName,
      labelPhone,
      labelPassword,
      labelPassword2,
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputPassword2,
      errorMessage,
      buttonLogin,
      buttonSignup,
    });
  }
}
