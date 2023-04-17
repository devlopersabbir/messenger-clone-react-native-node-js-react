import React from "react";
import AuthLayout from "../components/Layout/AuthLayout";
import UserLayout from "../components/Layout/UserLayout";
import { useSelector } from "react-redux";

const MainScreen = () => {
  const { token } = useSelector(({ authReducer }: any) => authReducer);

  return token ? <UserLayout /> : <AuthLayout />;
};

export default MainScreen;
