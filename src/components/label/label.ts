import tmpl from './label.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface LabelProps {
  text?: string,
  class?: string
}

export class Label extends Block<LabelProps> {
  constructor(props: LabelProps) {
    super('div', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
