import Block from "core/block/Block";
import { CreateChatModalProps } from "./types";

export class CreateChatModal extends Block<CreateChatModalProps> {
  static componentName = "CreateChatModal";

  constructor(props: CreateChatModalProps) {
    super({
      ...props,
      onCreate: () => this.handleCreateChat(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: false,
      error: "",
    });
  }

  handleCreateChat() {}

  handleCloseModal() {
    this.setProps({ ...this.props, isShow: false });
  }

  protected render(): string {
    const { isShow } = this.props;
    return `
    {{#if ${isShow}}}
      <div class="overlay">
      <div class="modal-container">
        <div class="modal_container_header">
          <h2>Название чата</h2>
          {{{ CloseButton
              className="modal_container_btn_close"
              text="x"
              onClick=onCloseModal
          }}}
        </div>
        <div class="modal_container_body">
        {{{ Input
            type="text"
            placeholder="Чат"
            ref="chatName"
        }}}
        {{{ ErrorComponent
            error=error
            ref="error"
        }}}
        </div>
        <div class="modal_container_footer">
          {{{ Button textBtn="Ок" onClick=onCreate }}}
        </div>
      </div>
      </div>
      {{/if}}
    `;
  }
}
