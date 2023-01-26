import { Block, renderDOM, registerComponent } from './core';
// components
import StatusContainer from './components/StatusContainer';
import FormContainer from './components/FormContainer';
import Button from './components/Button';
import ButtonLink from './components/ButtonLink';
import SignUpFormContainer from './components/SignUpFormContainer';
import Input from './components/Input';
import ButtonBack from './components/ButtonBack';
import ProfileFormContainer from './components/ProfileFormContainer';

// pages
import NotFoundPage from './pages/NotFound';
import ErrorPage from './pages/Error';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProfilePage from './pages/Profile';
import EditPasswordPage from './pages/EditPassword';
import ChangeProfilePage from './pages/ChangeProfile';
import ChatPage from './pages/Chat';

import './styles/style.scss';

// components
registerComponent(StatusContainer);
registerComponent(FormContainer);
registerComponent(SignUpFormContainer);
registerComponent(Button);
registerComponent(ButtonLink);
registerComponent(Input);
registerComponent(ButtonBack);
registerComponent(ProfileFormContainer);

// pages
registerComponent(NotFoundPage);
registerComponent(ErrorPage);
registerComponent(SignInPage);
registerComponent(SignUpPage);
registerComponent(ProfilePage);
registerComponent(EditPasswordPage);
registerComponent(ChangeProfilePage);
registerComponent(ChatPage);

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
        window.history.pushState({}, '', `${window.location.origin}/signin`);
        renderDOM(new SignInPage());
      },
      signUpPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/signup`);
        renderDOM(new SignUpPage());
      },
      profileMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/profile`);
        renderDOM(new ProfilePage());
      },
      editPasswordMethod(e: Event) {
        e.preventDefault();
        window.history.pushState(
          {},
          '',
          `${window.location.origin}/edit-password`
        );
        renderDOM(new EditPasswordPage());
      },
      changeProfilePageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState(
          {},
          '',
          `${window.location.origin}/change-profile`
        );
        renderDOM(new ChangeProfilePage());
      },
      chatPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/chat`);
        renderDOM(new ChatPage());
      },
    };
  }

  render() {
    return `
      <ul class="ul-wrapper">
        <li>
          {{{Button
            type='button'
            text="Авторизация"
            onClick=signInPageMethod
          }}}
        </li>
        <li>
          {{{Button
            type='button'
            text="Регистрация"
            onClick=signUpPageMethod
          }}}
        </li>
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
        <li>
          {{{Button
            type='button'
            text="Профиль"
            onClick=profileMethod
          }}}
        </li>
        <li>
          {{{Button
            type='button'
            text="Изменить пароль"
            onClick=editPasswordMethod
          }}}
        </li>
        <li>
          {{{Button
            type='button'
            text="Изменить данные"
            onClick=changeProfilePageMethod
          }}}
        </li>
        <li>
          {{{Button
            type='button'
            text="Чат"
            onClick=chatPageMethod
          }}}
        </li>
      </ul>
    `;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new MyComponent());
});
