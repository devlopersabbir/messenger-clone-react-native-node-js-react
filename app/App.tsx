import React from "react";
import AppContainer from "./src/components/AppContainer";
import MainScreen from "./src/screens/MainScreen";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider
        duration={3000}
        placement="bottom"
        animationType="slide-in"
        swipeEnabled={true}
      >
        <AppContainer>
          <MainScreen />
        </AppContainer>
      </ToastProvider>
    </Provider>
  );
};

export default App;
