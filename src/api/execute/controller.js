import cypress from 'cypress';
import ipc from 'node-ipc';

ipc.config.id = 'world';
ipc.config.retry = 1;
ipc.serve(function () {
  console.log('serving socket');
  ipc.server.on('message', function (data, socket) {
    // ipc.log('got a message : '.debug, data);
    ipc.log('got a message : ', data);
    // ipc.server.emit(socket, 'message', data + ' world!');
  });
});
ipc.server.start();
export const executeScrapeController = () => async (req, res) => {
  let body = req.body;
  console.log('--executing ', body.length, ' commands');
  try {
    cypress
      .run({
        env: { commands: body },
        quiet: true,
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
};
