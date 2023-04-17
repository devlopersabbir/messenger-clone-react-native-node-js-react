import { MaterialIcons } from "@expo/vector-icons";
import { Button, Center, Text } from "native-base";
import React from "react";
import { TFooterItem } from "../../../utils/Types";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import useChatUpdate from "../../../hooks/useChatUpdate";

interface ICommonButton {
  item: TFooterItem;
}
const CommonButton: React.FC<ICommonButton> = ({ item }) => {
  const dispatch = useDispatch();
  const { unsetAllChat, unsetSelectedChat } = useChatUpdate();
  const logOut = (name: string) => {
    if (name === "More") {
      dispatch(logout());
      unsetAllChat();
      unsetSelectedChat();
    }
  };
  return (
    <Button variant="unstyled" p={0} onPress={() => logOut(item?.name)}>
      <Center>
        <MaterialIcons
          name={item?.iconName}
          color={`${item?.name === "Chat" ? "blue" : "black"}`}
          size={28}
        />
        <Text
          fontWeight="500"
          fontSize="16px"
          color={`${item?.name === "Chat" ? "blue.600" : "gray.900"}`}
        >
          {item?.name}
        </Text>
      </Center>
    </Button>
  );
};

export default CommonButton;
