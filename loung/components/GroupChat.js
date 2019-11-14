import React from 'react'; //16.8.3
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class GroupChat extends React.Component{
    constructor(props) {
    super(props);

    console.log(this.props)
}
    state = {
    chats: [],
    renderState: 0,
  };

    static navigationOptions = ({ navigation }) => ({ 
    title: navigation.getParam('name')
  });
    
newChat=()=> this.setState({renderState: 1});

joinExisting=()=> this.setState({renderState: 2});

createNewChatroom(nav, group){
     var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
      
    nav.navigate('Chat', { name: name, groupName: group, code: result});
}

findExistingChatroom(){
    
}

render() {
    if(this.state.renderState===0){
       return (
        <View>
           
           <TouchableOpacity onPress={this.joinExisting}>
          <Text style={styles.buttonText}>Join Existing Room</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.newChat}>
          <Text style={styles.buttonText}>Create New Chatroom</Text>
        </TouchableOpacity>
           </View>
        
    ); 
    }else if (this.state.renderState === 1){
     return(
        <View>
         <Text style={styles.title}>Please Enter Chatroom Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeText}
          value={this.state.groupName}
        />
        
         <TouchableOpacity onPress={this.createNewChatroom(this.props.navigation, groupName)}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
    
    <TouchableOpacity onPress={this.joinExisting}>
          <Text style={styles.buttonText}>Join Existing Room</Text>
        </TouchableOpacity>
    </View>
    );
    }
    //k
    else{
        return(
        <View>
            <Text style={styles.title}>Enter Group Code:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeText}
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

export default GroupChat;