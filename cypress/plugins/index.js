let fs = require('fs');
const ipc = require('node-ipc');

const useIpc = function (config) {
  return config.env.ipc == true;
};

module.exports = (on, config) => {
  on('task', {
    ipcConnectTask({ data }) {
      return new Promise((resolve, reject) => {
        if (useIpc(config)) {
          ipc.config.id = 'windfall';
          ipc.config.socketRoot = './';
          ipc.config.retry = 3;
          ipc.connectTo('windfall', function () {
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    },
    progressTask({ data }) {
      return new Promise((resolve, reject) => {
        if (useIpc(config)) {
          ipc.of.windfall.emit('progress', data);
          resolve(true);
        } else {
          resolve(true);
        }
      });
    },
    resultsTask({ data }) {
      return new Promise((resolve, reject) => {
        if (useIpc(config)) {
          ipc.of.windfall.emit('results', data);
          resolve(true);
        } else {
          resolve(true);
        }
      });
    },
  });
  /*logTask({ data }) {*/
  /*return new Promise((resolve, reject) => {*/
  /*if (useIpc(config)) {*/
  /*ipc.of.windfall.emit('message', data);*/
  /*resolve(true);*/
  /*} else {*/
  /*resolve(true);*/
  /*}*/
  /*});*/
  /*},*/
};
