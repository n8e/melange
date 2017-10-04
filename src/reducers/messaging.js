import { Map } from 'immutable';

export const INITIAL_CHAT_STATE = Map({
  profileId: null,
  name: null,
  message: null,
  nameColor: null,
  textColor: null,
  messages: [],
  connectionError: false,
});

const messaging = (state = INITIAL_CHAT_STATE, action) => {
  switch (action.type) {
    case 'REFRESH_MESSAGES':
      return state.merge(Map({
        messages: action.payload.slice(),
      }));

    case 'SENDING_MESSAGE':
      return state.merge(Map({
        message: action.payload,
      }));

    case 'SET_NAME':
      return state.merge(Map({
        profileId: action.payload.profileId,
        name: action.payload.name,
        nameColor: action.payload.nameColor,
        textColor: action.payload.textColor,
      }));

    case 'CONNECTION_ERROR':
      return state.merge(Map({
        connectionError: 'Sorry, but there\'s some problem with your db connection.',
      }));

    default:
      return state;
  }
};

export default messaging;
