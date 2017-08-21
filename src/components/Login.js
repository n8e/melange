import React from 'react';
import { PropTypes } from 'prop-types';
import './css/Login.css';

const Login = props => (
  <div className="login-container">
    <div className="title-header">Login</div>
    <div>
      {props.errors.email ? (
        <div className="error-class">{props.errors.email}</div>
      ) : null
      }
      {
        props.errors.password ? (
          <div className="error-class">{props.errors.password}</div>
        ) : null
      }
      <div className="login-input">
        <label htmlFor="login">Email:</label>
        <input
          name="email"
          type="email"
          value={props.auth.credentials.email || ''}
          onBlur={props.onValidateField}
          onChange={props.onFieldUpdate}
          placeholder="email"
          required
        />
      </div>
      <div className="login-input">
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={props.auth.credentials.password || ''}
          onBlur={props.onValidateField}
          onChange={props.onFieldUpdate}
          placeholder="password"
          required
        />
      </div>
      <button className="action-button" onClick={props.onAuthAction}>Login</button>
    </div>
  </div>
);

Login.propTypes = {
  auth: PropTypes.shape({
    credentials: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onValidateField: PropTypes.func,
  onAuthAction: PropTypes.func,
  onFieldUpdate: PropTypes.func,
};

export default Login;
