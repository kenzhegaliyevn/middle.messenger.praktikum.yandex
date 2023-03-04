import tmpl from './chat.hbs';
import compile from '../../utils/compile';

import { Link, Input, ChatInfo } from '../../components';
import { isValid } from '../../utils/validator';
import { renderDOM } from '../../utils/renderdom';
import { GlobalEvents } from '../../utils/globaleventbus';
import { ModalCreateChat } from '../modals';
import User from '../../utils/user';
import { Conversation } from '../conversation';
import Page, { PageProps } from '../../utils/page';

export interface LastMessage {
    user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string,
    }
    time: string,
    content: string,
}
export interface ChatInfoData {
    id: number,
    title: string,
    avatar: string,
    unread_count: number | undefined,
    last_message?: LastMessage,
}

export class Chat extends Page {

    private _chatInfos: ChatInfo[];

    constructor(props: PageProps) {
        super('div', props);

        this.g.EventBus.on(
            GlobalEvents.ACTION_GETCHATS_SUCCEED,
            this._onGetChatsSucceed.bind(this));
        this.g.EventBus.on(
            GlobalEvents.ACTION_GETCHATTOKEN_SUCCEED,
            this._onGetChatTokenSucceed.bind(this));
    }

    private _onGetChatTokenSucceed(data: { id: number, token: string }) {

        User.getInstance().addToken({
            id: data.id,
            token: data.token,
        });

        this.g.EventBus.emit(GlobalEvents.ACTION_CONNECTCHAT, {
            userId: User.getInstance().getData('id'),
            chatId: data.id,
            token: data.token,
        });

        this.g.EventBus.emit(GlobalEvents.ACTION_GETCHATUSERS, data.id);
    }

    private _onGetChatsSucceed(xhr: XMLHttpRequest) {

        this._chatInfos = [];
        const chats: ChatInfoData[] = JSON.parse(xhr.responseText);

        chats.forEach((chat) => {

            let timeString = '';
            if (chat.last_message?.time) {
                // TODO: Сформировать корректный формат времени последнего сообщения
                const time = new Date(chat.last_message.time);
                timeString = `${time.getHours()}:${time.getMinutes()}`;
            }
            const textString = chat.last_message?.content ? chat.last_message.content : '';

            this._chatInfos.push(new ChatInfo({
                title: chat.title,
                avatar: chat.avatar ? chat.avatar : this.props.icons.conversation,
                text: textString,
                unread_count: chat.unread_count,
                time: timeString,
                styles: this.props.styles,
                events: {
                    click: () => {
                        try {
                            const props = { chatId: chat.id, ...this.props };
                            const conversation = new Conversation(props);
                            this.g.EventBus.emit(GlobalEvents.ACTION_GETCHATTOKEN, chat.id);

                            renderDOM('#conversation', conversation);

                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            }));
        });
        this.setProps({
            chatInfos: this._chatInfos,
        });
    }

    private _onFocusChange(event: Event) {
        const element = event.target as HTMLInputElement;
        if (!isValid(element)) {
            element.classList.add(this.props.styles['input-error']);
        } else {
            element.classList.remove(this.props.styles['input-error']);
        }
    }

    render() {

        const chatInfos: ChatInfo[] = [];
        this._chatInfos = chatInfos;

        const linkProfileOpen = new Link({
            text: 'Профиль ',
            class: this.props.styles['link-profile-open'],
            imageAfterSrc: this.props.icons.profilearrow,
            events: {
                click: () => {
                    this.props.router.go('/settings');
                },
            },
        });

        const linkAddChat = new Link({
            text: '+',
            class: this.props.styles['add-chat-container'],
            events: {
                click: () => {
                    const modalCreateChat = new ModalCreateChat({
                        styles: this.props.styles,
                    });

                    renderDOM('#modal', modalCreateChat);
                },
            },
        });

        const inputSearch = new Input({
            type: 'text',
            class: `${this.props.styles.input} ${this.props.styles['input-search-box']}`,
            name: 'search',
            placeholder: ' ',
            events: {
                blur: this._onFocusChange.bind(this),
                focus: this._onFocusChange.bind(this),
            },
        });

        return compile(tmpl, {
            chatInfos,
            linkProfileOpen,
            linkAddChat,
            inputSearch,
            ...this.props,
        });
    }
}
