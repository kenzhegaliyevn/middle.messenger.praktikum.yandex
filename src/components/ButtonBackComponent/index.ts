import appRouter from "core/router";
import { Block } from "../../core";
import { ButtonBackProps } from "./types";

export default class ButtonBack extends Block<ButtonBackProps> {
  static componentName = "ButtonBack";

  constructor(props: ButtonBackProps) {
    super({
      ...props,
      events: { click: (e: Event) => this.handleGoBack(e) },
    });
  }

  handleGoBack(e: Event) {
    e.preventDefault();
    appRouter.back();
  }

  render() {
    return `
      <div class='btn-back-wrapper'>
        <div class='btn-back'>
          <a href='#'></a>
        </div>
      </div>
    `;
  }
}
