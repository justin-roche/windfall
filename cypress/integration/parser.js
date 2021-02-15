import CommandTree from './tree';
export default class Parser {
  commandTree = null;
  definition = {};

  constructor(definition) {
    this.definition = definition;
  }

  generateCommandTree() {
    let definition = this.definition;
    let c = this.generateNavigateCommand();
    this.commandTree = new CommandTree(c);

    if (definition.search) {
      let c = this.generateSearchCommands();
      this.commandTree.addCommandsToLeafNodes(c);
    }
    if (definition.revealMore) {
      let c = this.generateRevealCommand();
      this.commandTree.addCommandToLeafNodes(c);
    }
    if (definition.listFields) {
      let c = this.generateListExtractionCommand();
      this.commandTree.addCommandToLeafNodes(c);
    }
    return this.commandTree;
  }

  generateNavigateCommand() {
    return new Command({
      type: 'navigate',
      data: { url: this.definition.url },
    });
  }

  generateSearchCommands() {
    return this.definition.search.terms.map((term, i) => {
      let targetDefinition = this.definition.search.target;
      let target = targetDefinition[0];
      let clear = false;
      if (targetDefinition[1] && i > 0) {
        target = targetDefinition[1];
        clear = true;
      }
      return new Command({
        type: 'search',
        data: { target, term, clear },
      });
    });
  }

  generateRevealCommand() {
    return new Command({
      type: 'click',
      data: {
        target: this.definition.revealMore.target,
        repeat: this.definition.revealMore.pages,
      },
    });
  }
  generatePaginationCommand() {
    return new Command({
      type: 'paginate',
      data: { target: this.definition.paginate.target },
    });
  }

  generateListExtractionCommand() {
    return new Command({
      type: 'listExtract',
      data: this.definition.listFields,
      results: [],
    });
  }
}

class Command {
  data = null;
  type = null;
  results = null;
  //preAction: null;
  //postAction: null;
  constructor({ data, type, results }) {
    this.data = data;
    this.type = type;
    this.results = results;
  }
}
