import React from "react";
import Fire from "../Fire"; //^7.2.1
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import styles from './styles';

export default class Login extends React.Component {
    
  state = { email: "", password: "", errorMessage: null };
//handles the user's login
  handleLogin = () => {
    const { email, password } = this.state; //what does this do ? 
    Fire.shared.login(
      this.state.email.trim(),
      this.state.password.trim(),
      signedIn => {
        if (signedIn) {
          this.props.navigation.navigate("GroupChat");
        }
      }
    );
  };

  static navigationOptions = {
    title: 'loung',
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.loginView}>
          {/* <Text style={styles.login}>login</Text> */}
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="password"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.physcialButton} onPress={this.handleLogin}><Text style={styles.buttonText}>login</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.physcialButton}
            onPress={() => this.props.navigation.navigate("SignUp")}
          ><Text style={styles.buttonText}>don't have an account? sign up</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

