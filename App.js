import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './screens/home';
import JoinClub from './screens/joinClub';

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>    
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="JoinClub" component={JoinClub} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
