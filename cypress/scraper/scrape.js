import Parser from './parser';
import SiteObject from './site';
import { ipcSendProgress } from './taskUtils';

export default class Scrape {
  definition = {};
  commandTree = null;
  commandList = null;
  commandParser = null;
  page = null;

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
    commandList.forEach((node, i) => {
      if (node.executed == false) {
        this.page.run(node.command);
        cy.wait(0).then(() => {
          node.executed = true;
          if (node.command.results) {
            node.updateChildrenData();
          }
          this.updateProgress(i, commandList.length);
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

  updateProgress(current, total) {
    let progress = (current / total) * 100;
    console.log(
      'file: scrape.js ~ line 76 ~ Scrape ~ updateProgress ~ progress',
      progress,
    );
    ipcSendProgress(progress, this.definition);
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
