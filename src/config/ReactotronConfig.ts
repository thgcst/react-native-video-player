/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

declare global {
  interface Console {
    tron: any;
  }
}

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

const tron = Reactotron.configure({ host }).setAsyncStorageHandler!(
  AsyncStorage,
)
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .use(reactotronRedux())
  .use(reactotronSaga({ except: [''] }))
  .connect();

tron.clear!();

console.tron = tron;

export default tron;
