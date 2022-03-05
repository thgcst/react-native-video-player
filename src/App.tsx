import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import Screens from '~/screens';

import store, { persistor } from './store';
import theme from './theme';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor="#282a35" barStyle="light-content" />
          <Screens />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default gestureHandlerRootHOC(App);
