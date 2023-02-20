import Block from "../../core/block/Block";
import { CoreRouter } from "core/router/types";
import withRouter from "utils/HOCS/withRouter";

type SignInPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
};
class SignInPage extends Block<SignInPageProps> {
  static componentName = "SignInPage";

  constructor(props: SignInPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onClick: (e: Event) => this.goToSignUp(e),
    });
  }

  goToSignUp(e: Event) {
    e.preventDefault();
    this.props.router.go("/signup");
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

export default withRouter(SignInPage);
