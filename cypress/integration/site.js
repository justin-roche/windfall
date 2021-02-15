import {
  getChildLink,
  getInnerHTML,
  getChildText,
  clickIfExist,
} from './utils';
const { _, $ } = Cypress;
export default class SiteObject {
  run(command) {
    console.log(
      'file: site.js ~ line 10 ~ SiteObject ~ run ~ command',
      command,
    );
    switch (command.type) {
      case 'navigate':
        this.navigate(command);
        break;
      case 'search':
        this.search(command);
        break;
      case 'click':
        this.click(command);
        break;
      case 'listExtract':
        this.extractListData(command);
        break;
      default:
        break;
    }
  }

  navigate(command) {
    cy.visit(command.data.url);
    cy.wait(5000);
  }

  clearField(command) {
    cy.get(command.data.target).type('{selectall}');
    cy.get(command.data.target).type('{backspace}');
  }

  search(command) {
    cy.get(command.data.target).should('exist');
    if (command.data.clear) {
      this.clearField(command);
    }
    cy.get(command.data.target).type(command.data.term);
    cy.get(command.data.target).type('{enter}');
  }

  click(command) {
    cy.get(command.data.target).should('exist');
    let repeat = command.data.repeat || 1;
    for (let i = 0; i < repeat; i++) {
      cy.get(command.data.target).last().click();
    }
  }

  paginate() {
    let command = this.command;
    if (command.clear) {
      clickIfExist(command.clear);
    }
    cy.get(this.pagination.target).last().click();
  }

  extractListData(command) {
    let data = command.data;
    cy.get(data.parentSelector).should('exist');
    let el = cy.get(data.parentSelector);
    let q = el.map((el) => {
      let results = _.mapValues(data.fields, (value, key) => {
        if (typeof value === 'object' && value.type == 'link') {
          return getChildLink(el, value.target);
        } else {
          return getChildText(el, value);
        }
      });
      command.results.push(results);
    });

    return q;
  }

  async extractListDataAsync() {
    return new Promise((resolve, reject) => {
      this.extractListData().then((data) => {
        console.log(
          '🚀 ~ file: site.js ~ line 76 ~ SiteObject ~ this.extractListData ~ data',
          data,
        );
        resolve(data);
      });
    });
  }
}
