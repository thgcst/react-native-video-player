import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '~/screens/Home';
import data from '~/screens/Home/data';
import Video from '~/screens/Video';

export type RootStackParamList = {
  HOME: undefined;
  VIDEO: typeof data[0];
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#282a35' },
          headerTintColor: '#e0bf5a',
          headerTitleStyle: {
            color: 'rgb(220, 220, 220)',
          },
        }}>
        <Stack.Screen
          name="HOME"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="VIDEO"
          component={Video}
          options={{ title: 'Video' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
