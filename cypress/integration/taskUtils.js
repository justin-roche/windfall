function logProgress(percent, command) {
  cy.task('progressTask', {
    data: { percent, command },
  }).then((r) => {});
}

function ipcLog(data) {
  cy.task('logTask', { data }).then(() => {});
}

function dbSave(results) {
  cy.task('dbTask', { command: 'save', data: results }).then((db) => {
    console.log('db', db, results);
  });
}

export { logProgress, ipcLog, dbSave };
