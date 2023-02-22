import Block from "../../core/block/Block";
import appRouter from "core/router";

type SignInPageProps = {
  onClick?: (e: Event) => void;
  error?: boolean;
  errorReason?: string;
  loading?: boolean;
};
class SignInPage extends Block<SignInPageProps> {
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

export default SignInPage;
