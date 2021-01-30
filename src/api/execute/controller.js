import cypress from 'cypress';
import ipc from 'node-ipc';

import { genericError } from '../../models/result.model';

ipc.config.id = 'world';
ipc.config.retry = 1;
ipc.serve(function () {
  console.log('serving socket');
  ipc.server.on('progress', function (data, socket) {
    // ipc.log('got a message : '.debug, data);
    ipc.log('progress : ', data);
    // ipc.server.emit(socket, 'message', data + ' world!');
  });
  ipc.server.on('message', function (data, socket) {
    // ipc.log('got a message : '.debug, data);
    // ipc.log('got a message : ', data);
    // ipc.server.emit(socket, 'message', data + ' world!');
  });
});
ipc.server.start();
function executeScrape(req, res) {
  let body = req.body;
  console.log('--executing ', body.length, ' commands');
  try {
    return cypress
      .run({
        env: { commands: body },
        quiet: false,
      })
      .then((r) => {
        req.resultsCollection
          .find()
          .toArray()
          .then((results) => {
            return res.json({ data: results });
          });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
}
export const executeScrapeController = () => async (req, res) => {
  let io = req.app.get('socketio');
  ipc.server.on('progress', function (data, socket) {
    ipc.log('progress : ', data.percent);
    io.emit('progress', data);
  });
  return executeScrape(req, res);
};
