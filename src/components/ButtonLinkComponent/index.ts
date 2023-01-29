import { Block } from '../../core';

interface ButtonLinkProps {
  className: string;
  text: string;
  onClick: () => void;
}

export default class ButtonLink extends Block {
  static componentName = 'ButtonLink';

  constructor({ className, text, onClick }: ButtonLinkProps) {
    super({ className, text, events: { click: onClick } });
  }

  render(): string {
    return `<a href='' class='btn-link ${this.props.className}'>{{text}}</a>`;
  }
}
