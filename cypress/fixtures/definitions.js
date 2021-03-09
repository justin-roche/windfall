import * as transforms from './transform';

export let definitions = [
  {
    name: 'Monster: React Jobs',
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
  {
    type: 'searchAndPaginate',
    name: 'Indeed: React/Redux Jobs',
    commands: [
      {
        type: 'navigate',
        url: 'https://www.indeed.com',
      },
      {
        type: 'search',
        clear: '#text-input-where',
        target: '#text-input-what',
        term: ['react', 'redux'],
        forEach: 'term',
      },
      {
        type: 'paginate',
        target: '.pagination li',
        clear: '.popover-x-button-close',
        pages: 3,
      },
      {
        type: 'getListItems',
        parentSelector: '.result',
        $: 'parentSelector',
        ignore: '.apas-ad',
        count: 10,
        readFields: {
          title: '.jobtitle',
          location: '.location',
          company: '.company',
          salary: '.salaryText',
          date: '.date',
          remote: '.remote',
          originalLink: { type: 'link', target: '.title a' },
        },
      },
    ],
    document: {
      source: 'Indeed',
      transformFields: 'transformIndeedResults',
    },
  },
];
