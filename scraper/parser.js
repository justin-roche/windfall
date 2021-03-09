import CommandTree from './tree';
import Command from './command';
import * as _ from 'lodash';
export default class Parser {
  commandTree = null;
  definition = {};

  constructor(definition) {
    this.definition = definition;
  }

  generateCommandTree() {
    let definition = this.definition;
    this.commandTree = new CommandTree();

    definition.commands.forEach((config) => {
      if (config.forEach) {
        let template = this.createBranchCommands(config);
        this.commandTree.addBranchingLayer(template);
      } else {
        let template = new Command(config);
        this.commandTree.addNormalLayer(template);
      }
      if (config.forEachResult) {
        //for commands requiring the results of previous commands as input
        config.forEachResult.forEach((subcommand) => {
          let branches = this.createDuplicateCommands(subcommand, config.count);
          this.commandTree.addBranchingLayer(branches);
          console.log(
            'file: parser.js ~ line 22 ~ Parser ~ definition.commands.forEach ~ branches',
            branches,
          );
        });
      }
    });

    return this.commandTree;
  }

  createBranchCommands(config) {
    let valueList = config[config.forEach];
    return valueList.map((element) => {
      let newConfig = _.cloneDeep(config);
      newConfig[config.forEach] = element;
      return new Command(newConfig);
    });
  }

  createDuplicateCommands(config, n) {
    let nodes = [];
    for (let i = 0; i < n; i++) {
      nodes.push(new Command(config));
    }
    return nodes;
  }

  /*createInputBranchCommands(config) {*/
  /*let resultList = this.commandTree.parentNode.command.results;*/
  /*return resultList.map((element) => {*/
  /*let newConfig = _.cloneDeep(config);*/
  /*newConfig.dynamicInput = element;*/
  /*return new Command(newConfig);*/
  /*});*/
  /*}*/

  /*generateDynamicCommandTree(parentNode) {*/
  /*let definition = this.definition;*/
  /*this.commandTree = new CommandTree();*/
  /*this.commandTree.parentNode = parentNode;*/
  /*this.commandTree.setRootNode(parentNode);*/

  /*parentNode.command.commands.forEach((config) => {*/
  /*if (config.forEach) {*/
  /*if (config.forEach == '$') {*/
  /*let branches = this.createInputBranchCommands(config);*/
  /*this.commandTree.addBranchingLayer(branches);*/
  /*}*/
  /*} else {*/
  /*config.dynamicInput = parentNode.command.results;*/
  /*let command = this.generateCommand(config);*/
  /*this.commandTree.addNormalLayer(command);*/
  /*}*/
  /*});*/

  /*return this.commandTree;*/
  /*}*/
}
