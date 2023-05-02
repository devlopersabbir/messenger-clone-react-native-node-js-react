import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  Welcome?: undefined;
  Singup?: undefined;
  Login?: undefined;
  Home?: undefined;
  Chat?: undefined;
  Details?: undefined;
  Auth?: undefined;
  Settings?: undefined;
  Calls?: undefined;
};

export type WelcomeScreen = NativeStackScreenProps<
  RootStackParamsList,
  "Welcome"
>;

export type SingUpScreen = NativeStackScreenProps<
  RootStackParamsList,
  "Singup"
>;

export type LoginScreen = NativeStackScreenProps<RootStackParamsList, "Login">;
export type HomeScreen = NativeStackScreenProps<RootStackParamsList, "Home">;
export type ChatScreen = NativeStackScreenProps<RootStackParamsList, "Chat">;
export type SettingScreen = NativeStackScreenProps<
  RootStackParamsList,
  "Settings"
>;
export type CallScreen = NativeStackScreenProps<RootStackParamsList, "Calls">;
export type DetailsScreen = NativeStackScreenProps<
  RootStackParamsList,
  "Details"
>;
export type AuthLayoutScreen = NativeStackScreenProps<
  RootStackParamsList,
  "Auth"
>;
