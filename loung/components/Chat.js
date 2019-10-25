// @flow
import React from 'react'; //16.8.3
import { GiftedChat } from 'react-native-gifted-chat'; // ^0.11.0
import _ from 'lodash'; //^4.17.15
import { YellowBox } from 'react-native'; //https://github.com/expo/react-native/archive/sdk-35.0.0.tar.gz
import Fire from '../Fire'; //^7.2.1


//this function ignores the "set a timer warning" on the bottom of the app. 
//Currently there is no solutions, only work arounds as of October 25th, 2019
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
  //(currently as of October 25th, 2019 there is no real options)
  static navigationOptions = ({ navigation }) => ({ 
    title: navigation.getParam('name')
  });

  state = { //holds the messages in the chat state
    messages: [],
  };

  get user() { //retrieves the user information and _id from the database
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  //renders the giftedchat component with the message, sending button and which user sent the message  
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  //makes sure that Firebase loads the previous messages on chat component rendering
  componentDidMount() { 
    Fire.shared.on(message =>
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
