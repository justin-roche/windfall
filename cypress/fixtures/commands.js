import moment from 'moment';

export let commands = [
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
        term: ['angular', 'react'],
        forEach: 'term',
      },
      //{
      //type: 'click',
      //target: '#loadMoreJobs',
      //repeat: 1,
      //},
      {
        type: 'getListItems',
        parentSelector: '#SearchResults>.card-content',
        ignore: '.apas-ad',
        readFields: {
          location: '.location',
          company: '.company',
          title: '.title',
          date: 'time',
          originalLink: { type: 'link', target: '.title a' },
        },
        commands: [
          {
            type: 'getDetailData',
            forEach: '$',
            reveal: { target: '.title', parent: '$' },
            contentTarget: '#tab-details',
            interrupt: '#expired-job-alert button',
            readFields: {
              salary: '.mux-job-cards',
            },
          },
        ],
      },
    ],
    document: {
      source: 'Monster',
      transformFields: function (result) {
        let daysAgo = result.date.split(' ')[0].replace('+', '');
        result._date = moment()
          .subtract(Number(daysAgo), 'd')
          .format('DD-MM-YY');
        result.hours = result.title.includes('Part-time') ? 'PT' : 'FT';
        result.remote = result.title.includes('Remote') ? true : false;
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
