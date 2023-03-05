import Block from '../block';
import { renderDOM } from '../renderdom';


export default class Route {
    _pathname: string;

    _blockClass: unknown;

    _block: Block<any>;

    _props: any;

    constructor(pathname: string, view: unknown, props: unknown) {
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

            // const className = Chat;
            // this._block = new this._blockClass();

            // const block = Object.create(window[className].prototype);
            // block.constructor.apply(block, )

            // const block = new className();


        }

        renderDOM(this._props.rootQuery, this._block);
    }
}