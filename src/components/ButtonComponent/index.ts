import { Block } from '../../core';

interface ButtonProps {
  className: string;
  text: string;
  onClick: () => void;
  type: string;
}

export default class Button extends Block {
  static componentName = 'Button';

  constructor({ className, text, onClick, type = 'submit' }: ButtonProps) {
    super({ className, text, type, events: { click: onClick } });
  }

  render(): string {
    return `<button type=${this.props.type} class='btn btn--primary ${this.props.className}'>{{text}}</button>`;
  }
}
