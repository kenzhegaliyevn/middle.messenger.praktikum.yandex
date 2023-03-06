import tmpl from './image.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

export interface ImageProps {
  src: string,
  class?: string,
  events?: {
    click: (e: Event) => void
  }
}

export class Image extends Block<ImageProps> {
  constructor(props: ImageProps) {
    super('image', props);
  }

  render() {
    return compile(tmpl, this.props);
  }
}
