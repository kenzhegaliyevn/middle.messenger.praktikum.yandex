import { v4 as makeUUID } from "uuid";
import EventBus from "./eventbus";
import GlobalEventBus from "./globaleventbus";
export default class Block<P extends object> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    _element: HTMLElement;

    _meta: Record<string, unknown> = {};

    props: P;

    _id = "";

    eventBus: () => EventBus;

    g: GlobalEventBus;

    constructor(tagName = "div", props: any) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        this.g = GlobalEventBus.getInstance();

        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createDocumentElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K
    ): HTMLElement {
        return document.createElement(tagName);
    }

    _createResources() {
        const { tagName } = this._meta as {
            tagName: keyof HTMLElementTagNameMap;
        };
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(props: unknown) {
        this.componentDidMount(props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(_props: unknown) {
        return;
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: unknown, newProps: unknown) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(_oldProps: any, _newProps: unknown) {
        return true;
    }

    setProps = (nextProps: unknown) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    _render() {
        const fragment = this.render();
        const element = fragment.firstElementChild;

        if (!element) {
            return;
        }

        this._removeEvents();
        this._element.replaceWith(element);
        this._element = element as HTMLElement;

        this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        return this.element;
    }

    getId(): string {
        return this._id;
    }

    _removeEvents() {
        const { events = {} }: any = this.props;

        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _addEvents() {
        const { events = {} }: any = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _makePropsProxy(props: any) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                if (target[prop] !== value || typeof value === "object") {
                    target[prop] = value;

                    self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                }
                return true;
            },
            deleteProperty(_target, _prop) {
                throw new Error("нет доступа");
            },
        });
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this._element.remove();

        // this.element.innerHTML = '';
        // this.getContent().style.display = 'none';
    }
}
