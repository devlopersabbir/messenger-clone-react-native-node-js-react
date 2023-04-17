import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useGetData = () => {
  const [stateItem, setStateItem] = useState<any>();
  const getItem = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      jsonValue != null ? JSON.parse(jsonValue) : null;
      setStateItem(jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  const setItem = async (key: string, payload: any) => {
    try {
      const jsonValue = JSON.stringify(payload);
      const value = await AsyncStorage.setItem(key, jsonValue);
      setStateItem(value);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getItem,
    setItem,
    removeItem,
    stateItem,
  };
};

export const userRemoveItem = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
export const tokenRemoveItem = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
  }
};
