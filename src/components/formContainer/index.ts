import Block from '../../core/Block';

export default class FormContainer extends Block {
  static componentName = 'FormContainer';

  constructor({ data }: any) {
    super({ data });
  }

  render() {
    return `
      <div class='form-container-wrapper'>
        <div class='form-container'>
          <h2 class='form-container__header'>{{data.header}}</h2>
          <form class='form-container__form'>
            {{#each data.fields}}
              <div class='field'>
                <label for={{fieldName}} class='field__label'>\{{fieldLabel}}</label>
                <input
                  type=\{{fieldType}}
                  id=\{{fieldName}}
                  class='field__input'
                  name=\{{fieldName}}
                />
              </div>
            {{/each}}
            {{{ Button text=data.button.text class='u-margin-top-big'}}}
          </form>
          {{{ ButtonLink text=data.subButton class='form-container__link'}}}
        </div>
      </div>
    `;
  }
}
