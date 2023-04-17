import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Chat from "../../screens/Chat/Chat";
import Details from "../../screens/Details/Details";
import Home from "../../screens/Home/Home";
import { RootStackParamsList } from "../../utils/PageTypes";
import useSocket from "../../hooks/useSocket";

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const UserLayout = () => {
  const socket = useSocket();
  useEffect(() => {
    socket?.connect();
    console.log("socket is connected 🚀");
    return () => {
      socket.off("connect_error");
    };
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: "default",
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Chat" component={Chat} />
        <RootStack.Screen name="Details" component={Details} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default UserLayout;
