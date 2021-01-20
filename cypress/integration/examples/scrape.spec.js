/// <reference types="cypress" />
export function clickIfExist(element) {
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
function getInnerHTML(selector, resultIndex) {
  console.log(selector, resultIndex);
  cy.get(selector).then((x) => {
    console.log(x.html());
    results[resultIndex].description = x.html();
  });
}

function getDetailsPage(url, i) {
  cy.log(url);
  cy.visit(url);
  getInnerHTML('#jobDescriptionText', i);
}

let results = [];

function addResults(currentResults) {
  results.push(...currentResults);
  cy.log('results length', results.length);
}

function paginate() {
  clickIfExist('.popover-x-button-close');
  cy.get('.pagination li').last().click();
}

function getSingleSearchResult(terms) {
  cy.visit('https://www.indeed.com');
  cy.get('#text-input-where').type('{selectall}');
  cy.get('#text-input-where').type('{backspace}');
  cy.get('#text-input-what').type(terms).type('{enter}');
  for (let i = 0; i < 2; i++) {
    getSinglePageResults();
    paginate();
  }
}

function getSinglePageResults() {
  cy.get('.result')
    .map((el) => {
      return {
        title: getChildText(el, '.jobtitle'),
        location: getChildText(el, '.location'),
        company: getChildText(el, '.company'),
        salary: getChildText(el, '.salaryText'),
        date: getChildText(el, '.date'),
        originalLink: getChildLink(el, '.title a'),
        remote: getChildText(el, '.remote'),
        source: 'indeed',
      };
    })
    .then((results) => {
      cy.log('results?');
      cy.log(results);
      expect(results.length).to.be.greaterThan(0);
      addResults(results);
    });
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
  });

  it('gets search results on multiple pages', function () {
    getSingleSearchResult('coding tutor');
    cy.wait(0).then(() => {
      cy.writeFile('./temp/scrape-results.json', JSON.stringify(results));
    });
  });

  it.only('gets iframe data for queue', function () {
    cy.readFile('./temp/scrape-results.json').then((data) => {
      results = data;
      data.forEach((item, i) => {
        // if (i === 0) {
        let url = data[i].originalLink;
        cy.log(url);
        getDetailsPage(url, i);
        // }
      });
      cy.wait(0).then(() => {
        cy.writeFile('./temp/scrape-results.json', JSON.stringify(results));
      });
    });
  });
});
