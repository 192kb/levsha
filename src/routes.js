import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import CreateTaskPage from './components/pages/CreateTaskPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelMenuPage from './components/pages/PanelMenuPage';
import PanelFilterPage from './components/pages/PanelFilterPage';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/task/add/',
    component: CreateTaskPage,
  },
  {
    path: '/panel-left/',
    component: PanelMenuPage,
  },
  {
    path: '/panel-right/',
    component: PanelFilterPage,
  },
  {
    path: '/profile/',
    component: ProfilePage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
