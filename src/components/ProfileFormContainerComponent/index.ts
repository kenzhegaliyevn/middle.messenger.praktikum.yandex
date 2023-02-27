import { validateFactory } from "../../utils/validation";
import Block from "../../core/block/Block";
import { AppState } from "core/store/types";
import { EditUserPageProps } from "./types";
import { store } from "core/store";
import { changeUserDataAction } from "services/user";
import connectStore from "utils/HOCS/connectStore";
import { UserInfoResponse } from "api/signin/types";

class ProfileFormContainerComponent extends Block<EditUserPageProps> {
  static componentName = "ProfileFormContainer";

  constructor(props: EditUserPageProps) {
    super({
      ...props,
      onDataChange: (e: Event) => this.handleEdit(e),
      file: null,
      error: {},
    });
  }

  private getValuesAndNames() {
    return Object.values(this.refs).reduce((acc, component) => {
      const input: Nullable<HTMLInputElement> =
        component!.querySelector("input");
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return { ...acc };
    }, {} as Record<string, string>);
  }

  handleEdit(e: Event) {
    e.preventDefault();
    const valuesAndNames = this.getValuesAndNames();
    const allValid = this.checkValues(valuesAndNames);
    if (allValid) {
      store.dispatch(changeUserDataAction, valuesAndNames);
    }
  }

  checkValues(valuesAndNames: Record<string, string>) {
    return Object.entries(valuesAndNames)
      .map(([name, value]) => {
        if (name === "display_name") return "";
        const isValid = validateFactory(name, value);
        return isValid;
      })
      .every((val) => val === "");
  }

  render() {
    const { userData } = this.props;

    return `
      <div class='profile-container-wrapper'>
        {{{ ButtonBack }}}
        <div class='profile-container'>
          <div class='profile-container__img-wrapper'>
            <img
              name="avatar"
              src='../asserts/avatar.svg'
              alt='avatar'
              class='profile-container__img--center'
            />
          </div>
          <form class="profile-container__form">
            {{{ Input
              id="email"
              fieldName="email"
              fieldType="text"
              fieldLabel="Почта"
              ref="email"
              onFocus=onFocus
              onBlur=onBlur
              error=error.email
              onInput=onChange
              value="${userData.email || ""}"
            }}}
            {{{ Input
              id="login"
              fieldName="login"
              fieldType="text"
              fieldLabel="Логин"
              ref="login"
              error=error.login
              onFocus=onFocus
              onBlur=onBlur
              onInput=onChange
              value="${userData.login || ""}"
            }}}
            {{{ Input
              id="first_name"
              fieldName="first_name"
              fieldType="text"
              fieldLabel="Имя"
              ref="first_name"
              error=error.first_name
              onFocus=onFocus
              onBlur=onBlur
              onInput=onChange
              value="${userData.first_name || ""}"
            }}}
            {{{ Input
              id="second_name"
              fieldName="second_name"
              fieldType="text"
              fieldLabel="Фамилия"
              ref="second_name"
              onFocus=onFocus
              onBlur=onBlur
              error=error.second_name
              onInput=onChange
              value="${userData.second_name || ""}"
            }}}
            {{{ Input
              id="phone"
              fieldName="phone"
              fieldType="text"
              fieldLabel="Телефон"
              ref="phone"
              onFocus=onFocus
              onBlur=onBlur
              error=error.phone
              onInput=onChange
              value="${userData.phone || ""}"
            }}}
            {{{ Input
              id="display_name"
              fieldName="display_name"
              fieldType="text"
              fieldLabel="Имя в чате"
              ref="display_name"
              onFocus=onFocus
              onBlur=onBlur
              error=error.display_name
              onInput=onChange
              value="${userData.display_name || ""}"
            }}}
            {{{ Button text="Сохранить" className='u-margin-top-big' onClick=onDataChange }}}
          </form>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  avatar: state.user.data?.avatar as string,
  userData: state.user.data as UserInfoResponse,
  changeDataError: state.user.error,
  changeDataErrorReason: state.user.errorReason as string,
  loading: state.user.loading,
});

const ProfileFormContainer = connectStore(mapStateToProps)(
  ProfileFormContainerComponent
);

export default ProfileFormContainer;
