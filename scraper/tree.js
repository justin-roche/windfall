import * as _ from 'lodash';
import CommandNode from './treeNode';

export default class CommandTree {
  rootNode = null;
  layers = [];
  resultNodes = [];

  constructor(command) {
    /*this.rootNode = new CommandNode(command);*/
  }

  readCommands() {
    return this.readNodes().map((node) => {
      return node.command;
    });
  }

  readNodes() {
    return this.rootNode.readNodes();
  }

  updateLeafNodes(fn) {
    let currentLeafNodes = this.layers[this.layers.length - 1];
    let newNodes = currentLeafNodes.reduce((acc, leafNode, i) => {
      return fn(acc, leafNode, i);
    }, []);
    this.layers.push(newNodes);
    this.updateResultNodes(newNodes);
  }

  updateResultNodes(newNodes) {
    this.resultNodes = this.resultNodes.filter((node, i) => {
      return node.command.results && node.children.length == 0;
    });
    this.resultNodes = this.resultNodes.concat(
      newNodes.filter((node) => {
        return node.command.results && node.children.length == 0;
      }),
    );
  }

  setRootNode(node) {
    this.rootNode = node;
    this.layers.push([this.rootNode]);
  }

  addCommand(command) {
    if (!this.rootNode) {
      this.setRootNode(new CommandNode(command));
    } else {
      this.updateLeafNodes((acc, leafNode) => {
        return acc.concat(
          leafNode.addChildNode(_.cloneDeep(command), leafNode),
        );
      });
    }
  }

  addCommands(commands) {
    this.updateLeafNodes((acc, leafNode) => {
      return acc.concat(
        leafNode.addChildNodes(_.cloneDeep(commands), leafNode),
      );
    });
  }

  leafNodes() {
    return this.layers[this.layers.length - 1];
  }

  getResultNodes() {
    return this.resultNodes;
  }

  getResultData() {
    let r = this.getResultNodes();
    return r.reduce((acc, node) => {
      return this.getResultDataForNode(acc, node);
    }, []);
  }

  getResultDataForNode(acc, node) {
    let results = node.command.results;
    if (results && results.length) {
      results = results[0].data;
      if (node.parentData) {
        results = { ...results, ...node.parentData };
      }
      return acc.concat(results);
    } else {
      return acc;
    }
  }
}
