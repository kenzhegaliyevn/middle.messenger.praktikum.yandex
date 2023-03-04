import tmpl from './link.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

interface LinkProps {
  text?: string,
  class?: string,
  imageBeforeClass?: string,
  imageBeforeSrc?: string,
  imageAfterClass?: string,
  imageAfterSrc?: string,
  events?: unknown
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('div', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
