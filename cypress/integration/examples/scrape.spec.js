
/// <reference types="cypress" />
// const cy = require('cypress')
function getChildText(parent,selector) {
    const el = Cypress.$(parent).find(selector)
    let value = 0
    if (el.length) value = el.last().text().trim()
    return value
}

function getChildLink(parent,selector) {
    const el = Cypress.$(parent).find(selector)
    let value = 0
    if (el.length) {
        const last = el[0]
        value = last.href
    }
    return value
}

context('Scrape', () => {
    beforeEach(() => {
        cy.visit('https://www.indeed.com/jobs?q=coding+tutor&l=')
    })

    it('gets search results on one page', () => {
        const results = cy.get('#resultsCol').
            children()
            .get('.result')
            .map((el) => {
                return {
                    title:getChildText(el,'.jobtitle'),
                    location:getChildText(el,'.location'),
                    company:getChildText(el,'.company'),
                    salary:getChildText(el,'.salaryText'),
                    date:getChildText(el,'.date'),
                    orinalLink:getChildLink(el,'.title a'),
                }
            })
            .then((results) => {
                expect(results.length).equal(15)
            })

    })
})