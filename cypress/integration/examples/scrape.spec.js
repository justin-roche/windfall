
/// <reference types="cypress" />
// const cy = require('cypress')

context('Scrape', () => {
    beforeEach(() => {
        cy.visit('https://www.indeed.com/jobs?q=coding+tutor&l=')
        cy.get('#resultsCol').children().get('.result')
            .get('.jobtitle')
            .map((el) => {
                return {title:el.innerText}
            })
            .debug()
    })

    // https://on.cypress.io/interacting-with-elements

    it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type

    })
})