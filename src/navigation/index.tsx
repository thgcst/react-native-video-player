/* eslint-disable react/prop-types */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import UnloggedRoutes from './unlogged';
import LoggedRoutes from './logged';

import Routes from './routes';
import { RootState } from '~/store/ducks/rootReducer';

const Stack = createNativeStackNavigator();

const Main: React.FC = () => {
  const { signedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator initialRouteName={Routes.UNLOGGED}>
      {signedIn ? (
        <Stack.Screen
          name={Routes.LOGGED}
          component={LoggedRoutes}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={Routes.UNLOGGED}
          component={UnloggedRoutes}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationTypeForReplace: signedIn ? 'push' : 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Main;
