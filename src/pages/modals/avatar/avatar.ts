import tmpl from './avatar.hbs';
import compile from '../../../utils/compile';
import { Button, Input, Label, Link } from '../../../components';
import GlobalEventBus from '../../../utils/globaleventbus';
import Page, { PageProps } from '../../../utils/page';

export class ModalAvatar extends Page {
  constructor(props: PageProps) {
    super('div', {
      ...props,
      events: {
        click: (e: Event) => this.hideModal(e),
      },
    });

    this.g.EventBus.on(
      GlobalEventBus.EVENTS.ACTION_CHANGEAVATAR_FAILED,
      this.onChangeAvatarFailed.bind(this));
  }

  onChangeAvatarFailed(error: string) {
    console.log(error);
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

    const labelFileName = new Label({});

    const inputChooseFile = new Input({
      type: 'file',
      class: this.props.styles.hidden,
      name: 'avatar_file',
      accept: 'image/png, image/jpeg',
      events: {
        change: (e) => {
          const fileElement = e.currentTarget as HTMLInputElement;
          if (fileElement && fileElement.files) {
            console.log(fileElement.files[0].name);
            labelFileName.setProps({
              text: fileElement.files[0].name,
              class: this.props.styles['avatar-modal-file'],
            });
          }            
        },
      },
    });

    const linkChooseFile = new Link({
      text: 'Выбрать файл на компьютере',
      class: `${this.props.styles.link} ${this.props.styles['avatar-modal-choose-file']}`,
      events: {
        click: () => {
          document.querySelector('[type=file]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        },
      },
    });

    const buttonChange = new Button({
      text: 'Поменять',
      class: `${this.props.styles.button} ${this.props.styles['avatar-modal-change-avatar']}`,
      events: {
        click: (e) => {
          e.preventDefault();

          const formData = new FormData();
          const fileElement = inputChooseFile.element as HTMLInputElement;

          console.log(fileElement.files);
          if (fileElement.files) {
            formData.append('avatar', fileElement.files[0]);
            try {
              this.g.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CHANGEAVATAR, formData);
            } catch (error) {
              console.log(error);
            }
          }
        },
      },
    });

    return compile(tmpl, {
      labelFileName,
      linkChooseFile,
      inputChooseFile,
      buttonChange,
      ...this.props,
    });
  }
}
