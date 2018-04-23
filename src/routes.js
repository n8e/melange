import React from 'react';
import { Route } from 'react-router';
import Header from './containers/Header';
import App from './containers/App';
import ChatPage from './containers/ChatPage';
import DashboardPage from './containers/DashboardContainer';
import ProfilePage from './containers/ProfilePage';
import LoginPage from './containers/LoginPage';
import LogoutView from './containers/LogoutPage';

import { viewToken } from './utils/index';

const checkAuth = (ignored, replace) => {
  if (ignored.routes.length === 1 && ignored.routes[0].path === '/' && viewToken()) {
    replace({ pathname: '/home' });
  }
  if (!viewToken()) replace({ pathname: '/signin' });
};

export default <Route path="/" component={Header}>
  <Route
    path="/home"
    component={App}
    onEnter={checkAuth}
  />
  <Route
    path="/profile"
    component={ProfilePage}
    onEnter={checkAuth}
  />
  <Route
    path="/signin"
    component={LoginPage}
  />
  <Route
    path="/logout"
    component={LogoutView}
  />
  <Route
    path="/dashboard"
    component={DashboardPage}
    onEnter={checkAuth}
  />

  <Route
    path="/chat"
    component={ChatPage}
    onEnter={checkAuth}
  />
</Route>;
