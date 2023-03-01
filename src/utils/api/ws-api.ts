import { config } from '../config';
import GlobalEventBus from '../globaleventbus';

export interface WSMessage {
  content: string | number,
  type: string,
}


export default class WebSocketsAPI {

  _socket: WebSocket;

  connect(data: { userId: number, chatId: number, token: string }) {

    this._socket = new WebSocket(
      `${config.websocketUrl}/${data.userId}/${data.chatId}/${data.token}`,
    );

    this._socket.addEventListener('message', (e: MessageEvent) => {
      GlobalEventBus.instance.EventBus.emit(GlobalEventBus.EVENTS.MESSAGES_RECEIVED, e.data);
    });

    this._socket.addEventListener('open', () => {
      this.getOld(0);
      this.ping();
    });

    this._socket.addEventListener('close', () => {
      console.log('Closing socket');

    });

  }

  send(data: WSMessage) {
    this._socket.send(JSON.stringify(data));
  }

  getOld(count: number) {
    this._socket.send(JSON.stringify({
      content: count,
      type: 'get old',
    }));
  }

  ping() {
    this.send({ 'content': 'ping', 'type': 'ping' });

    setTimeout(this.ping.bind(this), 10000);
  }
}