import { Input } from '../../components';
import ChatAPI, { CreateChatRequest } from '../api/chat-api';
import { config } from '../config';
import GlobalEventBus from '../globaleventbus';

export default class ChatController {

  private _chatAPI: ChatAPI;

  constructor() {
    this._chatAPI = new ChatAPI(config.baseAPIUrl);
  }

  public async getChats() {

    try {
      const data = await this._chatAPI.list();
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATS_SUCCEED, data);
    } catch (error) {
      console.log('Get chats error: ', error);
    }
  }

  public async createChat(inputs: Input[]) {

    const data: CreateChatRequest = { title: '' };

    inputs.forEach(input => {
      const element = input.element as HTMLInputElement;
      (<any>data)[element.name] = element.value;
    });

    try {
      await this._chatAPI.create(data);
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_CREATECHAT_SUCCEED);
    } catch (error) {
      console.log('Create chat error: ', error);
    }
  }

  public async getChatToken(id: number) {
    try {
      const result = await this._chatAPI.getToken(id);
      const token = JSON.parse(result.responseText).token;
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATTOKEN_SUCCEED, {
        id,
        token,
      });

    } catch (error) {
      console.log('Get chat token error: ', error);
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      const result = await this._chatAPI.getUsers(chatId);
      const users = JSON.parse(result.responseText);
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_GETCHATUSERS_SUCCEED, {
        chatId,
        users,
      });

    } catch (error) {
      console.log('Get chat users error: ', error);
    }
  }

  public async addChatUser(data: { userId: number, chatId: number }) {

    try {
      await this._chatAPI.addUser({
        users: [ data.userId ],
        chatId: data.chatId,
      });
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_ADDCHATUSER_SUCCEED);
    } catch (error) {
      console.log('Add chat user error: ', error);
    }
  }

  public async deleteChatUser(data: { userId: number, chatId: number }) {

    try {
      await this._chatAPI.deleteUser({
        users: [ data.userId ],
        chatId: data.chatId,
      });
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHATUSER_SUCCEED);
    } catch (error) {
      console.log('Delete chat user error: ', error);
    }
  }

  public async deleteChat(chatId: number) {
        
    try {
      await this._chatAPI.delete({
        chatId,
      });
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.ACTION_DELETECHAT_SUCCEED);
    } catch (error) {
      console.log('Delete chat error: ', error);
    }
  }

}