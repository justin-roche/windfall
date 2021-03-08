function ipcSendProgress(data) {
  cy.task('progressTask', {
    data,
  });
}

function ipcSendResults(data) {
  cy.task('resultsTask', {
    data,
  });
}
function ipcLog(data) {
  cy.task('logTask', { data });
}

function dbSave(results) {
  cy.task('dbTask', { command: 'save', data: results }).then((db) => {
    console.log('db', db, results);
  });
}

export { ipcSendProgress, ipcLog, dbSave, ipcSendResults };
