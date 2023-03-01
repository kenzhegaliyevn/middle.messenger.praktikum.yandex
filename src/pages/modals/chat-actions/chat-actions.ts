import tmpl from './chat-actions.hbs';
import compile from '../../../utils/compile';
import { Link } from '../../../components';
import { renderDOM } from '../../../utils/renderdom';
import { ModalAddUser } from '../add-user/add-user';
import { ModalDeleteUser } from '../delete-user/delete-user';
import { ModalConfirm } from '../confirm/confirm';
import Page, { PageProps } from '../../../utils/page';

export class ChatActions extends Page {

  constructor(props: PageProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
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

    const linkAddChatUser = new Link({
      class: `${this.props.styles.link} ${this.props.styles['chat-actions-element']}`,
      imageBeforeSrc: this.props.icons.adduser,
      imageBeforeClass: this.props.styles['chat-actions-icon'],
      text: 'Добавить пользователя',
      events: {
        click: () => {
          const modalAddUser = new ModalAddUser(this.props);
          renderDOM('#modal', modalAddUser);
        },
      },
    });

    const linkDeleteChatUser = new Link({
      class: `${this.props.styles.link} ${this.props.styles['chat-actions-element']}`,
      imageBeforeSrc: this.props.icons.deleteuser,
      imageBeforeClass: this.props.styles['chat-actions-icon'],
      text: 'Удалить пользователя',
      events: {
        click: () => {
          const modalDeleteUser = new ModalDeleteUser(this.props);
          renderDOM('#modal', modalDeleteUser);
        },
      },
    });

    const linkDeleteChat = new Link({
      class: `${this.props.styles.link} ${this.props.styles['chat-actions-element']}`,
      imageBeforeSrc: this.props.icons.deletechat,
      imageBeforeClass: this.props.styles['chat-actions-icon'],
      text: 'Удалить чат',
      events: {
        click: () => {
          const modalConfirm = new ModalConfirm(this.props);
          renderDOM('#modal', modalConfirm);
        },
      },
    });

    return compile(tmpl, {
      linkAddChatUser,
      linkDeleteChatUser,
      linkDeleteChat,
      ...this.props,
    });
  }
}
