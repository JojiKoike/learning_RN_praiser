import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';

import store from './store';
import * as UiContext from './contexts/ui';
import Routes from './routes';
import ErrorPanel from './components/molecules/ErrorPanel';

const App = () => {
  const [applicationState, setApplicationState] = React.useState(UiContext.createApplicationInitialState());
  const [error, setError] = React.useState(UiContext.createErrorInitialState());
  const [snackbar, setSnackbar] = React.useState(UiContext.createSnackbarInitialState());
  const onDismiss = React.useCallback(() => {
    setSnackbar(UiContext.createSnackbarInitialState());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <UiContext.Context.Provider
          value={{ error, setError, snackbar, setSnackbar, applicationState, setApplicationState }}
        >
          <Routes />
          <ErrorPanel />
          <Snackbar
            visible={snackbar.visible}
            onDismiss={onDismiss}
            action={{ label: snackbar.label, onPress: onDismiss }}
          >
            {snackbar.message}
          </Snackbar>
        </UiContext.Context.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
