import ipcServer from './ipc-controller';

function addSocketEvents(io) {
  io.on('connection', (s) => {
    console.log('socket CONN');
    s.on('disconnect', () => {
      console.log('socket DISCONN');
    });
  });
  ipcServer.on('progress', function (data, socket) {
    console.log('sending prog ', data.percent);
    io.emit('progress', data);
  });
  ipcServer.on('results', function (data, socket) {
    io.emit('results', data);
  });
}

export default addSocketEvents;
