import firebase from 'firebase';
import { CALL_API, Schemas } from '../middleware/api';
import { setAuthToken } from '../utils';
import {
  CREDENTIALS_UPDATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  REPO_REQUEST,
  REPO_SUCCESS,
  REPO_FAILURE,
  STARRED_REQUEST,
  STARRED_SUCCESS,
  STARRED_FAILURE,
  STARGAZERS_REQUEST,
  STARGAZERS_SUCCESS,
  STARGAZERS_FAILURE,
  RESET_ERROR_MESSAGE,
  VALIDATE_AUTH_FIELD,
  VALIDATE_USER_DETAILS_FIELD,
  VALIDATE_ANOTHER_USER_DETAILS_FIELD,
} from '../constants';

const config = {
  apiKey: 'AIzaSyCujmohhloRRER17v_oorXT0AqSj4QfXL8',
  authDomain: 'chat-8e588.firebaseapp.com',
  databaseURL: 'https://chat-8e588.firebaseio.com',
  projectId: 'chat-8e588',
  storageBucket: 'chat-8e588.appspot.com',
  messagingSenderId: '162056299678',
};
firebase.initializeApp(config);

const constructFirebaseUser = (firebaseUser) => {
  return {
    data: {
      token: firebaseUser.ze,
      email: firebaseUser.email,
    },
  };
};

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

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO,
  },
});

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName];
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchRepo(fullName));
};

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY,
  },
});

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0,
  } = getState().pagination.starredByUser[login] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStarred(login, nextPageUrl));
};

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  },
});

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0,
  } = getState().pagination.stargazersByRepo[fullName] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl));
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

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user: user.data,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error: error.data || { message: error.message },
});

export const loginUser = (credentials) => {
  return (dispatch) => {
    // Announce to the application that we're performing login
    dispatch(loginRequest(credentials));

    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        user = constructFirebaseUser(user);
        setAuthToken(user.data.token);
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};
