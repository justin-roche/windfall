import * as _ from 'lodash';
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

    this.resultNodes = this.resultNodes.concat(
      newNodes.filter((node) => {
        return node.command.results;
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
      return acc.concat(leafNode.addChildNodes(commands));
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
      return acc.concat(node.command.results);
    }, []);
  }
}

class CommandNode {
  children = [];
  command = null;

  constructor(command, parentNode, tree) {
    this.command = command;
    this.parentTree = tree;
    this.parentNode = parentNode;
    this.executed = false;
  }

  addChildNode(command, parentNode) {
    let child = new CommandNode(command, parentNode, this);
    this.children.push(child);
    return child;
  }

  addChildNodes(commands) {
    return commands.map((command) => {
      return this.addChildNode(command);
    });
  }

  readNodes() {
    if (this.children.length == 0) {
      return [this];
    } else {
      let r = [this].concat(
        this.children.reduce((acc, child) => {
          return acc.concat(child.readNodes());
        }, []),
      );
      return r;
    }
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
