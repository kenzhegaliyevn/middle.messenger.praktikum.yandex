import {
  validateEmail,
  validateFactory,
  validateFirstName,
  validateLogin,
  validatePhone,
} from "../../utils/validation";
import Block from "../../core/block/Block";
import userTestData from "./constants";
import { AppState } from "core/store/types";
import { EditPasswordPageProps } from "./types";
import { store } from "core/store";
import { changeUserDataAction, changeUserPasswordAction } from "services/user";
import connectStore from "utils/HOCS/connectStore";
import { UserInfoResponse } from "api/signin/types";

class EditPasswordFormContainerComponent extends Block<EditPasswordPageProps> {
  static componentName = "EditPasswordFormContainer";

  constructor(props: EditPasswordPageProps) {
    super({
      ...props,
      onClick: () => this.handleChangePassword(),
      // onBlur: (e: Event) => this.handleCheck(e),
    });
  }

  getValues() {
    return Object.values(this.refs).reduce((acc, component) => {
      const input = component!.querySelector("input") as HTMLInputElement;
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return { ...acc };
    }, {} as { [key in string]: string });
  }

  checkIsEmpty(oldPassword: string, newPassword: string, newPassword2: string) {
    if (oldPassword === "" || newPassword === "" || newPassword2 === "") {
      alert("Поле не может быть пустым");
      return true;
    }
    return false;
  }

  checkPasswordsAreEqual(pass1: string, pass2: string) {
    if (pass1 !== pass2) {
      alert("Пароли не совпадают");
      return false;
    }
    return true;
  }

  handleChangePassword() {
    const { oldPassword, newPassword, newPassword2 } = this.getValues();

    if (this.checkIsEmpty(oldPassword, newPassword, newPassword2)) {
      return;
    }
    if (!this.checkPasswordsAreEqual(newPassword, newPassword2)) {
      return;
    }

    store.dispatch(changeUserPasswordAction, {
      oldPassword,
      newPassword,
    });
  }

  render() {
    return `
      <div class='profile-container-wrapper'>
        {{{ ButtonBack }}}
        <div class='profile-container'>
          {{{ Input
            id="oldPassword"
            fieldName="oldPassword"
            fieldType="password"
            fieldLabel="Старый пароль"
            ref="oldPassword"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
          }}}
          {{{ Input
            id="newPassword"
            fieldName="newPassword"
            fieldType="password"
            fieldLabel="Новый пароль"
            ref="newPassword"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{ Input
            id="newPassword2"
            fieldName="newPassword2"
            fieldType="password"
            fieldLabel="Новый пароль"
            ref="newPassword2"
            onFocus=onFocus
            onBlur=onBlur
          }}}
          {{{ Button type="button" text="Сохранить" className='u-margin-top-big' onClick=onClick }}}
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  userData: state.user.data as UserInfoResponse,
});

// @ts-ignore
const EditPasswordFormContainer = connectStore(mapStateToProps)(
  EditPasswordFormContainerComponent
);

export default EditPasswordFormContainer;
