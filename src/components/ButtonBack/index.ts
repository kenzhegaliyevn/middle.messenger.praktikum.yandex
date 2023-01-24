import { Block } from '../../core';

interface ButtonBackProps {
  onClick: () => void;
}

export class ButtonBack extends Block {
  static componentName = 'ButtonBack';

  constructor({ onClick }: ButtonBackProps) {
    super({ events: { click: onClick } });
  }

  render() {
    return `
      <div class='btn-back-wrapper'>
        <div class='btn-back'>
          <a href='#'></a>
        </div>
      </div>
    `;
  }
}
