import * as importedDefinitions from '../fixtures/definitions';
import Scrape from './scrape';
import { dbSave, ipcLog } from './taskUtils';
let net = require('net');

function save() {
  ipcLog('finished');
  dbSave(s.results);
}

async function runDefinition(definition) {
  ipcLog('starting');
  let s = new Scrape(definition);
  s.execute();
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });
  it.only('gets search results on multiple pages', function () {
    let definitions =
      Cypress.env('definitions') || importedDefinitions.definitions;
    cy.task('logConnectTask', { data: 0 });
    for (const definition of definitions) {
      runDefinition(definition);
    }
  });
});
