import Block from "core/block/Block";
import { AppState } from "core/store/types";
import connectStore from "utils/HOCS/connectStore";
import { ChatAreaProps } from "./types";

export class ChatAreaClass extends Block<ChatAreaProps> {
  static componentName = "ChatArea";

  constructor(props: ChatAreaProps) {
    super(props);
    this.setProps({
      ...this.props,
      onDeleteChat: () => this.handleDeleteChat(),
      onInvitePerson: () => this.handleInvitePerson(),
    });
  }

  handleDeleteChat() {
    const { currentChatId } = this.props;
  }

  handleInvitePerson() {
    const { inviteModal } = this.refs;
    inviteModal.setProps({ isShow: true });
  }

  protected render(): string {
    return `
    <div class="chat_page_flex">
      <div>
        {{{ InviteModal
            currentChatId=currentChatId
            ref="inviteModal"
        }}}
        <div class="chat_page_right_chatArea">
          <div class="chat_page_right_chatArea_header">
            <h3>{{ currentChatName }}</h3>
            <div class="chat_page_right_chatArea_header_buttons">
              {{{ Button
                  textBtn="+"
                  className="mr10-right smallBtn"
                  onClick=onInvitePerson
              }}}
              {{{ Button
                  className="smallBtn"
                  textBtn="Удалить чат"
                  onClick=onDeleteChat
              }}}
            </div>
          </div>
          <div class="chat_page_right_chatArea_messages">
          {{#each messages }}
          {{{ ChatMessage
              content=this.content
              type=this.type
              id=this.id
              user_id=this.ser_id
              time=this.time
          }}}
          {{/each}}
          </div>
          {{{ ControlledTextArea currentChatId=currentChatId }}}
        </div>
      </div>
      {{{ ChatUsers chatId=currentChatId}}}
    </div>
  `;
  }
}

const mapStateToProps = (state: AppState) => ({});

export const ChatArea = connectStore(mapStateToProps)(ChatAreaClass);
