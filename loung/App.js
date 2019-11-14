// Import the screens
import Main from './components/Main';
import Chat from './components/Chat';
import GroupChat from './components/GroupChat';

// Import React Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Create the navigator, allows navigation between the different components Main and Chat 
const RootStack = createStackNavigator({
  Main,
  Chat,
  GroupChat,
});
//This had to be added because it the most current version of bundling the app function 
const navigator = createAppContainer(RootStack);

// Export it as the root component
export default navigator;