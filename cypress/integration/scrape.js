import SiteObject from './site';
export default class Scrape {
  results = [];
  command = {};
  currentPage = 0;
  currentSearchTermIndex = 0;
  progress = 0;

  constructor(command) {
    this.command = command;
    this.pagination = command.pagination;
    this.search = command.search;
  }

  *searches() {
    for (let i = 0; i < this.search.terms.length; i++) {
      const term = this.search.terms[i];
      this.currentSearchTermIndex = i;
      yield term;
    }
  }

  *paginations() {
    for (let i = 0; i < this.pagination.pages; i++) {
      this.currentPage = i;
      yield i;
    }
  }

  updateProgress() {
    let totalPages = this.search.terms.length * this.pagination.pages;
    let currentPages =
      this.pagination.pages * this.currentSearchTermIndex +
      this.currentPage +
      1;
    let p = (currentPages / totalPages) * 100;
    this.progress = p;
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
    if (this.command.transformFields) this.command.transformFields(result);
    this.results.push(result);
  }

  addResults(results) {
    results.forEach((result) => {
      this.addResult(result);
    });
  }
}
