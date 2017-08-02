/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { resetErrorMessage } from '../actions'

class Header extends Component {
  static propTypes = {
    // Injected by React Router
    children: PropTypes.node
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        { this.props.location.pathname === '/' ? (
          <img src="./assets/Header.jpeg" alt="Header" style={{width:'100%', height:'5%'}}/>) : null
        }
        <hr />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(Header)
