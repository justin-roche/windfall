import * as importedCommands from '../fixtures/commands';
import { values } from 'redux-form';
let net = require('net');

import { logProgress, ipcLog, dbSave } from './taskUtils';
import {
  getChildLink,
  getInnerHTML,
  getChildText,
  clickIfExist,
} from './utils';
import Scrape from './scrape';
import SiteObject from './site';

function x(params) {
  ipcLog('finished');
  dbSave(s.results);
}

//function iteratePages(command) {
//let _g = s.paginations(l);
//let pages = _g.next();
//while (!pages.done) {
////let result = await o.extractListDataAsync();
//pages = _g.next();
//}
//}

function runIterators(command, iterators) {
  if (iterators.length === 0) {
    return true;
  } else {
    let current = iterators.pop();
    let counter = current[0]();
    let count = counter.next();
    let action = current[1];
    while (!count.done) {
      action(count.value);
      runIterators(command, iterators);
      count = counter.next();
    }
  }
}

async function runCommand(command) {
  ipcLog('starting');
  let s = new Scrape(command);
  let o = new SiteObject(command);
  o.navigate();
  let search = [s.searches.bind(s), o.searchWithTerms.bind(o)];
  let extract = [s.searches.bind(s), o.searchWithTerms.bind(o)];
  runIterators(command, [search]);
  let d = o.extractListData().then((d) => {
    console.log('🚀 ~ file: scrape.spec.js ~ line 54 ~ runCommand ~ d', d);
  });
  //o.searchWithTerms(t.value);
  //extractDetailData
  //s.addResults(result);
  //expect(s.results.length).to.be.greaterThan(0);
  //term = g.next();
  //}
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });
  it.only('gets search results on multiple pages', function () {
    let commands = Cypress.env('commands') || importedCommands.commands;
    cy.task('logConnectTask', { data: 0 });
    for (const command of commands) {
      runCommand(command);
    }
  });
});
