import appRouter from "core/router";
import { store } from "core/store";
import { AppState } from "core/store/types";
import { logOutAction } from "services/login";
import connectStore from "utils/HOCS/connectStore";
import Block from "../../core/block/Block";
import { UserPageProps } from "./types";

class ProfilePageComponent extends Block<UserPageProps> {
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
    const { firstName, avatar, secondName, email, phone, displayName, login } =
      this.props;

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
                <h2 class='profile-container__name' name='display_name'>${firstName}</h2>
                <div class='profile-container__description'>
                    <span>Почта</span>
                    <span name="email">${email || "Нет данных"}</span>
                </div>
                <div class='profile-container__description'>
                    <span>Логин</span>
                    <span name="login">${login || "Нет данных"}</span>
                </div>
                <div class='profile-container__description'>
                    <span>Имя</span>
                    <span name="first_name">${firstName || "Нет данных"}</span>
                </div>
                <div class='profile-container__description'>
                    <span>Фамилия</span>
                    <span name="second_name">${
                      secondName || "Нет данных"
                    }</span>
                </div>
                <div class='profile-container__description'>
                    <span>Имя в чате</span>
                    <span name="display_name">${
                      displayName || "Нет данных"
                    }</span>
                </div>
                <div class='profile-container__description'>
                    <span>Телефон</span>
                    <span name="phone">${phone || "Нет данных"}</span>
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

const mapStateToProps = (state: AppState) => ({
  firstName: state.user.data?.first_name,
  secondName: state.user.data?.second_name,
  email: state.user.data?.email,
  login: state.user.data?.login,
  phone: state.user.data?.phone,
  displayName: state.user.data?.display_name,
  avatar: state.user.data?.avatar,
});

const ProfilePage = connectStore(mapStateToProps)(ProfilePageComponent);

export default ProfilePage;
