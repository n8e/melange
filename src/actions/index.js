import firebase from 'firebase';
import config from '../config/index';
import { CALL_API, Schemas } from '../middleware/api';
import { storeToken, removeAuthToken } from '../utils';
import connection from '../socket';
import {
  CREDENTIALS_UPDATE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  RESET_ERROR_MESSAGE,
  VALIDATE_AUTH_FIELD,
  VALIDATE_USER_DETAILS_FIELD,
  VALIDATE_ANOTHER_USER_DETAILS_FIELD,
  SENDING_MESSAGE,
  SET_NAME,
  OPEN_EVENT,
  CONNECTION_ERROR,
  BROWSER_NOT_SUPPORTED,
  BROWSER_SUPPORTED,
  REFRESH_MESSAGES,
  COLOR_ACTION,
  HISTORY_ACTION,
  MESSAGE_ACTION,
} from '../constants';

firebase.initializeApp(config);

const constructFirebaseUser = firebaseUser => ({
  data: {
    token: firebaseUser.ze,
    email: firebaseUser.email,
  },
});

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: `users/${login}`,
    schema: Schemas.USER,
  },
});

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login];
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchUser(login));
};

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});


/* AUTH ACTIONS */

export const validateAuthField = field => ({
  type: VALIDATE_AUTH_FIELD,
  field,
});

export const validateUserDetailsField = field => ({
  type: VALIDATE_USER_DETAILS_FIELD,
  field,
});

export const validateAnotherUserDetailsField = field => ({
  type: VALIDATE_ANOTHER_USER_DETAILS_FIELD,
  field,
});

export const credentialsUpdate = credentials => ({
  type: CREDENTIALS_UPDATE,
  credentials,
});

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  credentials,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user: user.data,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error: error.data || { message: error.message },
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  error: error.data || { message: error.message },
});

export const loginUser = credentials => (dispatch) => {
  // Announce to the application that we're performing login
  dispatch(loginRequest(credentials));

  return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      user = constructFirebaseUser(user);
      storeToken(user.data.token);
      dispatch(loginSuccess(user));
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());

  return firebase.auth().signOut()
    .then(() => {
      removeAuthToken();
      dispatch(logoutSuccess());
    })
    .catch((error) => {
      dispatch(logoutFailure(error));
    });
};

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

export const openEvent = () => ({
  type: OPEN_EVENT,
});

export const openEventMethod = () => (dispatch) => {
  dispatch(openEvent());

  return firebase.auth().signOut()
    .then(() => {
      removeAuthToken();
      dispatch(logoutSuccess());
    })
    .catch((error) => {
      dispatch(logoutFailure(error));
    });
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
