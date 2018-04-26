import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Chat from '../components/chat/Chat';
import { sendChatName, sendChatMessage } from '../actions';

class ChatPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {},
      errors: {
        email: null,
        password: null,
      },
    };

    this.handleSendMessageAction = this.handleSendMessageAction.bind(this);
    this.handleSendNameAction = this.handleSendNameAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user && nextProps.auth.user.token) {
      // redirect
      browserHistory.push('/home');
    }
  }

  handleSendNameAction(text) {
    this.props.dispatch(sendChatName(text));
  }

  handleSendMessageAction(text) {
    this.props.dispatch(sendChatMessage(text));
  }

  render() {
    return (
      <Chat
        handleSendNameAction={this.handleSendNameAction}
        handleSendMessageAction={this.handleSendMessageAction}
        {...this.props}
      />
    );
  }
}

ChatPageContainer.defaultProps = {
  auth: {
    user: {},
  },
};

ChatPageContainer.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dispatch } = state;
  const auth = state.authentication;
  const messaging = state.messaging;
  return {
    dispatch,
    auth,
    messaging,
  };
}

export default connect(mapStateToProps)(ChatPageContainer);
