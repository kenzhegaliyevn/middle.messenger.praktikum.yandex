import tmpl from './create-chat.hbs';
import compile from '../../../utils/compile';
import { Button, ErrorMessage, Input } from '../../../components';
import GlobalEventBus from '../../../utils/globaleventbus';
import Page, { PageProps } from '../../../utils/page';

export class ModalCreateChat extends Page {

  private _errorMessage: ErrorMessage;

  constructor(props: PageProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
    });

    this.g.EventBus.on(
      GlobalEventBus.EVENTS.VALIDATE_CREATECHAT_FAILED,
      this._onValidateCreateChatFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_CREATECHAT_FAILED,
      this._onActionCreateChatFailed.bind(this));
    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_CREATECHAT_SUCCEED,
      this._onActionCreateChatSucceed.bind(this));
  }

  private _onValidateCreateChatFailed(formData: { [index: string]: any }) {

    Object.keys(formData).forEach(key => {
      if (!formData[key].isValid) {
        const element = document.querySelector(`input[name=${key}]`);
        element?.classList.add(this.props.styles['input-error']);
      }
    });
    throw new Error('Validation Error');
  }

  private _onActionCreateChatFailed(data: string) {
    const text = JSON.parse(data).reason;
    this._errorMessage.setProps({
      'text': text,
      'class': this.props.styles.error,
    });
    console.log('Error on create chat: ', text);
  }

  private _onActionCreateChatSucceed() {
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

    const inputChatName = new Input({
      type: 'text',
      class: `${this.props.styles.input}`,
      name: 'title',
      validationType: 'title',
      placeholder: 'Название чата',
    });

    const errorMessage = new ErrorMessage({
      text: '',
      class: this.props.styles.error,
    });


    const buttonCreate = new Button({
      text: 'Создать',
      class: `${this.props.styles.button} ` +
             `${this.props.styles['signup-form-button-primary']} ` +
             `${this.props.styles['create-chat-button']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [inputChatName];

          try {
            this.g.EventBus.emit(GlobalEventBus.EVENTS.VALIDATE_CREATECHAT, inputs);
            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CREATECHAT, inputs);
            this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS);

          } catch (error) {
            console.log('Error: ', error);
            
          }
        },
      },
    });

    this._errorMessage = errorMessage;

    return compile(tmpl, {
      inputChatName,
      errorMessage,
      buttonCreate,
      ...this.props,
    });
  }
}
