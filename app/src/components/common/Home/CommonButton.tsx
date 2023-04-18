import { MaterialIcons } from "@expo/vector-icons";
import { Button, Center, Icon, Text, useColorMode } from "native-base";
import React from "react";
import { TFooterItem } from "../../../utils/Types";
import { useNavigation } from "@react-navigation/core";

interface ICommonButton {
  item: TFooterItem;
}
const CommonButton: React.FC<ICommonButton> = ({ item }) => {
  const { navigate }: any = useNavigation();
  const { colorMode } = useColorMode();

  const routeNavigator = (name: string) => {
    switch (name) {
      case "Chat":
        navigate("Home");
        break;
      case "Calls":
        navigate("Calls");
        break;
      case "Settings":
        navigate("Settings");
        break;
      default:
        break;
    }
  };
  return (
    <Button variant="unstyled" p={0} onPress={() => routeNavigator(item?.name)}>
      <Center>
        <Icon
          color={colorMode === "dark" ? "white" : "gray.900"}
          size={28}
          as={<MaterialIcons name={item?.iconName} />}
        />
        <Text
          color={colorMode === "dark" ? "white" : "gray.900"}
          fontWeight="500"
          fontSize="16px"
        >
          {item?.name}
        </Text>
      </Center>
    </Button>
  );
};

export default CommonButton;
