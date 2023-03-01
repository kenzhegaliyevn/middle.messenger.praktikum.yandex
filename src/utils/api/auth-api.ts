import HTTPTransport from '../HTTPTransport';
import { UserData } from '../user';

export interface LoginRequest {
  login: string;
  password: string;
}

export default class AuthAPI {

  private _API: HTTPTransport;

  constructor(baseUrl: string) {
    this._API = new HTTPTransport(baseUrl);
  }

  public async login(user: LoginRequest) {
    const response = await this._API.post('/auth/signin', { data: user });
    return response.responseText;
  }

  public async signup(user: UserData) {
    const response = await this._API.post('/auth/signup', { data: user });
    return response.responseText;
  }

  public async logout() {
    const response = await this._API.post('/auth/logout');
    return response.responseText;
  }

  public async getUser() {
    const response = await this._API.get('/auth/user');
    return response;
  }
} 