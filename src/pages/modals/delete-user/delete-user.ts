import tmpl from './delete-user.hbs';
import compile from '../../../utils/compile';
import { Button, ErrorMessage, Input } from '../../../components';
import GlobalEventBus from '../../../utils/globaleventbus';
import Page, { PageProps } from '../../../utils/page';

export class ModalDeleteUser extends Page {

  _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
    });

    this.g.EventBus.on(
      GlobalEventBus.EVENTS.VALIDATE_DELETECHATUSER_FAILED,
      this._onValidateDeleteChatUserFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_DELETEFINDUSER_FAILED,
      this._onActionFindUserFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_DELETEFINDUSER_SUCCEED,
      this._onActionFindUserSucceed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_DELETECHATUSER_FAILED,
      this._onActionDeleteChatUserFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_DELETECHATUSER_SUCCEED,
      this._onActionDeleteChatUserSucceed.bind(this));
  }

  private _onValidateDeleteChatUserFailed(formData: { [index: string]: any }) {

    Object.keys(formData).forEach(key => {
      if (!formData[key].isValid) {
        const element = document.querySelector(`input[name=${key}]`);
        element?.classList.add(this.props.styles['input-error']);
      }
    });
    throw new Error('Validation Error');
  }

  private _onActionFindUserFailed(data: string) {
    console.log('Got data: ', JSON.parse(data));
    const text = JSON.parse(data).reason;
    this._errorMessage.setProps({
      'text': text,
      'class': this.props.styles.error,
    });
    console.log('Error on find user: ', text);
  }

  private _onActionFindUserSucceed(data: any) {
    console.log('_onActionFindUserSucceed (delete user): ', data);
    this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHATUSER, {
      userId: data.id,
      chatId: this.props.chatId,
    });

    this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATUSERS, this.props.chatId);
  }

  private _onActionDeleteChatUserFailed(data: string) {
    const text = JSON.parse(data).reason;
    this._errorMessage.setProps({
      'text': text,
      'class': this.props.styles.error,
    });
    console.log('Error on add chat user: ', text);
  }

  private _onActionDeleteChatUserSucceed() {
    this._errorMessage.setProps({
      'text': 'User deleted',
      'class': this.props.styles.error,
    });
  }


  hideModal(e: Event) {
    const el = e.target as HTMLElement;
    if (!el) {
      return false;
    }
    if (el.classList.contains(this.props.styles['modal-container'])) {
      this.hide();
    }
  }

  render() {

    const inputUserLogin = new Input({
      type: 'text',
      class: `${this.props.styles.input}`,
      name: 'login',
      validationType: 'login',
      placeholder: 'Логин пользователя',
    });

    const errorMessage = new ErrorMessage({
      text: '',
      class: this.props.styles.error,
    });


    const buttonDelete = new Button({
      text: 'Удалить',
      class: `${this.props.styles.button} ` +
        `${this.props.styles['signup-form-button-primary']} ` +
        `${this.props.styles['delete-user-button']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          this._errorMessage.setProps({
            'text': '',
            'class': this.props.styles.error,
          });

          const inputs = [inputUserLogin];

          try {
            this.g.EventBus.emit(GlobalEventBus.EVENTS.VALIDATE_DELETECHATUSER, inputs);
            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_FINDUSER, inputs, {
              succeedEvent: GlobalEventBus.EVENTS.ACTION_DELETEFINDUSER_SUCCEED,
              failedEvent: GlobalEventBus.EVENTS.ACTION_DELETEFINDUSER_FAILED,
            });

          } catch (error) {
            console.log('Error: ', error);

          }

        },
      },
    });

    this._errorMessage = errorMessage;

    return compile(tmpl, {
      inputUserLogin,
      errorMessage,
      buttonDelete,
      ...this.props,
    });
  }
}
