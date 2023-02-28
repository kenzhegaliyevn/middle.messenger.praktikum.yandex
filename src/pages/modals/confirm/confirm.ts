import tmpl from './confirm.hbs';
import compile from '../../../utils/compile';
import { Button, ErrorMessage, Label } from '../../../components';
import GlobalEventBus from '../../../utils/globaleventbus';
import { renderDOM } from '../../../utils/renderdom';
import Page, { PageProps } from '../../../utils/page';

export class ModalConfirm extends Page {

  private _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
    });

    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_DELETECHAT_SUCCEED,
      this._onActionDeleteChatSucceed.bind(this));
  }

  private _onActionDeleteChatSucceed() {
    this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS);
    const stub = new Label({
      text: 'Выберите чат чтобы отправить сообщение',
      class: this.props.styles['chat-stub'],
    });
    renderDOM('#conversation', stub);
    this.hide();
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

    const errorMessage = new ErrorMessage({
      text: '',
      class: this.props.styles.error,
    });


    const buttonConfirm = new Button({
      text: 'Подтвердить',
      class: `${this.props.styles.button} ` +
             `${this.props.styles['signup-form-button-primary']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          this._errorMessage.setProps({
            'text': '',
            'class': this.props.styles.error,
          });

          try {
            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHAT, this.props.chatId);

          } catch (error) {
            console.log('Error: ', error);
            
          }

        },
      },
    });

    const buttonCancel = new Button({
      text: 'Отменить',
      class: `${this.props.styles.button} ` +
             `${this.props.styles['signup-form-button-secondary']}`,
      events: {
        click: (e) => {
          e.preventDefault();
          this.hide();
        },
      },
    });


    this._errorMessage = errorMessage;

    return compile(tmpl, {
      errorMessage,
      buttonConfirm,
      buttonCancel,
      ...this.props,
    });
  }
}
