import Block from '../../core/block/Block';

export default class ChangeProfilePage extends Block {
  static componentName = 'ChangeProfilePage';

  constructor() {
    super();
  }

  render(): string {
    return `
      <div class='container'>
        {{{ ProfileFormContainer }}}
      </div>
    `;
  }
}
