import moment from 'moment';

export let commands = [
  {
    type: 'searchAndPaginate',
    name: 'Monster Code Teaching',
    url: 'https://www.monster.com',
    search: {
      type: 'search',
      clear: '#text-input-where',
      target: '#text-input-what',
      terms: ['coding tutor'],
    },
    pagination: {
      target: '.pagination li',
      clear: '.popover-x-button-close',
      pages: 3,
    },
    document: {
      source: 'Monster',
      transformResults: function (result) {
        let daysAgo = result.date.split(' ')[0].replace('+', '');
        result._date = moment()
          .subtract(Number(daysAgo), 'd')
          .format('DD-MM-YY');
      },
    },
    resultFields: {
      type: 'getFields',
      parentSelector: '.result',
      fields: {
        title: '.jobtitle',
        location: '.location',
        company: '.company',
        salary: '.salaryText',
        date: '.date',
        remote: '.remote',
        originalLink: { type: 'link', target: '.title a' },
      },
    },
  },
  {
    type: 'searchAndPaginate',
    name: 'Indeed Code Teaching',
    url: 'https://www.indeed.com',
    search: {
      type: 'search',
      clear: '#text-input-where',
      target: '#text-input-what',
      terms: ['coding tutor', 'code instructor'],
    },
    pagination: {
      target: '.pagination li',
      clear: '.popover-x-button-close',
      pages: 3,
    },
    document: {
      source: 'Indeed',
      transformResults: function (result) {
        let daysAgo = result.date.split(' ')[0].replace('+', '');
        result._date = moment()
          .subtract(Number(daysAgo), 'd')
          .format('DD-MM-YY');
      },
    },
    resultFields: {
      type: 'getFields',
      parentSelector: '.result',
      fields: {
        title: '.jobtitle',
        location: '.location',
        company: '.company',
        salary: '.salaryText',
        date: '.date',
        remote: '.remote',
        originalLink: { type: 'link', target: '.title a' },
      },
    },
  },
];
