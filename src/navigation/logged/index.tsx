import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '~/screens/Home';

import Routes from '../routes';

const App = createNativeStackNavigator();

const noHeader = {
  headerShown: false,
};

const Logged: React.FC = () => (
  <App.Navigator initialRouteName={Routes.HOME}>
    <App.Screen name={Routes.HOME} component={Home} options={noHeader} />
  </App.Navigator>
);

export default Logged;
