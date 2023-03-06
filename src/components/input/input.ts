import tmplInput from './input.hbs';
import tmplTextarea from './textarea.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface InputProps {
  type: string,
  name: string,
  class?: string,
  placeholder?: string,
  value?: string,
  validationType?: string,
  accept?: string,
  events?: {
    blur?: () => void,
    focus?: () => void,
    change?: (e: Event) => void
  }
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props);
  }

  render() {

    if (this.props.type === 'textarea') {
      return compile(tmplTextarea, this.props);
    }
    return compile(tmplInput, this.props);
  }
}
