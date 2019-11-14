import React from 'react'; //16.8.3

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'; //https://github.com/expo/react-native/archive/sdk-35.0.0.tar.gz

class Main extends React.Component {
    
    
  //this is the title
  static navigationOptions = {
    title: 'loung',
  };

  state = {
    name: '',
  };

  //navigate to the chat
  onPress = () => this.props.navigation.navigate('GroupChat', { name: this.state.name });

  //update username
  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


//implement dark theme in the future
const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;