import Contact from 'pages/Contact';
import DatabasePage from 'pages/Database';
import Execute from 'pages/Execute';
import Introduce from 'pages/Introduce';
import Projects from 'pages/Introduce/Projects';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import CreatePost from 'pages/Post/CreatePost';
import PostDetail from 'pages/Post/PostDetail';
import {
  getCommentsAction,
  getPostDetailAction,
} from 'pages/Post/PostDetail/action';
import Register from 'pages/Register';
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
      {
        path: '/p/:_id',
        component: PostDetail,
        loadData: ({ params: { _id } }) => [
          getPostDetailAction(_id),
          getCommentsAction(_id),
        ],
      },
      {
        path: '/create-post',
        component: CreatePost,
        title: 'Create post',
      },
      {
        path: '/login',
        component: Login,
        title: 'Login',
      },
      {
        path: '/register',
        component: Register,
        title: 'Register',
      },
      {
        path: '/introduce/projects',
        component: Projects,
        title: 'Projects',
      },
      {
        path: '/introduce',
        component: Introduce,
        title: 'Introduce',
      },
      {
        path: '/contact',
        component: Contact,
        title: 'Contact',
      },
      {
        component: NotFound,
        title: 'Error',
      },
    ],
  },
];
