import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Profile from './Profile';
import { profileUpdate } from '../../actions';

class ProfilePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile.name || '',
      nameColor: this.props.profile.nameColor || '',
      textColor: this.props.profile.textColor || '',
    };

    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.profile.name,
      nameColor: nextProps.profile.nameColor,
      textColor: nextProps.profile.textColor,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleUpdateProfile(profileObj) {
    this.props.dispatch(profileUpdate(profileObj));
  }

  handleClick() {
    const { name, nameColor, textColor } = this.state;
    this.handleUpdateProfile({ userID: this.props.profile.userID, name, nameColor, textColor });
  }

  render() {
    const { name, nameColor, textColor } = this.state;
    return (
      <Profile
        handleUpdateProfile={this.handleUpdateProfile}
        handleClick={this.handleClick}
        handleChange={this.handleChange}
        name={name}
        nameColor={nameColor}
        textColor={textColor}
        {...this.props}
      />
    );
  }
}

ProfilePageContainer.propTypes = {
  profile: PropTypes.shape({
    userID: PropTypes.string,
    name: PropTypes.string,
    nameColor: PropTypes.string,
    textColor: PropTypes.string,
    email: PropTypes.email,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  const profile = state.profile;
  return {
    dispatch,
    profile,
  };
}

export default connect(mapStateToProps)(ProfilePageContainer);
