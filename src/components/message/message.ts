import tmpl from './message.hbs';
import Block from '../../utils/block';
import compile from '../../utils/compile';

export interface MessageProps {
    self?: boolean,
    isMessage: boolean,
    time?: string,
    text?: string,
    file?: string,
    date?: string,
    isRead?: boolean,
    styles: Record<string, unknown>,
    icons?: Record<string, unknown>,
}


export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super('div', props);
    }

    render() {
        return compile(tmpl, this.props);
    }
}
