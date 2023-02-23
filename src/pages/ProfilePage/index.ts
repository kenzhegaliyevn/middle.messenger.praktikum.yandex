import appRouter from "core/router";
import { store } from "core/store";
import { logOutAction } from "services/login";
import Block from "../../core/block/Block";
import { UserPageProps } from "./types";

export default class ProfilePage extends Block<UserPageProps> {
  static componentName = "ProfilePage";

  constructor(props: UserPageProps) {
    super({
      ...props,
      editableAvatar: true,
      onEditDataPage: (e: Event) => this.handleGoToEditPage(e),
      onLogout: (e: Event) => this.handleLogout(e),
      onEditPasswordPage: (e: Event) => this.handleGoToEditPasswordPage(e),
      //   onChat: (e: Event) => this.handleGoToChat(e),
    });
  }

  handleGoToEditPage(e: Event) {
    e.preventDefault();
    appRouter.go("/edit/profile");
  }

  handleLogout(e: Event) {
    e.preventDefault();
    store.dispatch(logOutAction);
  }

  handleGoToEditPasswordPage(e: Event) {
    e.preventDefault();
    appRouter.go("/edit/password");
  }

  render(): string {
    return `
        <div class='profile-container-wrapper'>
            {{{ ButtonBack }}}
            <div class='profile-container'>
                <div class='profile-container__img-wrapper'>
                    <img
                        name="avatar"
                        src="../../asserts/avatar.svg"
                        alt="avatar"
                        class='profile-container__img--center'
                    />
                </div>
                <h2 class='profile-container__name' name='display_name'>Иван</h2>
                <div class='profile-container__description'>
                    <span>Почта</span>
                    <span name="email">pochta@yandex.ru</span>
                </div>
                <div class='profile-container__description'>
                    <span>Логин</span>
                    <span name="login">ivanivanov</span>
                </div>
                <div class='profile-container__description'>
                    <span>Имя</span>
                    <span name="first_name">Иван</span>
                </div>
                <div class='profile-container__description'>
                    <span>Фамилия</span>
                    <span name="second_name">Иванов</span>
                </div>
                <div class='profile-container__description'>
                    <span>Имя в чате</span>
                    <span name="display_name">Иван</span>
                </div>
                <div class='profile-container__description'>
                    <span>Телефон</span>
                    <span name="phone">+7 (909) 967 30 30</span>
                </div>
                <div class='profile-container__settings'>
                    {{{ Link text="Изменить данные" onClick=onEditDataPage }}}
                </div>
                <div class='profile-container__settings'>
                    {{{ Link text="Изменить пароль" onClick=onEditPasswordPage  }}}
                </div>
                <div class='profile-container__settings'>
                    {{{ Link text="Выйти" onClick=onLogout  }}}
                </div>
            </div>
        </div>
    `;
  }
}
