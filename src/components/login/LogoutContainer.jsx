import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LogoutView from './Logout';
import { logoutUser } from '../../actions';

class LogoutPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(logoutUser());
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.user) {
      // redirect
      browserHistory.push('/login');
    }
  }

  render() {
    return (<LogoutView {...this.props} />);
  }
}

LogoutPageContainer.defaultProps = {
  auth: {
    isShowingLogin: true,
    isFetching: false,
    credentials: {},
    validations: {},
  },
};

LogoutPageContainer.propTypes = {
  auth: PropTypes.shape({
    isShowingLogin: PropTypes.bool,
    isFetching: PropTypes.bool,
    credentials: PropTypes.object,
    validations: PropTypes.object,
    user: PropTypes.object,
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

export default connect(mapStateToProps)(LogoutPageContainer);
