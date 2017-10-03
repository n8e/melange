import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Chat.css';

const getMessageTime = (timeStr) => {
  const dt = new Date(timeStr);
  const hr = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
  const min = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
  return `${hr}:${min}`;
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myColor: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      const msg = e.target.value;
      const chatObj = {
        conversationId: this.props.messaging.conversationId,
        message: msg,
        author: this.props.messaging.name,
      };
      if (!msg) {
        return;
      }
      if (!this.props.messaging.name) {
        this.props.handleSendNameAction(chatObj);
        return;
      }
      this.props.handleSendMessageAction(chatObj);
    }
  }

  renderMessages(messages) {
    return messages.map((message, i) => {
      const msg = message.message;
      return (
        <p key={i}>
          <span style={{ color: msg.color }}>{`${msg.author}: `}</span>
          {`@${getMessageTime(msg.time)}: ${msg.message}`}
        </p>
      );
    });
  }

  render() {
    return (
      <div>
        <div id="content">
          {this.props.messaging.messages && this.props.messaging.messages.length !== 0 ? this.renderMessages(this.props.messaging.messages) : null}
        </div>
        <div>
          <span id="status" style={{ color: '#83254A' }}>{this.props.messaging.name || 'Connecting...'}</span>
          <input
            type="text"
            id="input"
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  messaging: PropTypes.shape({
    conversationId: PropTypes.string,
    name: PropTypes.string,
    messages: PropTypes.array,
  }).isRequired,
  handleSendMessageAction: PropTypes.func.isRequired,
  handleSendNameAction: PropTypes.func.isRequired,
};

export default Chat;
