import {
  getChildLink,
  getInnerHTML,
  getChildText,
  clickIfExist,
} from './utils';
export default class SiteObject {
  command;
  pagination;
  search;

  constructor(command) {
    this.command = command;
    this.pagination = command.pagination;
    this.search = command.search;
  }

  navigate() {
    cy.visit(this.command.url);
  }

  searchWithTerms(terms) {
    let search = this.search;
    if (search.clear) {
      cy.get(search.clear).type('{selectall}');
      cy.get(search.clear).type('{backspace}');
    }
    cy.wait(500);
    cy.get(search.target).type(terms).type('{enter}');
  }

  paginate() {
    let command = this.command;
    if (command.clear) {
      clickIfExist(command.clear);
    }
    cy.get(this.pagination.target).last().click();
  }

  extractListData() {
    let command = this.command.listFields;
    return cy.get(command.parentSelector).map((el) => {
      let data = _.mapValues(command.fields, (value, key) => {
        if (typeof value === 'object' && value.type == 'link') {
          return getChildLink(el, value.target);
        } else {
          return getChildText(el, value);
        }
      });
      return data;
    });
  }

  async extractListDataAsync() {
    return new Promise((resolve, reject) => {
      this.extractListData().then((data) => {
        resolve(data);
      });
    });
  }
}
