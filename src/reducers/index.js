import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';
import * as ActionTypes from '../constants';
import paginate from './paginate';
import { getAuthToken } from '../utils';
import fieldsValidationReducer from './fieldsValidationReducer';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE,
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE,
    ],
  }),
});

export const INITIAL_AUTH_STATE = Map({
  isAuthenticated: !!getAuthToken(),
  isFetching: false,
  credentials: Map({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  error: null,
  user: null,
  isShowingLogin: true,
  validations: Map({
    isValid: false,
  }),
});

const authentication = (state = INITIAL_AUTH_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return state.merge(Map({
        isFetching: true,
        credentials: fromJS(action.credentials),
      }));

    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return state.merge(Map({
        isAuthenticated: true,
        isFetching: false,
        credentials: Map({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }),
        error: null,
        user: fromJS(action.user),
      }));

    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return state.merge(Map({
        isAuthenticated: false,
        isFetching: false,
        error: fromJS(action.error),
        user: null,
      }));

    case 'LOGOUT_REQUEST':
      return INITIAL_AUTH_STATE.merge({
        isAuthenticated: false,
      });

    case 'CREDENTIALS_UPDATE':
      return state.merge(Map({
        credentials: fromJS(action.credentials),
      }));

    case 'TOGGLE_LOGIN_VIEW':
      return state.merge(Map({
        isShowingLogin: !state.get('isShowingLogin'),
        error: null,
        validations: Map({
          isValid: false,
        }),
      }));

    /**
     * Validate input fields entered by the user.
     * In this instance, modify the behaviour of the validator based on the
     * fact that we're validating auth fields.
     */
    case 'VALIDATE_AUTH_FIELD':
      return state.merge(fieldsValidationReducer(state, {
        type: action.field,
        target: 'credentials',
        currentView: 'auth',
      }));

    case 'FETCH_USER_DETAILS_SUCCESS':
      return state.merge(Map({
        user: action.user, // BUG: This should be fromJS(action.user)
      }));

    case 'USER_DETAILS_UPDATE_SUCCESS': {
      const user = state.get('user');
      if (user._id === action.user._id) {
        return state.mergeDeep(Map({
          user: action.user, // Propagated BUG: Should be fromJS(action.user)
        }));
      }
      return state;
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  authentication,
  entities,
  pagination,
  errorMessage,
  routing,
});

export default rootReducer;
