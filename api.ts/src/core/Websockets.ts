import {Socket, Server} from 'socket.io';
import DebugLogger from 'debug-logger';
import _ from 'lodash';

const log = DebugLogger('core:Websockets');

interface WebsocketsMessage {
  [key: string]: any
}

export default class Websockets {
  static clients = {};
  static server: Server = null;
  static clientConnect(client: Socket): void {
    log.info(`client ${client.id} connected.`);
    _.set(Websockets.clients, client.id, client);
  }

  static clientDisconnect(client: Socket): void {
    log.info(`client ${client.id} disconnected.`);
    _.unset(Websockets.clients, client.id);
  }

  static emit(event: string, msg: WebsocketsMessage): void {
    if (Websockets.server) Websockets.server.sockets.emit(event, msg);
  }

  static hasClients(): boolean {
    return _.size(Websockets.clients) > 0;
  }
}
