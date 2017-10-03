import firebase from 'firebase';
import { CALL_API, Schemas } from '../middleware/api';
import { storeCredentials, removeAuthToken } from '../utils';
import {
  CREDENTIALS_UPDATE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  OPEN_EVENT,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  RESET_ERROR_MESSAGE,
  VALIDATE_AUTH_FIELD,
  VALIDATE_USER_DETAILS_FIELD,
  VALIDATE_ANOTHER_USER_DETAILS_FIELD,
} from '../constants';

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
      storeCredentials({ token: user.data.token, email: user.data.email });
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
