#!/usr/bin/env node
import 'dotenv/config';
import DebugLogger from 'debug-logger';
import env from './env';
import app from './app';
import Websockets from './core/Websockets';
import http from 'http';
import socketio, { Socket } from 'socket.io';

const log = DebugLogger('home-network-admin:startup'),
  port = env.port();

const server = http.createServer(app)
  .on('error', (err: Error): void => {
    log.error(err);
    throw err;
  })
  .on('listening', (): void => log.info(`listening on port ${port}`))
  .listen(port);

const io = socketio(server);
io.on('connect', (client: Socket): void => {
  client.on('disconnect', () => Websockets.clientDisconnect(client));
  Websockets.clientConnect(client);
});
