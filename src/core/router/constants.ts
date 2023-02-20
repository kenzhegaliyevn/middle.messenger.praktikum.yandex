import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import ProfilePage from "../../pages/ProfilePage";
import ChangeProfilePage from "../../pages/ChangeProfilePage";
import EditPasswordPage from "../../pages/EditPasswordPage";
import ChatPage from "../../pages/ChatPage";
import { BlockClass } from "../types";

export enum Screens {
  SignIn = "signin",
  SignUp = "signup",
  Profile = "profile",
  ChangeProfile = "edit-profile",
  EditPassword = "edit-password",
  Chats = "chats",
}

export const APP_ROUTES = [
  {
    path: "/signin",
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: "/signup",
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: "/profile",
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: "/edit/profile",
    block: Screens.ChangeProfile,
    shouldAuthorized: true,
  },
  {
    path: "/edit/password",
    block: Screens.EditPassword,
    shouldAuthorized: true,
  },
  {
    path: "/chats",
    block: Screens.Chats,
    shouldAuthorized: true,
  },
  {
    path: "*",
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
];

export const routesMap: Record<Screens, BlockClass<any>> = {
  [Screens.SignIn]: SignInPage,
  [Screens.SignUp]: SignUpPage,
  [Screens.Profile]: ProfilePage,
  [Screens.ChangeProfile]: ChangeProfilePage,
  [Screens.EditPassword]: EditPasswordPage,
  [Screens.Chats]: ChatPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return routesMap[screen];
};
