import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useChatUpdate from "../../../hooks/useChatUpdate";
import useMessage from "../../../hooks/useMessage";

const GoBack = () => {
  const navigation = useNavigation();
  const { unsetAllMessage } = useMessage();

  return (
    <Pressable
      onPress={() => {
        unsetAllMessage();
        navigation.goBack();
      }}
      mr={2}
    >
      <Ionicons name="arrow-back-sharp" size={24} color="black" />
    </Pressable>
  );
};

export default GoBack;
