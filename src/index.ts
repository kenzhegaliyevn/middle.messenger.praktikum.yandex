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
import EditPasswordFormContainer from "./components/EditPasswordFormContainerComponent";
import { Link } from "./components/Link";

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
registerComponent(Link);
registerComponent(EditPasswordFormContainer);

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
