import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Video from '~/screens/Video';
import Home from '~/screens/Home';
import data from '~/screens/Home/data';

export type RootStackParamList = {
  HOME: undefined;
  VIDEO: typeof data[0];
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HOME" component={Home} />
        <Stack.Screen name="VIDEO" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
