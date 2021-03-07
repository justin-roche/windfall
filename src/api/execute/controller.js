import cypress from 'cypress';

import server from './ipc-controller';

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
    //ipc.log('progress : ', data.percent);
    io.emit('progress', data);
  });
  return executeScrape(req, res);
};
