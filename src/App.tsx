import React from 'react';
import { LogBox, Platform } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Routes from '@routes';
import store from '@store/store';
import normalizeDimens from '@utils/normalizeDimens';
// import RemotePushController from './parts/RemotePushController';

const MainApp = () => {
  LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);
  return (
    <SafeAreaProvider>
      <Routes />
      {/* <RemotePushController /> */}
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <MainApp />
      <FlashMessage position='top' duration={3000} style={{
        paddingTop: Platform.OS === 'android' ? normalizeDimens(55) : normalizeDimens(35),
      }} />
    </StoreProvider>
  );
};

export default App;
