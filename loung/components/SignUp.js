import React from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Fire from "../Fire"; //^7.2.1
import styles from './styles';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: "loung"
  };

  state = { email: "", password: "", name: "", errorMessage: null };

//signs the user up with the database
  handleSignUp = () => {
    Fire.shared.signUp(
      this.state.email.trim(),
      this.state.password.trim(),
     this.state.name,
      signedIn => {
        if (signedIn) {
            
          this.props.navigation.navigate("GroupChat");
        }
      }
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.loginView}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.input}>
             <TextInput
             placeholder="display name"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
            
          <TextInput
            placeholder="email"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="password"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          
                
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.physcialButton} onPress={this.handleSignUp}><Text style={styles.buttonText}>sign up</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.physcialButton}
            onPress={() => this.props.navigation.navigate("Login")}
          ><Text style={styles.buttonText}>already have an account? login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

