import tmpl from './error-message.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface ErrorMessageProps {
  text?: string,
  class?: string,
}

export class ErrorMessage extends Block {
  constructor(props: ErrorMessageProps) {
    super('div', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
