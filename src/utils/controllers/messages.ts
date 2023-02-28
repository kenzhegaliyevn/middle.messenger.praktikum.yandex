import { Input } from '../../components';
import WebSocketsAPI, { WSMessage } from '../api/ws-api';

export default class MessagesController {

  _WSAPI: WebSocketsAPI;

  constructor() {
    this._WSAPI = new WebSocketsAPI();
  }

  connectChat(data: { userId: number, chatId: number, token: string }) {
    this._WSAPI.connect(data);
  }

  sendMessage(inputs: Input[]) {

    const element = inputs[0].element as HTMLInputElement;

    const data: WSMessage = {
      content: element.value ? element.value : '',
      type: 'message',
    };

    this._WSAPI.send(data);
  }


}