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
            apiKey: "AIzaSyDoc2ey7slNy3kcDI9NvYVha5wxlCzYFro",
            authDomain: "alec-chatapptest.firebaseapp.com",
            databaseURL: "https://alec-chatapptest.firebaseio.com",
            projectId: "alec-chatapptest",
            storageBucket: "alec-chatapptest.appspot.com",
            messagingSenderId: "235628079787",
            appId: "1:235628079787:web:d2c159e7558b78b9ae65ee",
            measurementId: "G-DEXZ7K1GWL"
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