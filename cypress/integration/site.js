import {
  $exists,
  getChildLink,
  getInnerHTML,
  getChildText,
  clickIfExist,
} from './utils';
const { _, $ } = Cypress;
export default class SiteObject {
  run(command) {
    this.handleInterrupt(command, this[command.type].bind(this));
  }

  handleInterrupt(command, next) {
    cy.get('body').then(($body) => {
      if ($body.find(command.interrupt).length) {
        clickIfExist(command.interrupt);
      } else {
        next(command);
      }
    });
  }

  navigate(command) {
    cy.visit(command.url);
    cy.wait(5000);
  }

  clearField(command) {
    cy.get(command.target).type('{selectall}');
    cy.get(command.target).type('{backspace}');
  }

  search(command) {
    cy.get(command.target).should('exist');
    cy.get(command.target).should('be.enabled');
    this.clearField(command);
    cy.get(command.target).type(command.term);
    cy.get(command.target).type('{enter}');
  }

  click(command) {
    let repeat = command.repeat || 1;
    for (let i = 0; i < repeat; i++) {
      cy.get(command.target).should('exist');
      cy.get(command.target).click();
    }
    cy.wait(5000);
  }

  paginate() {
    let command = this.command;
    if (command.clear) {
      clickIfExist(command.clear);
    }
    cy.get(this.pagination.target).last().click();
  }

  readFields(command, el) {
    let results = command.readFields.reduce((acc, field) => {
      let value = null;
      if (field.type == 'link') {
        acc[field.name] = getChildLink(el, field.target);
      } else {
        acc[field.name] = getChildText(el, field.target);
      }
      return acc;
    }, {});

    command.results.push({ data: results, element: el });
  }

  getListItems(command) {
    cy.get(command.parentSelector).should('exist');
    let listElements = cy.get(command.parentSelector).not(command.ignore);
    listElements.map((listElement, i) => {
      if (i <= command.count - 1) {
        this.readFields(command, listElement);
      }
    });
  }

  getTarget(command) {
    let scope = cy.get('body');
    if (Array.isArray(command.target)) {
      scope = cy.wrap(command.target[0]);
      let targetElement = scope.find(command.target[1]);
      return targetElement;
    }
    return scope.find(command.target);
  }

  getDetailData(command) {
    let revealElement = this.getTarget(command);
    revealElement.click();
    let content = cy.get(command.contentTarget, { timeout: 10000 });
    content.should('exist');
    content.then((contentElement) => {
      this.readFields(command, contentElement);
    });
  }
}
