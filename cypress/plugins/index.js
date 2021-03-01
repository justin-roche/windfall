/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config

let fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const useIpc = function (config) {
  return config.env.ipc == true;
};
const ipc = require('node-ipc');
module.exports = (on, config) => {
  on('task', {
    readFixtureTask({ data }) {
      console.log('dir', __dirname);
      let rawdata = fs.readFileSync('/fixtures/commands.js');
      return JSON.parse(rawdata);
    },
    logConnectTask({ data }) {
      return new Promise((resolve, reject) => {
        console.log('*********** config ipc', config.env.ipc);
        if (useIpc(config)) {
          ipc.config.id = 'hello';
          ipc.config.socketRoot = './';
          ipc.config.retry = 3;
          ipc.connectTo('world', function () {
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    },
    logTask({ data }) {
      return new Promise((resolve, reject) => {
        if (useIpc(config)) {
          ipc.of.world.emit('message', data);
          resolve(true);
        } else {
          resolve(true);
        }
      });
    },
    progressTask({ data }) {
      return new Promise((resolve, reject) => {
        if (useIpc(config)) {
          ipc.of.world.emit('progress', data);
          resolve(true);
        } else {
          resolve(true);
        }
      });
    },
    dbTask({ command, data }) {
      return new Promise((resolve) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`);
            throw err;
          } else {
            let db = client.db('erb');
            // data = data.map((item) => {
            //   return {
            //     ...item,
            //     ...{
            //       _id: {
            //         title: item.title,
            //         location: item.location,
            //         company: item.company,
            //       },
            //     },
            //   };
            // });
            let ids = data.map((item) => item._id);
            switch (command) {
              case 'save':
                db.collection('results')
                  .remove({ _id: { $in: ids } })
                  .then(() => {
                    db.collection('results')
                      .insertMany(data)
                      .then((r) => {
                        resolve(r);
                      });
                  });
                break;
              case 'read':
                db.collection('results')
                  .find()
                  .toArray()
                  .then((results) => {
                    resolve(results);
                  });
                break;
              default:
                break;
            }
          }
        });
      });
    },
  });
};
