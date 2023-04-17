import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../screens/Auth/Login";
import Singup from "../../screens/Auth/Singup";
import Welcome from "../../screens/Welcome/Welcome";
import { RootStackParamsList } from "../../utils/PageTypes";

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const AuthLayout = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions={{
          animation: "default",
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Singup" component={Singup} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLayout;
