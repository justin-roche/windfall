import Parser from './parser';
import SiteObject from './page';
import { ipcSendProgress, ipcSendResults } from './scrapeUtils';

export default class Scrape {
  definition = {};
  commandTree = null;
  commandList = null;
  commandParser = null;
  page = null;

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
      let results = this.finalizeResults();
      ipcSendResults(results);
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
          this.sendProgress(i, commandList.length);
        });
      }
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
    return results;
  }

  sendProgress(current, total) {
    let progress = (current / total) * 100;
    console.log(
      'file: scrape.js ~ line 76 ~ Scrape ~ sendProgress ~ progress',
      progress,
    );
    ipcSendProgress({ percent: progress, name: this.definition.name });
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

  logResults() {
    cy.wait(0).then(() => {
      console.log('r', results);
    });
  }

  printCommandList() {
    let commandList = this.commandList.map((currentItem) => {
      return currentItem.command.type;
    });
  }
}
