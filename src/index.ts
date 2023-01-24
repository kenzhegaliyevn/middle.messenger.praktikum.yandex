import { Block, renderDOM, registerComponent } from './core';
// components
import StatusContainer from './components/StatusContainer';
import FormContainer from './components/FormContainer';
import Button from './components/Button';
import ButtonLink from './components/ButtonLink';

// pages
import NotFoundPage from './pages/NotFound';
import ErrorPage from './pages/Error';
import SignInPage from './pages/SignIn';

import './styles/style.scss';

// components
registerComponent(StatusContainer);
registerComponent(FormContainer);
registerComponent(Button);
registerComponent(ButtonLink);

// pages
registerComponent(NotFoundPage);
registerComponent(ErrorPage);

class MyComponent extends Block {
  static componentName: 'MyComponent';

  protected getStateFromProps(): void {
    this.state = {
      notFoundMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/404`);
        renderDOM(new NotFoundPage());
      },
      errorPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/500`);
        renderDOM(new ErrorPage());
      },
      signInPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/login`);
        renderDOM(new SignInPage());
      },
      // editUserMethod(e: Event) {
      //   e.preventDefault();
      //   window.history.pushState({}, '', `${window.location.origin}/user/edit`);
      //   renderDOM(new EditUserPage());
      // },
      // userPageMethod(e: Event) {
      //   e.preventDefault();
      //   window.history.pushState({}, '', `${window.location.origin}/user`);
      //   renderDOM(new UserPage());
      // },
      // editPasswordMethod(e: Event) {
      //   e.preventDefault();
      //   window.history.pushState({}, '', `${window.location.origin}/edit-password`);
      //   renderDOM(new EditPasswordPage());
      // },
      // notFoundMethod(e: Event) {
      //   e.preventDefault();
      //   window.history.pushState({}, '', `${window.location.origin}/not-found`);
      //   renderDOM(new NotFoundPage());
      // },
      // chatPageMethod(e: Event) {
      //   e.preventDefault();
      //   window.history.pushState({}, '', `${window.location.origin}/chat`);
      //   renderDOM(new ChatPage());
      // },
    };
  }

  // <li><a href="./signup.hbs">Регистрация</a></li>
  // <li><a href="./profile.hbs">Профиль</a></li>
  // <li><a href="./chat.hbs">Чат</a></li>
  // <li><a href="./changeProfile.hbs">Изменить данные</a></li>
  // <li><a href="./changeProfilePassword.hbs">Изменить пароль</a></li>

  render() {
    return `
      <ul class="ul-wrapper">
        <li>
          {{{Button
            type='button'
            text="Авторизация"
            onClick=signInPageMethod
          }}}
        <li>
          {{{Button
            type='button'
            text="404"
            onClick=notFoundMethod
          }}}
        </li>
        <li>
          {{{Button
            type='button'
            text="500"
            onClick=errorPageMethod
          }}}
        </li>
      </ul>
    `;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new MyComponent());
});
