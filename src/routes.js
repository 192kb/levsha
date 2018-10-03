import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import RegisterPage from './components/pages/RegisterPage';
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
    path: '/register/',
    component: RegisterPage,
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
    path: '/about/',
    component: AboutPage,
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
