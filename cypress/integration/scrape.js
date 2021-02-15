import SiteObject from './site';
import Parser from './parser';
export default class Scrape {
  definition = {};
  commandTree = null;
  commandList = null;
  commandsRead = 0;
  progressPercent = 0;

  results = [];
  constructor(definition) {
    this.definition = definition;
    this.pagination = definition.pagination;
    this.search = definition.search;
  }

  execute() {
    let parser = new Parser(this.definition);
    let tree = parser.generateCommandTree();
    let commandList = tree.read();
    let page = new SiteObject();
    commandList.forEach((command) => {
      page.run(command);
    });
    cy.wait(0).then(() => {
      console.log('r', tree.getResultNodes());
    });
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

  addResult(result) {
    if (!this.isValidResult(result)) {
      return;
    }
    result._id = this.createResultId(result);
    result.search = this.search.terms[this.currentSearchTermIndex - 1];
    if (this.definition.transformFields)
      this.definition.transformFields(result);
    this.results.push(result);
  }

  addResults(results) {
    results.forEach((result) => {
      this.addResult(result);
    });
  }
}
