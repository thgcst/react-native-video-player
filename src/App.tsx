import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '~/navigation/rootNavigation';
import Routes from '~/navigation';

import store, { persistor } from './store';
import theme from './theme';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
