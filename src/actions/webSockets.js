import connection from '../socket';
import {
  SENDING_MESSAGE,
  SET_NAME,
  CONNECTION_ERROR,
  BROWSER_NOT_SUPPORTED,
  BROWSER_SUPPORTED,
  REFRESH_MESSAGES,
  COLOR_ACTION,
  HISTORY_ACTION,
  MESSAGE_ACTION,
} from '../constants';

/* WEBSOCKET CONNECTION ACTIONS */

export const refreshMessages = messages => ({
  type: REFRESH_MESSAGES,
  messages,
});

export const sendingMessage = message => ({
  type: SENDING_MESSAGE,
  message,
});

export const sendingName = message => ({
  type: SET_NAME,
  payload: message,
});

export const sendColorAction = payload => ({
  type: COLOR_ACTION,
  payload,
});

export const sendHistoryAction = payload => ({
  type: HISTORY_ACTION,
  payload,
});

export const sendMessageAction = payload => ({
  type: MESSAGE_ACTION,
  payload,
});

export const sendChatMessage = message => (dispatch) => {
  dispatch(sendingMessage(message));
  connection.send(message);
  connection.onmessage = (message) => {
    let json = {};
    try {
      json = JSON.parse(message.data);
      console.log('JSON>>>>>>>>>>', json);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
      return;
    }

    if (json.type === 'color') {
      dispatch(sendColorAction({ color: json.data }));
    } else if (json.type === 'history') {
      dispatch(sendHistoryAction({ history: json.data }));
    } else if (json.type === 'message') {
      dispatch(sendMessageAction({ message: json.data }));
    } else {
      console.log('Hmm..., I\'ve never seen JSON like this: ', json);
    }
  };
};

export const sendChatName = message => (dispatch) => {
  dispatch(sendingName(message));
  connection.send(message);
  connection.onmessage = (message) => {
    let json = {};
    try {
      json = JSON.parse(message.data);
      console.log('JSON>>>>>>>>>>', json);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
      return;
    }

    if (json.type === 'color') {
      dispatch(sendColorAction({ color: json.data }));
    } else if (json.type === 'history') {
      dispatch(sendHistoryAction({ history: json.data }));
    } else if (json.type === 'message') {
      dispatch(sendMessageAction({ message: json.data }));
    } else {
      console.log('Hmm..., I\'ve never seen JSON like this: ', json);
    }
  };
};

export const connectionError = () => ({
  type: CONNECTION_ERROR,
});

export const browserNotSupported = () => ({
  type: BROWSER_NOT_SUPPORTED,
});

export const browserSupported = () => ({
  type: BROWSER_SUPPORTED,
});

export const testBrowserSupport = () => (dispatch) => {
  if (!window.WebSocket) {
    dispatch(browserNotSupported());
  }
  dispatch(browserSupported());
};
