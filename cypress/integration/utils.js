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
export { clickIfExist, getChildText, getChildLink };
