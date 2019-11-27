import React from "react"; //16.8.3
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Fire from "../Fire"; //^7.2.1
import { List, ListItem } from "react-native-elements";

class GroupChat extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: null,
    chats: [],
    groupName: "",
    renderState: 0,
    groupCode: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("name")
  });

  onChangeGroupName = groupName => this.setState({ groupName });

  onChangeGroupCode = groupCode => this.setState({ groupCode });

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
        flag: 1
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
        flag: 0
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
        <View>
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
        <View>
          <Text style={styles.title}>Please Enter Chatroom Name:</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeGroupName}
            value={this.state.groupName}
          />

          <TouchableOpacity onPress={this.createNewChatroom}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.joinExisting}>
            <Text style={styles.buttonText}>Join Existing Room</Text>
          </TouchableOpacity>
        </View>
      );
    }
    //k
    else {
      return (
        <View>
          <Text style={styles.title}>Enter Group Code:</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={this.onChangeGroupCode}
            value={this.state.groupCode}
          />
          <TouchableOpacity onPress={this.findExistingChatroom}>
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.newChat}>
            <Text style={styles.buttonText}>Create New Chatroom</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset
  },
  mainButtons: {
    marginLeft: offset,
    fontSize: offset,
    marginTop: offset
  }
});

export default GroupChat;
