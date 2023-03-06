import tmpl from './error.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface ErrorProps {
  code: number,
  message: string,
}

export class ErrorComponent extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super('button', props);
  }

  render() {
    return compile(tmpl, {
      ...this.props,
    });
  }
}
