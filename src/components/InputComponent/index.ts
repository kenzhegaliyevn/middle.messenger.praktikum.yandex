import { Block } from '../../core';

interface InputProps {
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  value?: string;
  error?: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

class Input extends Block {
  static componentName = 'Input';

  constructor({
    fieldName,
    fieldType,
    fieldLabel,
    value,
    error,
    onInput,
    onFocus,
    onBlur,
  }: InputProps) {
    super({
      events: {
        input: onInput,
        focusin: onFocus,
        focusout: onBlur,
      },
      fieldName,
      fieldType,
      fieldLabel,
      value,
      error
    });
    console.log(onBlur);
  }

  protected render(): string {
    return `
      <div class="field">
        <label for={{fieldName}} class='field__label'>{{fieldLabel}}</label>
        <input
          id={{fieldName}}
          type={{fieldType}}
          name={{fieldName}}
          class=field__input
          {{#if value}}
          value={{value}}
          {{else}}
          value=""
          {{/if}}  
        />
        {{#if error}}
          <p>{{error}}</p>
        {{/if}}  
      </div>
    `;
  }
}

export default Input;
