// @flow
import React from 'react'; //16.8.3
import { GiftedChat } from 'react-native-gifted-chat'; // ^0.11.0
import _ from 'lodash'; //^4.17.15
import { YellowBox, View, Button } from 'react-native'; //https://github.com/expo/react-native/archive/sdk-35.0.0.tar.gz
import { Icon } from 'react-native-elements'
import Fire from '../Fire'; //^7.2.1
import KeyboardSpacer from 'react-native-keyboard-spacer'; //^0.4.1
//KeyboardSpacer allows the text input field to remain on top of the keyboard


//this function ignores the "set a timer warning" on the bottom of the app. 
//Currently there is no solutions, only work arounds as of October 25th, 2019
//https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
YellowBox.ignoreWarnings(['Setting a timer']); 
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//creation of the Chat component
class Chat extends React.Component {

  //this function provides the navigation options for the chat component 
  //this eventually will need to be changed to the name of the person we are chatting with
  //(currently as of October 25th, 2019 there is no real options)
  static navigationOptions = ({ navigation }) => ({ 
    title: navigation.getParam('groupName'),
       headerRight: () => (
      <Icon
        onPress={() => alert("Group Code: " + navigation.getParam("code"))}
        name="info-circle"
        type="font-awesome"
   
      />
                                                  ),
  });

  state = { //holds the messages in the chat state
      messages: [],
      flag: this.props.navigation.state.params.flag
  };

  get user() { //retrieves the user information and _id from the database
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }
 

 onSend = (messages=[]) => {
     Fire.shared.send(messages, this.props.navigation.state.params.code, this.props.navigation.state.params.groupName);
     
     this.setState(previousState => ({              
           messages: GiftedChat.append(previousState.messages, messages),
      }));
     
 }
  //renders the giftedchat component with the message, sending button and which user sent the message
  //keyboard spaces solves the text input/keyboard issue we've been having. Must be in a view and have a flex set to 1  
  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={this.user}
        placeholder="type away..."
        />
        <KeyboardSpacer />
      </View>
    );
  }

  //makes sure that Firebase loads the previous messages on chat component rendering
  componentDidMount() {
      

      //check if a new room is being created. If so make a new group in the db. 
      if(this.state.flag === 1){
           Fire.shared.appendGroup(this.props.navigation.state.params.code, this.props.navigation.state.params.groupName);
          
          this.setState({flag: 0});
         
      }
      
      //checks if the group exists, if so load its group info else return back to the group chat screen with error
      Fire.shared.doesExist(this.props.navigation.state.params.code, check => {
          if(!check){
              this.props.navigation.navigate('GroupChat', { name: this.props.navigation.state.params.name });
          }else{
             Fire.shared.groupInfo(this.props.navigation.state.params.code, gInfo => {
         console.log(gInfo);
                 this.props.navigation.setParams({groupName: gInfo});
      }); 
          }
  
      });
    
     
          Fire.shared.on(this.props.navigation.state.params.code.trim(), message =>                            
            this.setState(previousState => ({              
           messages: GiftedChat.append(previousState.messages, message),
      }))
    );
     
        
 
  }

  //when the chat app is turned off, the firebase connection will be shut off 
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;