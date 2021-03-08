function $clickIfExist(element) {
  cy.get('body').then((body) => {
    if (body.find(element).length > 0) {
      cy.get(element).click();
    }
  });
}

function $exists(selector) {
  let element = Cypress.$(selector);
  if (element.length) {
    return true;
  } else {
    return false;
  }
}

function $getChildText(parent, selector) {
  const el = Cypress.$(parent).find(selector);
  let value = el.length ? el.last().text().trim() : null;
  return value;
}

function $getChildLink(parent, selector) {
  const el = Cypress.$(parent).find(selector);
  let value = el.length ? el[0].href : 0;
  return value;
}

export { $clickIfExist, $getChildText, $getChildLink, $exists };
