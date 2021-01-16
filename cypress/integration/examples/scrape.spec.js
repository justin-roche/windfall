/// <reference types="cypress" />

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

let results = [];

function addResults(currentResults) {
  results.push(...currentResults);
  console.log('results length', results.length);
}

function paginate() {
  cy.get('.pagination li').last().click();
}

function getSinglePageResults() {
  const results = cy
    .get('#resultsCol')
    .children()
    .get('.result')
    .map((el) => {
      return {
        title: getChildText(el, '.jobtitle'),
        location: getChildText(el, '.location'),
        company: getChildText(el, '.company'),
        salary: getChildText(el, '.salaryText'),
        date: getChildText(el, '.date'),
        originalLink: getChildLink(el, '.title a'),
      };
    })
    .then((results) => {
      expect(results.length).to.be.greaterThan(0);
      console.log(results.length);
      addResults(results);
    });
}

context('Scrape', () => {
  beforeEach(() => {
    cy.wrap([]).as('results');
    cy.visit('https://www.indeed.com/jobs?q=coding+tutor&l=');
  });

  it('gets search results on multiple pages', () => {
    for (let i = 0; i < 3; i++) {
      getSinglePageResults();
      paginate();
    }
  });
});
