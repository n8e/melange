import { getEmail } from '../utils';

export const INITIAL_PROFILE_STATE = {
  userID: null,
  email: getEmail(),
  name: null,
  nameColor: null,
  textColor: null,
};

const profile = (state = INITIAL_PROFILE_STATE, action) => {
  switch (action.type) {
    case 'PROFILE_NAME_CHANGE_REQUEST':
      return Object.assign({}, state, {
        name: action.payload.name,
      });

    case 'PROFILE_NAME_COLOR_CHANGE_REQUEST':
      return Object.assign({}, state, {
        nameColor: action.payload.nameColor,
      });

    case 'PROFILE_TEXT_COLOR_CHANGE_REQUEST':
      return Object.assign({}, state, {
        textColor: action.payload.textColor,
      });

    case 'DB_PROFILE_UPDATE':
      return Object.assign({}, state, {
        userID: action.payload.userID,
        name: action.payload.name,
        nameColor: action.payload.nameColor,
        textColor: action.payload.textColor,
      });

    case 'PROFILE_UPDATE':
      return Object.assign({}, state, {
        name: action.payload.name,
        nameColor: action.payload.nameColor,
        textColor: action.payload.textColor,
      });

    default:
      return state;
  }
};


export default profile;
