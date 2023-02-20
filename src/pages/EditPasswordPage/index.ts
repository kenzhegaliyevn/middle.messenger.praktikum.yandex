import Block from '../../core/block/Block';

export default class EditPasswordPage extends Block {
  static componentName = 'EditPasswordPage';

  render(): string {
    return `
      <div class='container'>
        {{{ ProfileFormContainer data='{
            "fields": [
              {
                "fieldLabel": "Старый пароль",
                "fieldName": "oldPassword",
                "fieldType": "password",
                "value": 123
              },
              {
                "fieldLabel": "Новый пароль",
                "fieldName": "newPassword",
                "fieldType": "password",
                "value": 123
              },
              {
                "fieldLabel": "Повторите новый пароль",
                "fieldName": "newPassword",
                "fieldType": "password",
                "value": 123
              }
            ],
            "button": {
              "type": "submit",
              "text": "Сохранить"
            }
          }'}}}
      </div>
    `;
  }
}
