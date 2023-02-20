import { registerComponent } from "./core";
import { store } from "core/store";
import { initRouter } from "core/router/init";
import appRouter from "core/router";
import { initApp } from "services/login";

// components
import StatusContainer from "./components/StatusContainerComponent";
import FormContainer from "./components/FormContainerComponent";
import Button from "./components/ButtonComponent";
import ButtonLink from "./components/ButtonLinkComponent";
import SignUpFormContainer from "./components/SignUpFormContainerComponent";
import Input from "./components/InputComponent";
import ButtonBack from "./components/ButtonBackComponent";
import ProfileFormContainer from "./components/ProfileFormContainerComponent";

// pages
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EditPasswordPage from "./pages/EditPasswordPage";
import ChangeProfilePage from "./pages/ChangeProfilePage";
import ChatPage from "./pages/ChatPage";

import "./styles/style.scss";

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

document.addEventListener("DOMContentLoaded", () => {
  initRouter(appRouter, store);
  store.dispatch(initApp);
});

// class MyComponent extends Block {
//   static componentName: 'MyComponent';

//   protected getStateFromProps(): void {
//     this.state = {
//       notFoundMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/404`);
//         renderDOM(new NotFoundPage());
//       },
//       errorPageMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/500`);
//         renderDOM(new ErrorPage());
//       },
//       signInPageMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/signin`);
//         renderDOM(new SignInPage());
//       },
//       signUpPageMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/signup`);
//         renderDOM(new SignUpPage());
//       },
//       profileMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/profile`);
//         renderDOM(new ProfilePage());
//       },
//       editPasswordMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState(
//           {},
//           '',
//           `${window.location.origin}/edit-password`
//         );
//         renderDOM(new EditPasswordPage());
//       },
//       changeProfilePageMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState(
//           {},
//           '',
//           `${window.location.origin}/change-profile`
//         );
//         renderDOM(new ChangeProfilePage());
//       },
//       chatPageMethod(e: Event) {
//         e.preventDefault();
//         window.history.pushState({}, '', `${window.location.origin}/chat`);
//         renderDOM(new ChatPage());
//       },
//     };
//   }

//   render() {
//     return `
//       <nav>
//         <ul class="ul-wrapper">
//           <li>
//             {{{Button
//               type='button'
//               text="Авторизация"
//               onClick=signInPageMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="Регистрация"
//               onClick=signUpPageMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="404"
//               onClick=notFoundMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="500"
//               onClick=errorPageMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="Профиль"
//               onClick=profileMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="Изменить пароль"
//               onClick=editPasswordMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="Изменить данные"
//               onClick=changeProfilePageMethod
//             }}}
//           </li>
//           <li>
//             {{{Button
//               type='button'
//               text="Чат"
//               onClick=chatPageMethod
//             }}}
//           </li>
//         </ul>
//       </nav>
//     `;
//   }
// }
// document.addEventListener('DOMContentLoaded', () => {
//   renderDOM(new MyComponent());
// });
