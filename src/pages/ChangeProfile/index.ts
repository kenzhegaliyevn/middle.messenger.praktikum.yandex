import Block from '../../core/Block';

export default class ChangeProfilePage extends Block {
  static componentName = 'ChangeProfilePage';

  constructor() {
    super();
  }

  render(): string {
    return `
      <div class='container'>
        {{{ ProfileFormContainer data='{
          "fields": [
            {
              "fieldLabel": "Почта",
              "fieldName": "email",
              "fieldType": "text",
              "value": "pochta@yandex.ru"
            },
            {
              "fieldLabel": "Логин",
              "fieldName": "login",
              "fieldType": "text",
              "value": "ivanivanov"
            },
            {
              "fieldLabel": "Имя",
              "fieldName": "first_name",
              "fieldType": "text",
              "value": "Иван"
            },
            {
              "fieldLabel": "Фамилия",
              "fieldName": "second_name",
              "fieldType": "text",
              "value": "Иванов"
            },
            {
              "fieldLabel": "Имя в чате",
              "fieldName": "display_name",
              "fieldType": "text",
              "value": "Иван"
            },
            {
              "fieldLabel": "Телефон",
              "fieldName": "phone",
              "fieldType": "text",
              "value": "+7(909)9673030"
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
