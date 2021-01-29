/// <reference types="cypress" />
import _ from 'lodash';

import { commands } from '../fixtures/commands';

let net = require('net');
// ipcReport().then((r) => {});

function clickIfExist(element) {
  cy.get('body').then((body) => {
    if (body.find(element).length > 0) {
      cy.get(element).click();
    }
  });
}

function getChildText(parent, selector) {
  const el = Cypress.$(parent).find(selector);
  let value = 0;
  if (el.length) value = el.last().text().trim();
  return value;
}

function getChildLink(parent, selector) {
  const el = Cypress.$(parent).find(selector);
  let value = 0;
  if (el.length) {
    const last = el[0];
    value = last.href;
  }
  return value;
}
function getInnerHTML(selector, field, resultIndex) {
  cy.get('body').then((body) => {
    let x = body.find(selector);
    if (x.length > 0) {
      x = x[0];
      results[resultIndex][field] = Cypress.$(x).html();
    } else {
    }
  });
}

function getDetailsPage(url, i) {
  cy.log(url);
  cy.visit(url);
  getInnerHTML('#jobDetailsSection', 'details', i);
  getInnerHTML('#jobDescriptionText', 'description', i);
  getInnerHTML('#qualificationsSection', 'qualifications', i);
}

let results = [];

function addResults(currentResults, command) {
  let r = currentResults.map((result) => {
    let x = {
      ...result,
      ...command.document,
      ...{
        _id: {
          title: result.title,
          location: result.location,
          company: result.company,
        },
      },
    };
    if (command.document.transformResults) command.document.transformResults(x);
    return x;
  });
  results.push(...r);
}

function paginate(command) {
  if (command.clear) {
    clickIfExist(command.clear);
  }
  cy.get(command.target).last().click();
}

function getFields(command) {
  return cy.get(command.parentSelector).map((el) => {
    return _.mapValues(command.fields, (value, key) => {
      if (typeof value === 'object' && value.type == 'link') {
        return getChildLink(el, value.target);
      } else {
        return getChildText(el, value);
      }
    });
  });
}

function executeSearch(command) {
  if (command.clear) {
    cy.get(command.clear).type('{selectall}');
    cy.get(command.clear).type('{backspace}');
  }
  cy.get(command.target).type(command.terms).type('{enter}');
}

function searchAndPaginate(command) {
  cy.visit(command.url);
  let searches = command.search.terms;
  for (let i = 0; i < searches.length; i++) {
    cy.task('logTask', { data: 'search' + i }).then(() => {});
    let currentSearch = searches[i];
    executeSearch({ ...command.search, ...{ terms: currentSearch } });
    for (let ii = 0; ii < command.pagination.pages; ii++) {
      getFields(command.resultFields).then((results) => {
        expect(results.length).to.be.greaterThan(0);
        addResults(results, command);
        cy.task('logTask', { data: 'page' + ii }).then(() => {});
        results = results.map((r) => {
          r._searchTerms = currentSearch;
          return r;
        });
      });
      if (i < command.pagination.pages - 1) paginate(command.pagination);
    }
  }
}

function getCommands() {
  let rawdata = fs.readFileSync('./cypress/fixtures/commands.json');
  return JSON.parse(rawdata);
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });

  it.only('gets search results on multiple pages', function () {
    let envCommands = Cypress.env('commands');
    let command = null;
    command = envCommands ? envCommands[1] : commands[1];
    cy.task('logConnectTask', { data: 0 }).then((r) => {
      cy.task('logTask', { data: 'starting' }).then((r) => {
        searchAndPaginate(command);
        cy.task('logTask', { data: 'finished' }).then((r) => {});
        //   cy.task('dbTask', { command: 'save', data: results }).then((db) => {
        //     console.log('db', db, results);
        //   });
      });
    });
  });
});
