import Block from "../../core/block/Block";
import { CoreRouter } from "core/router/types";
import withRouter from "utils/HOCS/withRouter";
import { store } from "core/store";

type SignUpPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
};

class SignUpPage extends Block<SignUpPageProps> {
  static componentName = "SignUpPage";

  constructor(props: SignUpPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onClick: (e: Event) => this.goToSignin(e),
    });
  }

  goToSignin(e: Event) {
    e.preventDefault();
    this.props.router.go("/signin");
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

export default withRouter(SignUpPage);
