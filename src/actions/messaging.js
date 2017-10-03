import firebase from 'firebase';
import config from '../config/index';
import {
  SENDING_MESSAGE,
  SET_NAME,
  CONNECTION_ERROR,
  REFRESH_MESSAGES,
} from '../constants';
import { store } from '../index';

firebase.initializeApp(config);

let createdID = ''; // eslint-disable-line no-unused-vars

export const dbRef = firebase.database().ref('posts');

// called each time a response is obtained from firebase listener
export const refreshMessages = payload => ({
  type: REFRESH_MESSAGES,
  payload,
});

// called in the catch block of firebase connection listener
export const connectionError = () => ({
  type: CONNECTION_ERROR,
});

// a listener for firebase db
dbRef.on('value', (snapshot) => {
  const messages = [];
  // construct messages object
  const dataObj = snapshot.val();
  if (dataObj) {
    const dataKeys = Object.keys(dataObj);
    dataKeys.map((dataPointStr) => {
      if (dataObj[dataPointStr].messages && Object.keys(dataObj[dataPointStr].messages).length !== 0
        && dataObj[dataPointStr].messages.constructor === Object) {
        const dKeys = Object.keys(dataObj[dataPointStr].messages);
        dKeys.map((keyStr) => {
          const dt = dataObj[dataPointStr].messages[keyStr];
          dt.message.color = dataObj[dataPointStr].textColor;
          dt.message.author = dataObj[dataPointStr].name;
          dt.message.time = dataObj[dataPointStr].timeStamp;
          messages.push(dt);
          return keyStr;
        });
      }
      return dataPointStr;
    });
  }
  return store.dispatch(refreshMessages(messages));
}, () => store.dispatch(connectionError()));

//
export const sendingMessage = message => ({
  type: SENDING_MESSAGE,
  payload: message,
});

export const sendingName = message => ({
  type: SET_NAME,
  payload: message,
});

export const sendChatMessage = message => (dispatch) => {
  const messagesDBRef = firebase.database().ref(`posts/${message.conversationId}/messages`);
  const messageData = {
    message: {
      conversationId: message.conversationId,
      message: message.message,
      author: message.author,
      timeStamp: new Date(),
    },
  };
  // check if node exists
  dbRef.child(message.conversationId).once('value', (snapshot) => {
    if (snapshot.exists()) {
      // send postData to db
      messagesDBRef.push(messageData)
      .then(() => {
        dispatch(sendingMessage(messageData));
      })
      .catch(err => new Error(err));
    } else {
      console.error(new Error('Cannot send Message'));
    }
  }, err => new Error(err));
};

export const sendChatName = message => (dispatch) => {
  const colorArray = ['#FF6F69', '#442D65', '#17A697'];

  const colorOfName = colorArray[Math.floor(Math.random() * colorArray.length)];
  const colorOfText = colorArray[Math.floor(Math.random() * colorArray.length)];

  console.log('COLORS: Name:', colorOfName, 'Text:', colorOfText);

  const postData = {
    name: message.message,
    nameColor: colorOfName,
    textColor: colorOfText,
    timeStamp: (new Date()).toString(),
    messages: [],
  };
  const messageData = {
    message,
    timeStamp: (new Date()).toString(),
  };
  const messagesDBRef = firebase.database().ref(`posts/${message.conversationId}/messages`);

  if (message.conversationId) {
    // check if node exists
    dbRef.child(message.conversationId).once('value', (snapshot) => {
      if (snapshot.exists()) {
        // send postData to db
        messagesDBRef.push(messageData)
        .then((res) => {
          console.log('firebase response>>>', res);
        })
        .catch(err => new Error(err));
      } else {
        dbRef.push(postData).then((res) => {
          createdID = res.path.pieces_[1];
          // send name and Id to the state
          dispatch(sendingName({
            name: message.message,
            conversationId: res.path.pieces_[1],
            nameColor: colorOfName,
            textColor: colorOfText,
          }));
        })
        .catch(err => new Error(err));
      }
    }, err => new Error(err));
  } else {
    dbRef.push(postData).then((res) => {
      console.log('Created ID:', res.path.pieces_[1]);
      createdID = res.path.pieces_[1];
      // send name and Id to the state
      dispatch(sendingName({
        name: postData.name,
        conversationId: res.path.pieces_[1],
      }));
    })
    .catch(err => new Error(err));
  }
};
