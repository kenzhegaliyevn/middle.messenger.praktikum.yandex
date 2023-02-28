interface ChatToken {
  id: number,
  token: string,
}

export interface UserData {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  chatTokens?: ChatToken[];
}

type T = keyof UserData;

export default class User {

  private _data: UserData;

  static instance: User;

  constructor(data?: UserData) {
    if (User.instance) {
      return User.instance;
    }

    this._data = data ? data : {};
    User.instance = this;
  }

  public setData(data: UserData) {

    Object.keys(data).forEach((key: T) => {
      (<any> this._data)[key] = data[key];
    });
  }

  public addToken(data: { id: number, token: string }) {

    let newChat = true;
    if (this._data.chatTokens) {
      this._data.chatTokens.forEach((chat) => {
        if (chat.id === data.id) {
          newChat = false;
          chat.token = data.token;
        }
      });
    } else {
      this._data.chatTokens = [];
    }
    if (newChat) {
      this._data.chatTokens?.push(data);
    }
  }

  public getToken(id: number) {

    if (this._data.chatTokens) {
      this._data.chatTokens.forEach((chat) => {
        if (chat.id === id) {
          return chat.token;
        }
      });
    }
    return undefined;
  }


    

  public getData(key?: keyof UserData) {
    if (key) {
      return this._data[key];
    }
    return this._data;
  }

}