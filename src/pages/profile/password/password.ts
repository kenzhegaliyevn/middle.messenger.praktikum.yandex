import tmpl from './password.hbs';
import {
  Label, Input, Button, Link, ErrorMessage, AvatarImage,
} from '../../../components';

import compile from '../../../utils/compile';
import { isValid } from '../../../utils/validator';
import GlobalEventBus from '../../../utils/globaleventbus';
import User from '../../../utils/user';
import { config } from '../../../utils/config';
import Page, { PageProps } from '../../../utils/page';

export class ProfilePassword extends Page {

  private _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', props);
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.VALIDATE_SAVEPASSWORD_FAILED,
      this._onValidateSavePasswordFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_SAVEPASSWORD_FAILED,
      this._onActionSavePasswordFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_SAVEPASSWORD_SUCCEED,
      this._onActionSavePasswordSucceed.bind(this));
    this.g.EventBus.on(GlobalEventBus.EVENTS.USERDATA_UPDATED,
      this._onUserDataUpdated.bind(this));
  }

  private _onUserDataUpdated(user: User) {
    this.setProps({
      user: user.getData(),
    });
  }

  private _onValidateSavePasswordFailed(formData: { [index: string]: any }) {

    Object.keys(formData).forEach(key => {
      if (!formData[key].isValid) {
        const element = document.querySelector(`input[name=${key}]`);
        element?.classList.add(this.props.styles['input-error']);
        element?.previousElementSibling?.classList.add(this.props.styles['input-error']);
      }
    });
    throw new Error('Validation Error');
  }

  private _onActionSavePasswordFailed(res: XMLHttpRequest) {
    const text = JSON.parse(res.responseText).reason;
    this._errorMessage.setProps({
      'text': text,
      'class': this.props.styles.error,
    });
  }

  private _onActionSavePasswordSucceed() {
    this._errorMessage.setProps({
      'text': 'Password saved',
      'class': this.props.styles.error,
    });
  }


  private _onFocusChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!isValid(element)) {
      element.classList.add(this.props.styles['input-error']);
      element.previousElementSibling?.classList.add(this.props.styles['input-error']);
    } else {
      element.classList.remove(this.props.styles['input-error']);
      element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
    }

    if (element.name == 'newPassword2') {
      const password1 = (element.form?.elements as { [key: string]: any }).newPassword;
      if (password1 && element.value !== password1.value) {
        element.classList.add(this.props.styles['input-error']);
        element.previousElementSibling?.classList.remove(this.props.styles['input-error']);
      }
    }

  }

  render() {

    const src = User.instance.getData('avatar')
      ? config.resourceUrl + User.instance.getData('avatar')
      : this.props.icons.user;

    const avatarImage = new AvatarImage({
      class: this.props.styles['profile-avatar-image'],
      src,
    });

    const inputOldPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'oldPassword',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputNewPassword = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'newPassword',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });
    const inputNewPassword2 = new Input({
      type: 'password',
      class: `${this.props.styles.input} ${this.props.styles['profile-change-field-value']}`,
      name: 'newPassword2',
      validationType: 'password',
      events: {
        blur: this._onFocusChange.bind(this),
        focus: this._onFocusChange.bind(this),
      },
    });

    const linkProfilePasswordReturn = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['profile-return-button'],
      imageBeforeSrc: this.props.icons.arrowback,
      events: {
        click: () => {
          this._errorMessage.setProps({
            'text': '',
            'class': `${this.props.styles.error} ${this.props.styles['error-hide']}`,
          });
          this.props.router.go('/settings');
        },
      },
    });

    const errorMessage = new ErrorMessage({
      class: `${this.props.styles.error} ${this.props.styles['error-hide']}`,
    });

    const inputs = [
      inputOldPassword, inputNewPassword, inputNewPassword2,
    ];

    const buttonSave = new Button({
      text: 'Сохранить',
      class: `${this.props.styles.button} ${this.props.styles['profile-change-password-save-button']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          this._errorMessage.setProps({
            'class': `${this.props.styles.error} ${this.props.styles['error-hide']}`,
          });


          try {
            this.g.EventBus.emit(GlobalEventBus.EVENTS.VALIDATE_SAVEPASSWORD, inputs);
            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_SAVEPASSWORD, inputs);

          } catch (error) {
            console.log('Error caught', error);
          }
        },
      },
    });

    const labelOldPassword = new Label({
      text: 'Старый пароль',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelNewPassword = new Label({
      text: 'Новый пароль',
      class: this.props.styles['profile-info-field-name'],
    });
    const labelNewPassword2 = new Label({
      text: 'Повторите новый пароль',
      class: this.props.styles['profile-info-field-name'],
    });

    this._errorMessage = errorMessage;

    return compile(tmpl, {
      styles: this.props.styles,
      images: this.props.images,
      avatarImage,
      labelOldPassword,
      labelNewPassword,
      labelNewPassword2,
      inputOldPassword,
      inputNewPassword,
      inputNewPassword2,
      linkProfilePasswordReturn,
      errorMessage,
      buttonSave,
    });
  }
}
