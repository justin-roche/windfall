import Scrape from '../../scraper/scrape';
import * as importedDefinitions from '../fixtures/definitions';

async function runDefinition(definition) {
  let scrape = new Scrape(definition);
  scrape.execute();
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });
  it.only('gets search results on multiple pages', function () {
    let definitions =
      Cypress.env('definitions') || importedDefinitions.definitions;
    cy.task('ipcConnectTask', { data: 0 });
    for (const definition of definitions) {
      runDefinition(definition);
    }
  });
});
