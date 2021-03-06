import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Login from './Login';
import { validateAuthField, loginUser, credentialsUpdate } from '../../actions';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        credentials: {
          email: this.props.auth.credentials.email || 'godmetweenciati@gmail.com',
          password: this.props.auth.credentials.password || 'Abcd123!'
        }
      },
      errors: {
        email: null,
        password: null,
      },
    };

    this.handleAuthAction = this.handleAuthAction.bind(this);
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleValidateField = this.handleValidateField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.credentials.email !== this.props.auth.credentials.email) {
      this.setState({ 
        auth : Object.assign({}, this.state.auth, { credentials: Object.assign({}, this.state.auth.credentials, { email: nextProps.auth.credentials.email })})
      })
    }
    if(nextProps.auth.credentials.password !== this.props.auth.credentials.password) {
      this.setState({
        auth : Object.assign({}, this.state.auth, { credentials: Object.assign({}, this.state.auth.credentials, { password: nextProps.auth.credentials.password })})
      })
    }
    if (nextProps.auth.user && nextProps.auth.user.token) {
      // redirect
      browserHistory.push('/dashboard');
    }
  }

  handleFieldUpdate(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let credentials = this.props.auth.credentials;
    credentials = Object.assign({}, credentials, { [name]: value.trim() });
    this.props.dispatch(credentialsUpdate(credentials));
    this.props.dispatch(validateAuthField(name));
  }

  handleValidateField(e) {
    e.preventDefault();
    const { name } = e.target;
    const validations = this.props.auth.validations;
    if (!validations.isValid) {
      this.props.dispatch(validateAuthField(name));
    }
  }

  handleAuthAction() {
    this.props.dispatch(loginUser(this.state.auth.credentials));
  }

  render() {
    return (
      <Login
        onAuthAction={this.handleAuthAction}
        onFieldUpdate={this.handleFieldUpdate}
        onValidateField={this.handleValidateField}
        errors={this.state.errors}
        email={this.state.auth.credentials.email}
        password={this.state.auth.credentials.password}
        {...this.props}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      token: PropTypes.string,
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

export default connect(mapStateToProps)(LoginPageContainer);
