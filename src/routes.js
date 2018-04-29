import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Home from './components/home/Home';
import ChatPage from './components/chat/ChatPage';
import DashboardPage from './components/dashboard/DashboardContainer';
import ProfilePage from './components/profile/ProfilePage';
import LoginContainer from './components/login/LoginContainer';
import LogoutContainer from './components/login/LogoutContainer';

import { viewToken } from './utils/index';

const checkAuth = (ignored, replace) => {
  if (ignored.routes.length === 1 && ignored.routes[0].path === '/' && viewToken()) {
    replace({ pathname: '/home' });
  }
  if (!viewToken()) replace({ pathname: '/login' });
};

const routes = (
  <Route path="/" component={App}>
    <Route path="home" component={Home}/>
    <Route path="login" component={LoginContainer} />
    <Route path="profile" component={ProfilePage} onEnter={checkAuth} />
    <Route path="logout" component={LogoutContainer} />
    <Route path="dashboard" component={DashboardPage} onEnter={checkAuth} />
    <Route path="chat" component={ChatPage} onEnter={checkAuth} />
  </Route>
);

export default routes;