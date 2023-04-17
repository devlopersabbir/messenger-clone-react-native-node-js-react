import { NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "../theme/Theme";

interface IAppContainer {
  children: React.ReactNode;
}
const AppContainer: React.FC<IAppContainer> = ({ children }) => {
  return (
    <>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </>
  );
};

export default AppContainer;
