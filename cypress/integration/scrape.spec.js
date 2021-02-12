import _ from 'lodash';
import * as importedCommands from '../fixtures/commands';
import { values } from 'redux-form';
let net = require('net');

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
//function getInnerHTML(selector, field, resultIndex) {
//cy.get('body').then((body) => {
//let x = body.find(selector);
//if (x.length > 0) {
//x = x[0];
//_results[resultIndex][field] = Cypress.$(x).html();
//} else {
//}
//});
//}

function getDetailsPage(url, i) {
  cy.log(url);
  cy.visit(url);
  getInnerHTML('#jobDetailsSection', 'details', i);
  getInnerHTML('#jobDescriptionText', 'description', i);
  getInnerHTML('#qualificationsSection', 'qualifications', i);
}

let _results = [];

function addResults(currentResults, command, search) {
  let r = currentResults.filter((el) => {
    console.log('el', el);
    return typeof el.company === 'string';
  });
  console.log('filtered', r);
  r = r.map((result) => {
    //console.log('result', result);
    let x = {
      ...command.document,
      search: search,
      ...result,
      ...{
        _id: {
          title: result.title,
          location: result.location,
          company: result.company,
        },
      },
    };
    if (command.transformFields) command.transformFields(x);
    return x;
  });
  _results.push(...r);
}

function paginate(command) {
  if (command.clear) {
    clickIfExist(command.clear);
  }
  cy.get(command.pagination.target).last().click();
}

function getFields(command) {
  return cy.get(command.parentSelector).map((el) => {
    let values = _.mapValues(command.fields, (value, key) => {
      if (typeof value === 'object' && value.type == 'link') {
        return getChildLink(el, value.target);
      } else {
        return getChildText(el, value);
      }
    });
    //let filtered = _.filter(values, (el) => {
    //return el.title != 0;
    //});
    //console.log('ltered', filtered);
    return values;
  });
}

function executeSearch(command) {
  if (command.clear) {
    cy.get(command.clear).type('{selectall}');
    cy.get(command.clear).type('{backspace}');
  }
  cy.wait(500);

  cy.get(command.target).type(command.terms).type('{enter}');
}
function getProgress(search, page, command) {
  let totalPages = command.search.terms.length * command.pagination.pages;
  let currentPages = command.pagination.pages * search + page + 1;
  let p = (currentPages / totalPages) * 100;
  cy.task('progressTask', {
    data: { percent: p, command: command },
  }).then((r) => {});
}
function searchAndPaginate(command) {
  let searches = command.search.terms;
  cy.task('progressTask', {
    data: { percent: 1, command: command },
  }).then((r) => {});
  for (let i = 0; i < searches.length; i++) {
    cy.task('logTask', { data: 'search' + i }).then(() => {});
    let currentSearch = searches[i];
    cy.visit(command.url);
    executeSearch({ ...command.search, ...{ terms: currentSearch } });
    if (command.pagination.type == 'infinite_scroll') {
      paginateByScroll(i, command);
      getFields(command.resultFields).then((results) => {
        expect(results.length).to.be.greaterThan(0);
        cy.log(results);
        addResults(results, command, currentSearch);
        console.log('final results', _results);
        //cy.task('logTask', { data: 'page' + ii }).then(() => {});
        //getProgress(i, ii, command);
        //_results = _results.map((r) => {
        //r._searchTerms = currentSearch;
        //return r;
        //});
      });
    } else {
      paginateByClick(i, command);
    }
  }
}
function paginateByScroll(i, command) {
  for (let ii = 0; ii < command.pagination.pages; ii++) {
    paginate(command);
  }
}
function paginateByClick(i, command) {
  for (let ii = 0; ii < command.pagination.pages; ii++) {
    getFields(command.resultFields).then((results) => {
      expect(results.length).to.be.greaterThan(0);
      addResults(results, command);
      cy.task('logTask', { data: 'page' + ii }).then(() => {});
      getProgress(i, ii, command);
      results = results.map((r) => {
        r._searchTerms = currentSearch;
        return r;
      });
    });
    if (i < command.pagination.pages - 1) paginate(command.pagination);
  }
}
function getCommands() {
  //let rawdata = fs.readFileSync('./cypress/fixtures/commands.json');
  //return JSON.parse(rawdata);
  return require('../fixtures/commands');
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });
  it.only('gets search results on multiple pages', function () {
    cy.task('logConnectTask', { data: 0 }).then((r) => {
      //cy.task('readFixtureTask', { data: 0 }).then((fixture) => {
      let envCommands = Cypress.env('commands') || importedCommands.commands;
      //console.log('commands', envCommands);
      //console.log('imported commands', importedCommands);
      for (let i = 0; i < envCommands.length; i++) {
        cy.task('logTask', { data: 'starting' }).then((r) => {
          searchAndPaginate(envCommands[i]);
          cy.task('logTask', { data: 'finished' }).then((r) => {});
          cy.task('dbTask', { command: 'save', data: _results }).then((db) => {
            console.log('db', db, _results);
          });
        });
      }
      //});
    });
  });
});
