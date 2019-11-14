import firebase from 'firebase'; // 4.8.1

//establishes the fire class and user authentication with the database
class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

//Initialize firebase credentials 
  init = () => {
      if (!firebase.apps.length){
         firebase.initializeApp({
      apiKey: "AIzaSyDJe_qpQ80vn_Z3drb33xIQxGzg6O-2Eys",
    authDomain: "loung-47595.firebaseapp.com",
    databaseURL: "https://loung-47595.firebaseio.com",
    projectId: "loung-47595",
    storageBucket: "loung-47595.appspot.com",
    messagingSenderId: "1096233419277",
              appId: "1:1096233419277:web:d4fd5d404d1533b3f18b44",
    measurementId: "G-VGC428F8P8"
    });
      }
  }

//makes sure that the authentication status to change
  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

//check state of Autherized user
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };
//gets the user id of the current user
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
//grabs the previous messages from the database
  get ref() {
    return firebase.database().ref('messages');
  }
//returns a snapshot of the message that was just sent
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  //limits loading the past 20 messages from database
  on = callback => {
    this.ref
      // .limitToLast(20) //commented out for now but will want to limit # of messages later on 
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }
//returns the timestamp
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;