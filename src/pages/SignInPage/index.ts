import Block from "../../core/block/Block";
import appRouter from "core/router";
import { AppState } from "core/store/types";
import connectStore from "utils/HOCS/connectStore";

type SignInPageProps = {
  onClick?: (e: Event) => void;
  error?: boolean;
  errorReason?: string;
  loading?: boolean;
};
class SignInPageComponent extends Block<SignInPageProps> {
  static componentName = "SignInPage";

  constructor(props: SignInPageProps) {
    super({
      ...props,
      onClick: (e: Event) => this.goToSignUp(e),
    });
  }

  goToSignUp(e: Event) {
    e.preventDefault();
    appRouter.go("/signup");
  }

  render(): string {
    return `
      <div class='container'>
        <div class='form-container-wrapper'>
          <div class='form-container'>
            <h2 class='form-container__header'>Вход</h2>
            {{{ FormContainer data='{
              "fields": [
                {
                  "fieldLabel": "Логин",
                  "fieldName": "login",
                  "fieldType": "text",
                  "ref": "loginInput"
                },
                {
                  "fieldLabel": "Пароль",
                  "fieldName": "password",
                  "fieldType": "password",
                  "ref": "passwordInput"
                }
              ],
              "button": {
                "type": "submit",
                "text": "Войти"
              },
              "subButton": "Нет аккаунта?"
            }'}}}
            {{{ ButtonLink text="Нет аккаунта?" className='form-container__link' onClick=onClick }}}
          </div>
        </div>  
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => {
  console.log(state);

  return {};
};
// const mapStateToProps = (state: AppState) => ({
//   error: state.login.error,
//   errorReason: state.login.errorReason,
//   loading: state.login.loading,
// });

const withStore = connectStore(mapStateToProps);
const SignInPage = withStore(SignInPageComponent);

export default SignInPage;
