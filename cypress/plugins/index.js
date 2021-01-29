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
const MongoClient = require('mongodb').MongoClient;
const ipc = require('node-ipc');
module.exports = (on, config) => {
  on('task', {
    logConnectTask({ data }) {
      return new Promise((resolve, reject) => {
        ipc.config.id = 'hello';
        ipc.config.retry = 3;
        ipc.connectTo('world', function () {
          resolve(true);
        });
      });
    },
    logTask({ data }) {
      return new Promise((resolve, reject) => {
        ipc.of.world.emit(
          'message', //any event or message type your server listens for
          data,
        );
        resolve(true);
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
