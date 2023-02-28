import HTTPTransport from '../HTTPTransport';

export interface DeleteChatRequest {
  chatId: number,
}

export interface CreateChatRequest {
  title: string,
}

export interface ChatUsersRequest {
  users: [number],
  chatId: number,
}


export default class ChatAPI {

  private _API: HTTPTransport;

  constructor(baseUrl: string) {
    this._API = new HTTPTransport(baseUrl);
  }
        
  public async list() {
    const response = await this._API.get('/chats');
    return response;
  }
    
  public async create(data: CreateChatRequest) {
    const response = await this._API.post('/chats', { data });
    return response.responseText;
  }    

  public async delete(data: DeleteChatRequest) {
    const response = await this._API.delete('/chats', { data });
    return response;
  }

  public async addUser(data: ChatUsersRequest) {
    const response = await this._API.put('/chats/users', { data });
    return response;
  }

  public async deleteUser(data: ChatUsersRequest) {
    const response = await this._API.delete('/chats/users', { data });
    return response;
  }

  public async getToken(chatId: number) {
    const response = await this._API.post(`/chats/token/${chatId}`);
    return response;
  }    

  public async getUsers(chatId: number) {
    const response = await this._API.get(`/chats/${chatId}/users`);
    return response;
  }    
}