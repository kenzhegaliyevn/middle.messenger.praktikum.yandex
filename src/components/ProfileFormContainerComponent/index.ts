import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePhone,
} from "../../utils/validation";
import Block from "../../core/block/Block";
import userTestData from "./constants";
import { TUserData } from "./types";

export interface ProfileFormProps {
  userData?: TUserData[];
  editableAvatar?: boolean;
  onClick?: () => void;
}

export default class ProfileFormContainer extends Block {
  static componentName = "ProfileFormContainer";

  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: userTestData,
      onBlur: this.handleBlur.bind(this),
      error: null,
      onClick: (e: Event) => this.handleEdit(e),
      onChange: (e: Event) => this.handleChange(e),
    });
  }

  handleBlur() {
    if (this.props.error === null) {
      this.setProps({
        ...this.props,
        error: {
          email: validateEmail(""),
          login: validateLogin(""),
          first_name: validateFirstName(""),
          second_name: validateFirstName(""),
          phone: validatePhone(""),
          display_name: validateFirstName(""),
        },
      });
    }
  }

  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.state = {
      ...this.state,
      values: {
        ...this.state.values,
        [target.name]: target.value,
      },
    };
  }

  handleEdit(e: Event) {
    e.preventDefault();
    const inputValues = Object.values(this.refs).map((val) => {
      const input = val.querySelector("input") as HTMLInputElement;
      if (input) {
        return {
          [input.name]: input.value,
        };
      }
      return {
        noValue: "",
      };
    });

    console.log(inputValues);
  }

  render() {
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
              value=this.state.values.email
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
            }}}
            {{{ Button text="Сохранить" className='u-margin-top-big' onClick=onClick }}}
          </form>
        </div>
      </div>
    `;
  }
}
