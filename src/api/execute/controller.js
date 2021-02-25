import cypress from 'cypress';
import ipc from 'node-ipc';
import { genericError } from '../../models/result.model';

ipc.config.id = 'world';
ipc.config.socketRoot = './';
ipc.config.retry = 1;
console.log(
  'socket path: ',
  ipc.config.socketRoot + ipc.config.appspace + ipc.config.id,
);
ipc.serve(function () {
  console.log('serving socket');
  ipc.server.on('progress', function (data, socket) {
    ipc.log('got a message : '.debug, data);
    ipc.log('progress : ', data);
    // ipc.server.emit(socket, 'message', data + ' world!');
  });
  ipc.server.on('message', function (data, socket) {
    ipc.log('got a message : '.debug, data);
    // ipc.log('got a message : ', data);
    // ipc.server.emit(socket, 'message', data + ' world!');
  });
});
ipc.server.start();
function executeScrape(req, res) {
  let commands = req.body.data;
  console.log('--executing ', commands.length, ' commands');
  try {
    return cypress
      .run({
        env: { commands, ipc: true },
        quiet: false,
      })
      .then((r) => {
        req.resultsCollection
          .find()
          .toArray()
          .then((results) => {
            console.log('sending results', results.length);

            return res.json({ data: results });
          });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
}
export const executeScrapeController = () => async (req, res) => {
  let io = req.app.get('socketio');
  server.on('progress', function (data, socket) {
    ipc.log('progress : ', data.percent);
    io.emit('progress', data);
  });
  return executeScrape(req, res);
};
