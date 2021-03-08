import cypress from 'cypress';
import server from './ipc-controller';

function handleSocket(req) {
  let io = req.app.get('socketio');
  server.on('progress', function (data, socket) {
    io.emit('progress', data);
  });
  server.on('results', function (data, socket) {
    console.log('file: controller.js ~ line 10 ~ data', data);
    io.emit('results', data);
  });
}

async function executeScrape(req, res) {
  let definitions = req.body.data;
  console.log('executing ', definitions.length, ' definitions');
  try {
    let result = await cypress.run({
      env: { definitions, ipc: true },
      quiet: true,
    });
    return res.json({ data: true });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
}

export const executeScrapeController = () => async (req, res) => {
  handleSocket(req);
  return await executeScrape(req, res);
};
