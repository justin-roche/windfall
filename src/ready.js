import { createServer } from 'http';
import socketIO from 'socket.io';

import {
  DB_HOST as host,
  DB_NAME as database,
  DB_PASS as password,
  DB_USER as user,
  NODE_ENV,
  PORT,
} from './config';
import useMongo from './mongo';
import hooks from './tools/hooks';

global.__CLIENT__ = false;
global.__SERVER__ = true;

(async () => {
  hooks();

  try {
    const { default: server } = await import('./server');

    await useMongo({
      host,
      database,
      user,
      password,
      app: server,
    });

    let boundServer = createServer(server).listen(PORT, () => {
      console.log(`Starting the ${NODE_ENV} server...`);
    });
    // var server = http.createServer(app);
    let io = socketIO(boundServer);
    server.set('socketio', io);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
})();
