import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '~/screens/SignIn';

import Routes from '../routes';

const Auth = createNativeStackNavigator();

const noHeader = {
  headerShown: false,
};

// const transparentHeader = {
//   headerTitle: ' ',
//   headerTintColor: '#0080FF',
//   headerBackTitle: ' ',
//   headerTransparent: true,
//   headerStyle: { borderBottomWidth: 0 },
// };

const Unlogged: React.FC = () => (
  <Auth.Navigator initialRouteName={Routes.SIGN_IN}>
    <Auth.Screen name={Routes.SIGN_IN} component={SignIn} options={noHeader} />
  </Auth.Navigator>
);

export default Unlogged;
