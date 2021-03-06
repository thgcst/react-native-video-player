import React, { useEffect } from 'react';
import { LogBox, StatusBar, useWindowDimensions } from 'react-native';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import Routes from './navigation';
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
  useEffect(() => {
    changeNavigationBarColor('#282a35', false, false);
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme({ height, width })}>
          <StatusBar backgroundColor="#282a35" barStyle="light-content" />
          <OrientationLocker orientation={PORTRAIT} />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default gestureHandlerRootHOC(App);
