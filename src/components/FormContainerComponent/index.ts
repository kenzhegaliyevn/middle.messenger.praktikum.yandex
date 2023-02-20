import Block from "../../core/block/Block";

export default class FormContainer extends Block {
  static componentName = "FormContainer";

  constructor({ data }: any) {
    super({ data: JSON.parse(data) });
    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
      onBlur: this.handleBlur.bind(this),
      error: "",
    });
  }

  handleBlur() {
    const error = this.props.error as string;
    const items: { [key: string]: HTMLInputElement } = {};

    for (const [key, value] of Object.entries(this.refs)) {
      items[key] = value.children[1] as HTMLInputElement;
    }
    for (const [key, value] of Object.entries(items)) {
      if (this.props.error === "" && value.value === "") {
        this.setProps({
          ...this.props,
          error: "Заполните поля",
        });
      }
    }
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const items: { [key: string]: HTMLInputElement } = {};

    for (const [key, value] of Object.entries(this.refs)) {
      items[key] = value.children[1] as HTMLInputElement;
    }

    if (this.props.error !== "") {
      this.setProps({
        ...this.props,
        error: "",
      });
    }

    for (const [key, value] of Object.entries(items)) {
      if (this.props.error === "" && value.value === "") {
        this.setProps({
          ...this.props,
          error: "Заполните поля",
        });
      }
    }
  }

  render() {
    return `
      <form class='form-container__form'>
        {{{ Input
            id="login"
            fieldName="login"
            fieldType="text"
            fieldLabel="Логин"
            ref="loginInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ Input
          id="password"
          fieldName="password"
          fieldType="password"
          fieldLabel="Пароль"
          ref="passwordInput"
          onFocus=onFocus
          onBlur=onBlur
        }}}
        <p>${this.props.error}</p>
        {{{ Button text=data.button.text className='u-margin-top-big' onClick=onClick}}}
      </form>
    `;
  }
}
