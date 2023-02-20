import Block from '../../core/block/Block';

interface StatusContainerProps {
  code: string;
  text: string;
}

export default class StatusContainer extends Block {
  static componentName = 'StatusContainer';

  constructor({ code, text }: StatusContainerProps) {
    super({ code, text });
  }

  render(): string {
    return `
      <div class='status-container-wrapper'>
        <div class='status-container'>
          <h2 class='status-container__code'>{{code}}</h2>
          <h3 class='status-container__text'>{{text}}</h3>
          {{{ ButtonLink text='Назад к чатам' className='status-container__link'}}}
        </div>
      </div>
    `;
  }
}
