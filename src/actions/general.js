import firebase from 'firebase';

export const getConversationId = (loginEmail) => {
  let convID;
  const dbRef = firebase.database().ref('users');
  dbRef.on('value', (snapshot) => {
    const users = snapshot.val() || {};
    if (Object.keys(users).length) {
      Object.keys(users).map((key) => {
        if (users[key].loginEmail === loginEmail) {
          convID = key;
        }
        return key;
      });
    }
    if (!Object.keys(users).length) {
      dbRef.push({
        name: '',
        loginEmail,
        nameColor: '',
        textColor: '',
        messages: [],
      })
      .then((res) => {
        convID = res.path.pieces_[1];
      })
      .catch(err => new Error(err));
    }
  }, err => new Error(err));
  return convID;
};
