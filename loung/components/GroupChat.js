import React from "react"; //16.8.3
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View
} from "react-native";
import Fire from "../Fire"; //^7.2.1
//import { List, ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
class GroupChat extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: null,
    chats: [],
    groupName: "",
    renderState: 0,
    groupCode: "",
    key: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'loung',
    headerRight: () => (
      <Icon
        containerStyle={{ marginRight: 10 }}
      />
    )
  });

  onChangeGroupName = groupName => this.setState({ groupName });

  onChangeGroupCode = groupCode => this.setState({ groupCode });

  onChangeKey = key => this.setState({ key });

  //changes the render to the newChat render
  newChat = () => this.setState({ renderState: 1 });

  //changes the render to the joinExisting render
  joinExisting = () => this.setState({ renderState: 2 });

//creates a new chatroom with a randomly generated code
  createNewChatroom = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (this.state.groupName === "") {
      alert("Group Name cannot be empty, please enter a valid name.");
    } else {
      this.props.navigation.navigate("Chat", {
        name: this.state.name,
        groupName: this.state.groupName,
        code: result,
        flag: 1,
        key: this.state.key
      });
      this.setState({ renderState: 0 });
    }
  };

//finds an existing chatroom
  findExistingChatroom = () => {
    if (this.state.groupCode === "") {
      alert("Group Code cannot be empty, please enter a valid code");
    } else if (
      this.state.groupCode.length < 5 ||
      this.state.groupCode.length > 5
    ) {
      alert("Invalid Group Code Length. Please enter your 5 characther code!");
    } else {
      this.props.navigation.navigate("Chat", {
        groupName: "",
        name: this.state.name,
        code: this.state.groupCode.toUpperCase(),
        flag: 0,
        key: this.state.key
      });
    }
  };

  componentDidMount() {
    Fire.shared.userInfo(info => {
      this.setState({
        name: info.user,
        chats: info.groups
      });
    });
  }

  render() {
    if (this.state.renderState === 0) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.joinExisting}>
            <Text style={styles.mainButtons}>Join Existing Room</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.newChat}>
            <Text style={styles.mainButtons}>Create New Chatroom</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.renderState === 1) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.title}>please enter chatroom name:</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeGroupName}
            autoCapitalize="characters"
            value={this.state.groupName}
            placeholder="be creative"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />

          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeKey}
            value={this.state.key}
            placeholder="encryption key"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />

          <TouchableOpacity onPress={this.createNewChatroom}>
            <Text style={styles.buttons}>create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.joinExisting}>
            <Text style={styles.buttons}>join existing room</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
    //k
    else {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.title}>enter group code:</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeGroupCode}
            autoCapitalize="characters"
            value={this.state.groupCode}
            placeholder="5 digits..."
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />

          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeKey}
            value={this.state.key}
            placeholder="encryption key"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
          />

          <TouchableOpacity onPress={this.findExistingChatroom}>
            <Text style={styles.buttons}>join</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.newChat}>
            <Text style={styles.buttons}>create new chatroom</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#010A26',
  },
  mainButtons: {
    color: '#010A26',
    backgroundColor: '#E83338',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 3,
    borderRadius: 10,
    height: 50,
    paddingTop: '1%',
  },
  title: {
    color: '#E83338',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 3,
  },
  nameInput: {
    flex: 0.1,
    margin: 5,
    alignSelf: 'center',
    width: '35%',
    padding: 2,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#E83338',
    fontWeight: 'bold',
  },
  buttons: {
    color: '#010A26',
    backgroundColor: '#E83338',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    height: 50,
    paddingTop: '1%',
  },

});

export default GroupChat;
