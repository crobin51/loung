/*
import React, { Component } from 'react';
import { 
    Stylesheet,
    TextInput, // 1. <- Add this
    View,
} from 'react-native';

class Main extends React.Component {
    state = { name: ''} // 2. <- Add the componenet state

    render() {
        return (
            <View>
                <TextInput
                    style={styles.nameInput}
                    placeHolder="John Cena"
                    value={this.state.name}
                />
            </View>
        );
    }
}

const offset = 24;
const styles = Stylesheet.create({
    nameInput: { // 3. <= Adda style for the input
        height: offset * 2,
        margin: offset,
        paddingHoizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
    },
});

export default Main;
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: '',
  };

  onPress = () => this.props.navigation.navigate('Chat', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
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
