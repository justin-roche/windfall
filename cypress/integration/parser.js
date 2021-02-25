import CommandTree from './tree';
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
        let branches = this.createBranchCommands(config);
        this.commandTree.addCommands(branches);
      } else {
        let command = this.generateCommand(config);
        this.commandTree.addCommand(command);
      }
    });

    return this.commandTree;
  }

  generateDynamicCommandTree(parentNode) {
    let definition = this.definition;
    this.commandTree = new CommandTree();
    this.commandTree.parentNode = parentNode;
    this.commandTree.setRootNode(parentNode);

    parentNode.command.commands.forEach((config) => {
      if (config.forEach) {
        if (config.forEach == '$') {
          let branches = this.createInputBranchCommands(config);
          this.commandTree.addCommands(branches);
        }
      } else {
        config.dynamicInput = parentNode.command.results;
        let command = this.generateCommand(config);
        this.commandTree.addCommand(command);
      }
    });

    return this.commandTree;
  }

  generateCommand(config) {
    if (config.readFields) {
      this.configureReadFields(config);
    }
    let created = new Command(config);
    return created;
  }

  createBranchCommands(config) {
    let valueList = config[config.forEach];
    return valueList.map((element) => {
      let newConfig = _.cloneDeep(config);
      newConfig[config.forEach] = element;
      return this.generateCommand(newConfig);
    });
  }

  createInputBranchCommands(config) {
    let resultList = this.commandTree.parentNode.command.results;
    return resultList.map((element) => {
      let newConfig = _.cloneDeep(config);
      newConfig.dynamicInput = element;
      return this.generateCommand(newConfig);
    });
  }

  configureReadFields(config) {
    config.results = [];
    config.elements = [];
    config.readFields = _.map(config.readFields, (value, key) => {
      if (typeof value === 'object') {
        return { name: key, type: value.type, target: value.target };
      }
      return { name: key, type: 'text', target: value };
    });
    return config;
  }
}

class Command {
  constructor(config) {
    _.map(config, (value, key) => {
      this[key] = value;
    });
  }
}
