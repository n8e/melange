import React from 'react';
import { Route } from 'react-router';

import Home from './components/home/Home';
import App from './containers/App';
import ChatPage from './containers/ChatPage';
import DashboardPage from './containers/DashboardContainer';
import ProfilePage from './containers/ProfilePage';
import LoginContainer from './components/login/LoginContainer';
import LogoutContainer from './components/login/LogoutContainer';

import { viewToken } from './utils/index';

const checkAuth = (ignored, replace) => {
  if (ignored.routes.length === 1 && ignored.routes[0].path === '/' && viewToken()) {
    replace({ pathname: '/home' });
  }
  if (!viewToken()) replace({ pathname: '/login' });
};

export default <Route path="/" component={Home}>
  <Route path="/home" component={App} onEnter={checkAuth} />
  <Route path="/profile" component={ProfilePage} onEnter={checkAuth} />
  <Route path="/login" component={LoginContainer} />
  <Route path="/logout" component={LogoutContainer} />
  <Route path="/dashboard" component={DashboardPage} onEnter={checkAuth} />
  <Route path="/chat" component={ChatPage} onEnter={checkAuth} />
</Route>;
