import SiteObject from './site';
import Parser from './parser';
export default class Scrape {
  definition = {};
  commandTree = null;
  commandList = null;
  commandParser = null;
  page = null;
  //
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
    console.log(
      'file: scrape.js ~ line 26 ~ Scrape ~ setCommandList ~ commandList',
      this.commandList,
    );
    this.printCommandList();
  }

  printCommandList() {
    let commandList = this.commandList.map((currentItem) => {
      return currentItem.command.type;
    });
    console.log(
      'file: scrape.js ~ line 37 ~ Scrape ~ printCommandList ~ commandList',
      commandList,
    );
  }

  //generateDynamicCommandList(node) {
  //let definition = { commands: node.command.commands };
  //let parser = new Parser(definition);
  //let tree = parser.generateDynamicCommandTree(node);
  //console.log(
  //'file: scrape.js ~ line 32 ~ Scrape ~ generateDynamicCommandList ~ tree',
  //tree,
  //);
  //return tree.readNodes();
  ////this.runCommandList(node.command.commands);
  //}

  execute() {
    this.setCommandList();
    this.runCommandList(this.commandList);
    this.logResults();
  }

  runCommandList(commandList) {
    commandList.forEach((node) => {
      if (node.executed == false) {
        this.page.run(node.command);
        cy.wait(0).then(() => {
          node.executed = true;
          if (node.command.results) {
            node.handleResultData();
          }

          //if (node.command.commands) {
          //let dynamicList = this.generateDynamicCommandList(node);
          //this.runCommandList(dynamicList);
          //}
        });
      }
    });
  }

  logResults() {
    cy.wait(0).then(() => {
      let r = this.commandTree.getResultData();
      console.log('r', r);
    });
  }

  updateProgress() {
    this.commandsRead += 1;
    this.progress = (this.commandsRead / this.commandList.length) * 100;
  }

  isValidResult(result) {
    return typeof result.company === 'string';
  }

  createResult(result) {
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
