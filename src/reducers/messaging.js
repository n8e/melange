export const INITIAL_CHAT_STATE = {
  profileId: null,
  name: null,
  message: null,
  nameColor: null,
  textColor: null,
  messages: [],
  connectionError: false,
};

const messaging = (state = INITIAL_CHAT_STATE, action) => {
  switch (action.type) {
    case 'REFRESH_MESSAGES':
      return Object.assign({}, state, {
        messages: action.payload.slice(),
      });

    case 'SENDING_MESSAGE':
      return Object.assign({}, state, {
        message: action.payload,
      });

    case 'SET_NAME':
      return Object.assign({}, state, {
        profileId: action.payload.profileId,
        name: action.payload.name,
        nameColor: action.payload.nameColor,
        textColor: action.payload.textColor,
      });

    case 'CONNECTION_ERROR':
      return Object.assign({}, state, {
        connectionError: 'Sorry, but there\'s some problem with your db connection.',
      });

    default:
      return state;
  }
};

export default messaging;
