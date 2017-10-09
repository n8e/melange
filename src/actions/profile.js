import firebase from 'firebase';
import { getEmail } from '../utils';
import { getConversationId } from './general';
import { store } from '../index';

export const dbProfileUpdate = payload => ({
  type: 'DB_PROFILE_UPDATE',
  payload,
});

firebase.database().ref('users').on('value', (snapshot) => {
  const dataObj = snapshot.val();
  // get current user and dispatch profile to state
  const loginEmail = getEmail(); // get the email
  if (loginEmail) {
    const convID = getConversationId(loginEmail); // get conversation ID given loginEmail
    store.dispatch(dbProfileUpdate({
      userID: convID,
      name: dataObj[convID] ? dataObj[convID].name : '',
      nameColor: dataObj[convID] ? dataObj[convID].nameColor : '',
      textColor: dataObj[convID] ? dataObj[convID].textColor : '',
    }));
  }
});

export const updateProfile = payload => ({
  type: 'PROFILE_UPDATE',
  payload,
});

export const profileUpdate = profile => dispatch => firebase.database().ref(`users/${profile.userID}`).update(profile)
    .then(() => {
      dispatch(updateProfile(profile));
    });
