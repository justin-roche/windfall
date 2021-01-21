import Contact from 'pages/Contact';
import DatabasePage from 'pages/Database';
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
import ScrapeResults from 'pages/scrape';

import App from './client/app';

export default [
  {
    component: App,
    routes: [
      //   {
      //     path: '/',
      //     exact: true,
      //     component: Post,
      //     title: 'Post',
      //     // loadData: ({ _params }) => [getPostsAction()],
      //   },
      {
        path: '/database',
        title: 'Scrape Results',
        component: DatabasePage,
      },
      {
        component: ScrapeResults,
        path: '/',
        title: 'Database',
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
