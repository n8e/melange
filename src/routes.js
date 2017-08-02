import React from 'react';
import { Route } from 'react-router';
import Header from './containers/Header';
import App from './containers/App';
import UserPage from './containers/UserPage';
import RepoPage from './containers/RepoPage';
import LoginPage from './containers/LoginPage';

export default <Route path="/" component={Header}>
  <Route
    path="/home"
    component={App}
  />
  <Route
    path="/signin"
    component={LoginPage}
  />
  <Route
    path="/:login/:name"
    component={RepoPage}
  />
  <Route
    path="/:login"
    component={UserPage}
  />
</Route>;
