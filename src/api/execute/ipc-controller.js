import ipc from 'node-ipc';

ipc.config.id = 'windfall';
ipc.config.socketRoot = './';
ipc.config.retry = 1;

ipc.serve(function () {
  console.log('serving socket');
  ipc.server.on('progress', function (data, socket) {
    ipc.log('progress received : ', data.percent);
  });
});

ipc.server.start();

export default ipc.server;
