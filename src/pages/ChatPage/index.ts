import Block from "../../core/block/Block";
import { ChatPageProps } from "./types";
import appRouter from "core/router";

class ChatPage extends Block<ChatPageProps> {
  static componentName = "ChatPage";

  constructor(props: ChatPageProps) {
    super(props);
    this.setProps({
      ...props,
      onProfileGo: (e: Event) => this.handleGoToProfilePage(e),
      // onChatCreate: () => this.handleCreateChat(),
      // renderChats: () => {
      //   const chats = selectChats();
      //   const currentChat = selectCurrentChat();
      //   return (
      //     chats &&
      //     chats.map((chat) => ({
      //       id: chat.id,
      //       title: chat.title,
      //       avatar: chat.avatar,
      //       last_message: chat.last_message,
      //       unread_count: chat.unread_count,
      //       activeClassName: () =>
      //         currentChat === chat.id ? "active_chat" : "",
      //       onClick: () => {
      //         store.dispatch({ messages: [] });
      //         closeAllSockets();
      //         store.dispatch(selectChat, chat.id);
      //       },
      //     }))
      //   );
      // },
    });
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    appRouter.go("/profile");
  }

  render(): string {
    return `
      <div class='container'>
        <div class='chat-wrapper'>
          <div class='row'>
            <div class='col-1-of-3'>
              <div class='chat-list-wrapper'>
                <div class='chat-list__header'>
                  {{{ Link
                    text="Профиль >"
                    className="chat_page_left_profile_link"
                    onClick=onProfileGo
                  }}}  
                </div>
                <div class='chat-list__search-wrapper'>
                  <input type='text' placeholder='Поиск' />
                </div>
                <div class='chat-list__item'>
                  <div class='chat-list__item__img'></div>
                  <div class='chat-list__item__text'>
                    <span class='chat-list__item__text--name'>Андрей</span>
                    <span class='chat-list__item__text--msg'>Изображение</span>
                  </div>
                  <div class='chat-list__item-right'>
                    <span class='chat-list__item-right--time'>10:49</span>
                    <span class='chat-list__item-right--notify'>2</span>
                  </div>
                </div>
              </div>
            </div>
            <div class='col-2-of-3'>
              <div class='content-wrapper'>
                <p class='content__text'>
                  Выберите чат чтобы отправить сообщение
                </p>
              </div>
            </div>
          </div>
        </div>      
      </div>
    `;
  }
}

export default ChatPage;
