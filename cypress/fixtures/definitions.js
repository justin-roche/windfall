import * as transforms from './transform';

export let definitions = [
  {
    name: 'Monster Code Teaching',
    commands: [
      {
        type: 'navigate',
        url: 'https://www.monster.com',
      },
      {
        type: 'search',
        target: '#q2,#keywords2',
        term: ['react'],
        forEach: 'term',
      },
      {
        type: 'click',
        target: '#loadMoreJobs',
        repeat: 2,
      },
      {
        type: 'getListItems',
        parentSelector: '#SearchResults>.card-content',
        $: 'parentSelector',
        ignore: '.apas-ad',
        count: 10,
        readFields: {
          location: '.location',
          company: '.company',
          title: '.title',
          date: 'time',
          originalLink: { type: 'link', target: '.title a' },
        },
        forEachResult: [
          {
            type: 'getDetailData',
            target: ['$', '.title'],
            contentTarget: '#tab-details',
            interrupt: '#expired-job-alert button',
            readFields: {
              salary: '.mux-job-cards .mux-card',
              description: '#JobBody',
            },
          },
        ],
      },
    ],
    document: {
      source: 'Monster',
      transformFields: 'transformMonsterResults',
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
