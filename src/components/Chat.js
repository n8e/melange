import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Chat.css';

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
      if (!msg) {
        return;
      }
      if (!this.props.messaging.name) {
        this.props.handleSendNameAction(msg);
        return;
      }
      this.props.handleSendMessageAction(msg);
    }
  }

  renderMessages(messages) {
    return messages.map((message, i) => {
      const msg = message.message;
      return (
        <p key={i}>
          <span style={{ color: msg.color }}>{msg.author}</span>
          {`@${getMessageTime(msg.time)}: ${msg.text}`}
        </p>
      );
    });
  }

  render() {
    return (
      <div>
        <div id="content">
          {this.props.messaging.content.html ? (<p>{this.props.messaging.content.html}</p>) : null}
          {this.props.messaging.message ? this.renderMessages([this.props.messaging.message]) : null}
        </div>
        <div>
          <span id="status">{this.props.messaging.status.text || 'Connecting...'}</span>
          <input
            type="text"
            id="input"
            style={{ display: this.props.messaging.input.hidden ? 'none' : 'block' }}
            disabled={this.props.messaging.input.disabled}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  messaging: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.shape({
      html: PropTypes.string,
    }),
    input: PropTypes.shape({
      disabled: PropTypes.bool,
      hidden: PropTypes.bool,
    }),
    status: PropTypes.shape({
      text: PropTypes.string,
    }),
  }).isRequired,
  handleSendMessageAction: PropTypes.func.isRequired,
  handleSendNameAction: PropTypes.func.isRequired,
};

export default Chat;
