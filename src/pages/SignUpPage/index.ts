import Block from "../../core/block/Block";
import { CoreRouter } from "core/router/types";
import withRouter from "utils/HOCS/withRouter";
import { store } from "core/store";
import appRouter from "core/router";

type SignUpPageProps = {
  onClick?: (e: Event) => void;
  error?: boolean;
  errorReason?: string;
  loading?: boolean;
};

class SignUpPage extends Block<SignUpPageProps> {
  static componentName = "SignUpPage";

  constructor(props: SignUpPageProps) {
    super({
      ...props,
      onClick: (e: Event) => this.goToSignin(e),
    });
  }

  goToSignin(e: Event) {
    e.preventDefault();
    appRouter.go("/signin");
  }

  render(): string {
    return `
      <div class='container'>
        <div class='form-container-wrapper'>
          <div class='form-container'>
          <h2 class='form-container__header'>Регистрация</h2>
          {{{ SignUpFormContainer }}}
          {{{ ButtonLink text="Войти" className='form-container__link' onClick=onClick }}}
          </div>
        </div>
      </div>
    `;
  }
}

// export default withRouter(SignUpPage);
export default SignUpPage;
