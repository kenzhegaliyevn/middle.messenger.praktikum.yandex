import Block from '../../core/Block';

export default class ProfileFormContainer extends Block {
  static componentName = 'ProfileFormContainer';

  constructor({ data }: any) {
    super({ data: JSON.parse(data) });
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
            {{#each data.fields}}
              <div class='field'>
                <label for={{fieldName}} class='field__label'>{{fieldLabel}}</label>
                <input
                  type={{fieldType}}
                  id={{fieldName}}
                  class='field__input'
                  name={{fieldName}}
                  value={{value}}
                />
              </div>
            {{/each}}
            {{{ Button text=data.button.text className='u-margin-top-big' }}}
          </form>
        </div>
      </div>
    `;
  }
}
