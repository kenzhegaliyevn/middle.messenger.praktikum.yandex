import Block from '../block';
import { renderDOM } from '../renderdom';

export default class Route {
  _pathname: string;

  _blockClass: any;

  _block: Block;

  _props: any;

  constructor(pathname: string, view: any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
    }

    renderDOM(this._props.rootQuery, this._block);
  }
}
