import tmpl from './button.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface ButtonProps {
  text: string,
  class?: string,
  events?: {
    click: (e: Event) => void
  }
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
