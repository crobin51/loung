import React from "react";
import Fire from "../Fire"; //^7.2.1
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button
} from "react-native";
export default class Login extends React.Component {
    
  state = { email: "", password: "", errorMessage: null };
//handles the user's login
  handleLogin = () => {
    const { email, pasword } = this.state;
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
    title: "loung"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
