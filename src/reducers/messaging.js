import { Map, fromJS, toJS } from 'immutable';

export const INITIAL_CHAT_STATE = Map({
  name: null,
  message: null,
  content: Map({
    html: '',
  }),
  input: Map({
    disabled: true,
    hidden: false,
  }),
  status: Map({
    text: '',
    hidden: false,
    css: Map({
      color: '',
    }),
  }),
  spanElement: Map({
    hidden: false,
  }),
  messages: [],
});

const messaging = (state = INITIAL_CHAT_STATE, action) => {
  switch (action.type) {
    // case 'SENDING_MESSAGE':
    //   return state.merge(Map({
    //     message: fromJS(action.message),
    //   }));

    case 'SET_NAME':
      return state.merge(Map({
        name: action.payload,
      }));

    case 'OPEN_EVENT':
      return state.merge(Map({
        input: Map({
          disabled: false,
        }),
        status: Map({
          text: 'Choose name:',
        }),
      }));

    case 'BROWSER_NOT_SUPPORTED':
      return state.merge(Map({
        content: Map({
          html: 'Sorry, but your browser doesn\'t support WebSockets.',
        }),
        input: Map({
          hidden: true,
        }),
        spanElement: Map({
          hidden: true,
        }),
      }));

    case 'BROWSER_SUPPORTED':
      return state.merge(Map({
        content: Map({
          html: '',
        }),
        input: Map({
          hidden: false,
        }),
        spanElement: Map({
          hidden: false,
        }),
      }));

    case 'CONNECTION_ERROR':
      return state.merge(Map({
        content: Map({
          html: 'Sorry, but there\'s some problem with your connection or the server is down.',
        }),
      }));

    case 'COLOR_ACTION':
      return state.merge(Map({
        status: Map({
          text: `${state.toJS().name}: `,
          css: Map({
            color: action.payload.color,
          }),
        }),
        input: Map({
          disabled: false,
        }),
      }));

    case 'MESSAGE_ACTION':
      return state.merge(Map({
        message: action.payload,
      }));

    default:
      return state;
  }
};

export default messaging;
