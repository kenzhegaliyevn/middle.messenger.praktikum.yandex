import HTTPTransport from '../HTTPTransport';
import { UserData } from '../user';

export interface PasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface FindUserRequest {
  login: string,
}

export default class UserAPI {
    
  private _API: HTTPTransport;

  constructor(baseUrl: string) {
    this._API = new HTTPTransport(baseUrl);
  }

  public async savePassword(data: PasswordRequest) {
    const response = await this._API.put('/user/password', { data });
    return response.responseText;
  }

  public async saveInfo(user: UserData) {
    const response = await this._API.put('/user/profile', { data: user });
    return response.responseText;
  }

  public async findUser(data: FindUserRequest) {
    const response = await this._API.post('/user/search', { data });
    return response;
  }    

  public async changeAvatar(data: FormData) {
    const response = await this._API.put('/user/profile/avatar', { 
      data, 
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }    
} 