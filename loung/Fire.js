import firebase from 'firebase'; // 4.8.1

//establishes the fire class and user authentication with the database
class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    //Initialize firebase credentials 
    init = () => {
        if (!firebase.apps.length) {
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
            } catch ({
                message
            }) {
                alert(message);
            }
        }
    };
    
    doesExist= (gid) =>{
     
        let check = this.ref.child("/" + gid).once("value", data => {
          
            if(data.exists()){
                  //console.log(data);
                return true;
                
            }else{
                
               return false;
            }
            //console.log(check);
         
            
        });
          console.log(check);
            return check;
         
    }
    //gets the user id of the current user
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    //grabs the previous messages from the database
    get ref() {
        return firebase.database().ref('groups');
    }
    //returns a snapshot of the message that was just sent
    parse = (snapshot,i) => {
       
        const {
            timestamp: numberStamp,
            text,
            user,
            _id
        } = snapshot.val()[i];
        
     
        
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        
       // console.log(message);
        return message;
    };

    //limits loading the past 20 messages from database
    on = (gid, callback) => {
     
        this.ref.child("/" + gid)
            // .limitToLast(20) //commented out for now but will want to limit # of messages later on 
            .on('child_added', snapshot => {
            for(var i = 1; i< snapshot.val().length; i++){
                  callback(this.parse(snapshot, i));
            }
          
            
        });
    }
                
    //returns the timestamp
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = (messages, gid) => {

        for (let i = 0; i < messages.length; i++) {
            const {
                text,
                user
            } = messages[i];
            const message = {
                _id: Date.now(),
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message, gid);
        }
    };




    append = (message, gid) => {

        //console.log(gid);
        this.ref.child("/" + gid).once("value", data => {
            // console.log(data.val().messages[0].text);
            let temp = [];

            if (data.val().messages[0].user._id === 0) {
              temp.push(message);

            } else {
                for (let i = 0; i < data.val().messages.length; i++) {

                    let pastMessage = {
                        _id: data.val().messages[i]._id,
                        text: data.val().messages[i].text,
                        timestamp: data.val().messages[i].timestamp,
                        user: data.val().messages[i].user,
                    }

                    temp.push(pastMessage);
                }
                temp.push(message);
            }


            this.ref.child("/" + gid).set({
                messages: temp
            });

        })

    }

    appendGroup = (code, name) => {

        const group = {
            groupName: name,
            messages: [{
                _id: Date.now(),
                text: "Welcome",
                timestamp: Date.now(),
                user: {
                    _id: "0FBLkaGJVoQCzOtWz9tMVUeuA2P2",
                    name: "placeholder"
                }
            }],
        };
        this.ref.child(code).set(group);



    }
    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;
