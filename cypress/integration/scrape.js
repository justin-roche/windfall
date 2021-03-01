import SiteObject from './site';
import Parser from './parser';

export default class Scrape {
  definition = {};
  commandTree = null;
  commandList = null;
  commandParser = null;
  page = null;
  commandsRead = 0;
  progressPercent = 0;

  results = [];

  constructor(definition) {
    this.definition = definition;
    this.pagination = definition.pagination;
    this.search = definition.search;
    this.page = new SiteObject();
  }

  setCommandList() {
    this.commandParser = new Parser(this.definition);
    this.commandTree = this.commandParser.generateCommandTree();
    this.commandList = this.commandTree.readNodes();
    this.printCommandList();
  }

  execute() {
    this.setCommandList();
    this.runCommandList(this.commandList);
    cy.wait(0).then((r) => {
      this.finalizeResults();
    });
  }

  runCommandList(commandList) {
    commandList.forEach((node) => {
      if (node.executed == false) {
        this.page.run(node.command);
        cy.wait(0).then(() => {
          node.executed = true;
          if (node.command.results) {
            // this.updateProgress();
            node.updateChildrenData();
          }
        });
      }
    });
  }

  logResults() {
    let self = this;

    cy.wait(0).then(() => {
      console.log('r', results);
    });
  }

  finalizeResults() {
    let results = this.commandTree.getResultData();
    results = results.map((result, i) => {
      result.source = this.definition.document.source;
      result._id = this.createResultId(result);
      if (this.definition.document.transformFields) {
        this.definition.document.transformFields(result);
      }
      return result;
    });
    console.log(
      'file: scrape.js ~ line 84 ~ Scrape ~ results=results.map ~ results',
      results,
    );
  }

  updateProgress() {
    this.commandsRead += 1;
    this.progress = (this.commandsRead / this.commandList.length) * 100;
  }

  isValidResult(result) {
    return typeof result.company === 'string';
  }

  createResultId(result) {
    return {
      title: result.title,
      location: result.location,
      company: result.company,
    };
  }

  printCommandList() {
    let commandList = this.commandList.map((currentItem) => {
      return currentItem.command.type;
    });
  }
}
