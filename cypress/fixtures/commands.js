import moment from 'moment';

export let commands = [
  {
    type: 'searchAndPaginate',
    name: 'Monster Code Teaching',
    url: 'https://www.monster.com',
    search: {
      type: 'search',
      //clear: '#where2',
      //target: '.job-input',
      target: '#q2',
      terms: ['coding tutor'],
    },
    pagination: {
      type: 'infinite_scroll',
      target: '#loadMoreJobs',
      //clear: '.popover-x-button-close',
      pages: 1,
    },
    transformFields: function (result) {
      //console.log('res', result);
      let daysAgo = result.date.split(' ')[0].replace('+', '');
      result._date = moment().subtract(Number(daysAgo), 'd').format('DD-MM-YY');
      result.hours = result.title.includes('Part-time') ? 'PT' : 'FT';
      result.remote = result.title.includes('Remote') ? true : false;
    },
    document: {
      source: 'Monster',
    },
    detailFields: {
      parentSelector: '.title',
      fields: {
        salary: '.mux-job-cards',
      },
    },
    resultFields: {
      type: 'getFields',
      parentSelector: '#SearchResults>.card-content',
      fields: {
        location: '.location',
        company: '.company',
        title: '.title',
        date: 'time',
        originalLink: { type: 'link', target: '.title a' },
      },
    },
  },
  //{
  //type: 'searchAndPaginate',
  //name: 'Indeed Code Teaching',
  //url: 'https://www.indeed.com',
  //search: {
  //type: 'search',
  //clear: '#text-input-where',
  //target: '#text-input-what',
  //terms: ['coding tutor', 'code instructor'],
  //},
  //pagination: {
  //target: '.pagination li',
  //clear: '.popover-x-button-close',
  //pages: 3,
  //},
  //document: {
  //source: 'Indeed',
  //transformResults: function (result) {
  //let daysAgo = result.date.split(' ')[0].replace('+', '');
  //result._date = moment()
  //.subtract(Number(daysAgo), 'd')
  //.format('DD-MM-YY');
  //},
  //},
  //resultFields: {
  //type: 'getFields',
  //parentSelector: '.result',
  //fields: {
  //title: '.jobtitle',
  //location: '.location',
  //company: '.company',
  //salary: '.salaryText',
  //date: '.date',
  //remote: '.remote',
  //originalLink: { type: 'link', target: '.title a' },
  //},
  //},
  //},
];
