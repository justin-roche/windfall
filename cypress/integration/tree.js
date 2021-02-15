import * as _ from 'lodash';
export default class CommandTree {
  rootNode = null;
  layers = [];
  resultNodes = [];

  constructor(command) {
    this.rootNode = new CommandNode(command);
    this.layers.push([this.rootNode]);
  }

  read() {
    return this.rootNode.read();
  }

  updateLeafNodes(fn) {
    let currentLeafNodes = this.layers[this.layers.length - 1];
    let newNodes = currentLeafNodes.reduce((acc, leafNode, i) => {
      return fn(acc, leafNode, i);
    }, []);

    this.layers.push(newNodes);

    this.resultNodes = this.resultNodes.concat(
      newNodes.filter((node) => {
        return node.command.results;
      }),
    );
  }

  addCommandToLeafNodes(command) {
    this.updateLeafNodes((acc, leafNode) => {
      return acc.concat(leafNode.addChildNode(_.cloneDeep(command)));
    });
  }

  addCommandsToLeafNodes(commands) {
    this.updateLeafNodes((acc, leafNode) => {
      return acc.concat(leafNode.addChildNodes(commands));
    });
  }

  leafNodes() {
    return this.layers[this.layers.length - 1];
  }

  getResultNodes() {
    return this.resultNodes;
  }
}

class CommandNode {
  children = [];
  command = null;

  constructor(command) {
    this.command = command;
  }

  addChildNode(command) {
    let child = new CommandNode(command);
    this.children.push(child);
    return child;
  }

  addChildNodes(commands) {
    return commands.map((command) => {
      return this.addChildNode(command);
    });
  }

  read() {
    let command = this.command;
    if (this.children.length == 0) {
      return [command];
    } else {
      let r = [command].concat(
        this.children.reduce((acc, child) => {
          return acc.concat(child.read());
        }, []),
      );
      return r;
    }
  }
}
