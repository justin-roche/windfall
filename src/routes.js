import DatabasePage from 'pages/Database';
import Execute from 'pages/Execute';
import ScrapeResults from 'pages/Results';

import App from './client/app';

export default [
  {
    component: App,
    routes: [
      {
        component: Execute,
        title: 'Execute Scrape',
        path: '/execute',
      },
      {
        path: '/database',
        title: 'Database',
        component: DatabasePage,
      },
      {
        component: ScrapeResults,
        title: 'Scrape Results',
        path: '/results',
      },
      {
        component: ScrapeResults,
        title: 'Scrape Results',
        path: '/',
      },
    ],
  },
];
