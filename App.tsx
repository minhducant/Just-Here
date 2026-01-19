import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';

import i18n from './src/i18n/index';
import { store, persistor } from './src/stores';
import { AppNavigation } from './src/navigation/appNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <AppNavigation />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
