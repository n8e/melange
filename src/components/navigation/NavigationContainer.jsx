import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Navigation from './Navigation';

class NavigationContainer extends Component {

  render() {
    return (
      <Navigation
        {...this.props}
      />
    );
  }
}

NavigationContainer.propTypes = {
  auth: PropTypes.shape({
    credentials: PropTypes.shape({
      username: PropTypes.string,
    }),
    isShowingLogin: PropTypes.bool,
    isFetching: PropTypes.bool,
    credentials: PropTypes.object,
    validations: PropTypes.object,
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  const auth = state.authentication;
  return {
    dispatch,
    auth,
  };
}

export default connect(mapStateToProps)(NavigationContainer);