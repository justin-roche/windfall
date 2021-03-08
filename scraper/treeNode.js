export default class CommandNode {
  children = [];
  command = null;

  constructor(command, parentNode, tree) {
    this.command = command;
    this.command.node = this;
    this.parentTree = tree;
    this.parentNode = parentNode;
    this.executed = false;
  }

  addChildNode(command) {
    let child = new CommandNode(command, this);
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

  updateChildrenData() {
    this.results = this.command.results;
    if (this.command.forEachResult) {
      let self = this;
      this.children.forEach((child, i) => {
        child.parentData = this.results[i].data;
        let childTarget = child.command.target;
        if (Array.isArray(childTarget)) {
          child.command.target = child.command.target.map((element, ii) => {
            if (element == '$') {
              return this.results[i].element;
            }
            return element;
          });
        }
      });
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
