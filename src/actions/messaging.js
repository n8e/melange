import firebase from 'firebase';
import config from '../config/index';
import { getEmail } from '../utils';
import { getConversationId } from './general';
import {
  SENDING_MESSAGE,
  SET_NAME,
  CONNECTION_ERROR,
  REFRESH_MESSAGES,
} from '../constants';
import { store } from '../index';

firebase.initializeApp(config);

export const dbRef = firebase.database().ref('users');

// quick sort functionality
const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
};

const partition = (arr, p, l, r) => {
  const pivotValue = new Date(arr[p].message.timeStamp);
  let partitionIndex = l;

  for (let i = l; i < r; i += 1) {
    if (new Date(arr[i].message.timeStamp) < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(arr, r, partitionIndex);
  return partitionIndex;
};

const quickSort = (arr, l, r) => {
  let pivot;
  let partitionIndex;

  if (l < r) {
    pivot = r;
    partitionIndex = partition(arr, pivot, l, r);

    quickSort(arr, l, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, r);
  }
  return arr;
};

const sorter = (test) => {
  const right = test.length - 1;
  return quickSort(test, 0, right);
};

// called each time a response is obtained from firebase listener
export const refreshMessages = payload => ({
  type: REFRESH_MESSAGES,
  payload,
});

// called in the catch block of firebase connection listener
export const connectionError = () => ({
  type: CONNECTION_ERROR,
});

export const sendingMessage = message => ({
  type: SENDING_MESSAGE,
  payload: message,
});

export const sendingName = message => ({
  type: SET_NAME,
  payload: message,
});

// a listener for firebase db
dbRef.on('value', (snapshot) => {
  const messages = [];
  const dataObj = snapshot.val();

  // get current user and dispatch profile to state
  const loginEmail = getEmail(); // get the email
  if (loginEmail) {
    const convID = getConversationId(loginEmail); // get conversation ID given loginEmail
    store.dispatch(sendingName({
      name: dataObj[convID] ? dataObj[convID].name : '',
      profileId: convID,
      nameColor: dataObj[convID] ? dataObj[convID].nameColor : '',
      textColor: dataObj[convID] ? dataObj[convID].textColor : '',
    }));
  }

  // construct messages object
  if (dataObj) {
    const dataKeys = Object.keys(dataObj);
    dataKeys.map((dataPointStr) => {
      if (dataObj[dataPointStr].messages && Object.keys(dataObj[dataPointStr].messages).length
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
  // sort messages by time before dispatching
  const msgs = sorter(messages);
  // dispatch messages
  return store.dispatch(refreshMessages(msgs));
}, () => store.dispatch(connectionError()));

export const sendChatMessage = message => (dispatch) => {
  const messageData = {
    message: {
      message: message.message,
      author: message.author,
      timeStamp: (new Date()).toString(),
    },
  };
  const loginEmail = getEmail(); // get the email
  const convID = getConversationId(loginEmail); // get conversation ID given loginEmail
  const messagesDBRef = firebase.database().ref(`users/${convID}/messages`);

  // send postData to db
  messagesDBRef.push(messageData)
  .then(() => {
    dispatch(sendingMessage(messageData));
  })
  .catch(err => new Error(err));
};

export const sendChatName = message => (dispatch) => {
  const colorArray = ['#FF6F69', '#442D65', '#17A697'];
  const colorOfName = colorArray[Math.floor(Math.random() * colorArray.length)];
  const colorOfText = colorArray[Math.floor(Math.random() * colorArray.length)];
  const postData = {
    name: message.message,
    nameColor: colorOfName,
    textColor: colorOfText,
    messages: [],
  };

  // get the email
  const loginEmail = getEmail();

  // get conversation ID given loginEmail
  const convID = getConversationId(loginEmail);

  // given conversation ID update the record in db
  const profileDBRef = firebase.database().ref(`users/${convID}/`);

  profileDBRef.update(postData).then(() => {
    // send name and Id to the state
    dispatch(sendingName({
      name: postData.name,
      profileId: convID,
      nameColor: colorOfName,
      textColor: colorOfText,
    }));
  })
  .catch(err => new Error(err));
};
