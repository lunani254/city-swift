import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import TabNavigator from './screen/TabNavigator';
import ChooseLocation from './screen/ChooseLocation';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;