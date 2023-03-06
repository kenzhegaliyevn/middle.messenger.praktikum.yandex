import tmpl from './info.hbs';
import compile from '../../../utils/compile';

import { Link, Avatar } from '../../../components';
import { renderDOM } from '../../../utils/renderdom';
import { GlobalEvents } from '../../../utils/globaleventbus';
import User from '../../../utils/user';
import { ModalAvatar } from '../../modals';
import Page, { PageProps } from '../../../utils/page';

export class ProfileInfo extends Page {
  constructor(props: PageProps) {
    super('div', props);

    this.g.EventBus.on(GlobalEvents.USERDATA_UPDATED, this._onUserDataUpdated.bind(this));
  }

  private _onUserDataUpdated(user: User) {
      this.setProps({
          user: user.getData(),
      });
  }

  render() {
    const changeAvatar = new Avatar({
      ...this.props,
      events: {
        click: () => {
            renderDOM('#modal', new ModalAvatar(this.props));
        },
      },
    });

    const linkProfileReturn = new Link({
      class: this.props.styles['arrow-button'],
      imageBeforeClass: this.props.styles['profile-return-button'],
      imageBeforeSrc: this.props.icons.arrowback,
      events: {
        click: () => { 
            this.props.router.go('/chats');            
        },
      },
    });

    const linkChangeInfo = new Link({
      class: `${this.props.styles.link} ${this.props.styles['profile-info-link-change-info']}`,
      text: 'Изменить данные',
      events: {
        click: () => { 
            this.props.router.go('/settings-change');            
        },
      },
    });
    const linkChangePassword = new Link({
      class: `${this.props.styles.link} ${this.props.styles['profile-info-link-change-password']}`,
      text: 'Изменить пароль',
      events: {
        click: () => { 
            this.props.router.go('/settings-password');            
        },
      },
    });
    const linkExit = new Link({
      class: `${this.props.styles.link} ${this.props.styles['profile-info-link-exit']}`,
      text: 'Выйти',
      events: {
        click: () => {
            this.g.EventBus.emit(GlobalEvents.ACTION_LOGOUT, '/');
        },
      },
    });

    return compile(tmpl, {
      changeAvatar,
      linkProfileReturn,
      linkChangeInfo,
      linkChangePassword,
      linkExit,
      ...this.props,
    });
  }
}
