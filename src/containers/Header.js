import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toJS } from 'immutable'; // eslint-disable-line no-unused-vars

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

  renderNavBar() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Melange</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/chat">Chat</NavItem>
            <NavDropdown title={this.props.auth.credentials.email || 'Logged in user'} id="basic-nav-dropdown">
              <MenuItem href="/dashboard">Dashboard</MenuItem>
              <MenuItem divider />
              <MenuItem href="/logout">Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <div>
          { this.props.location.pathname !== '/signin' ? this.renderNavBar() : null }
        </div>
        <div>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication.toJS(),
})

export default connect(mapStateToProps)(Header)
