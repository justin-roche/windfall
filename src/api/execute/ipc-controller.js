import ipc from 'node-ipc';

ipc.config.id = 'windfall';
ipc.config.socketRoot = './';
ipc.config.retry = 1;
console.log(
  'socket path: ',
  ipc.config.socketRoot + ipc.config.appspace + ipc.config.id,
);
ipc.serve(function () {
  console.log('serving socket');
  ipc.server.on('progress', function (data, socket) {
    ipc.log('progress received : ', data.percent);
  });
  //ipc.server.on('message', function (data, socket) {
  //ipc.log('got a message : '.debug, data);
  //});
});

ipc.server.start();

export default ipc.server;
