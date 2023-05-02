import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import React from "react";
import { IChat, IUser } from "../../utils/interfaces/interface";
import { useSelector } from "react-redux";
import GoBack from "../common/Back/GoBack";
import { baseURLMac } from "../../utils/axios/axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IChatHeaderProps {
  navigation: any;
  chat: IChat;
}

const Header: React.FC<IChatHeaderProps> = ({ navigation, chat }) => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const { colorMode } = useColorMode();
  const { top } = useSafeAreaInsets();
  return (
    <>
      {chat?.users &&
        chat?.users?.map((user: IUser, index: number) => {
          if (user?.username !== requestUser?.username) {
            return (
              <HStack
                pt={top}
                pb={4}
                key={index}
                justifyContent="flex-start"
                px={4}
                bg={colorMode === "dark" ? "gray.600" : "white"}
                rounded="3xl"
                borderTopLeftRadius="0"
                borderTopRightRadius="0"
                alignItems="center"
              >
                <GoBack />
                <Pressable
                  flex={1}
                  onPress={() =>
                    // console.log("============= pressed ============", user)
                    navigation.navigate("Details", { user })
                  }
                >
                  <HStack
                    space={3}
                    overflow="hidden"
                    w="full"
                    alignItems="center"
                  >
                    <Avatar
                      size="md"
                      source={{ uri: `${baseURLMac}/${user?.image}` }}
                    >
                      <Avatar.Badge
                        bg={`${
                          user?.status === "ONLINE" ? "green.500" : "gray.500"
                        }`}
                      />
                    </Avatar>
                    <VStack space={0}>
                      <Heading
                        fontSize="19px"
                        fontWeight="600"
                        color={colorMode === "dark" ? "white" : "gray.600"}
                      >
                        {user?.name}
                      </Heading>
                      <Text
                        color={`${
                          user?.status === "ONLINE"
                            ? "green.500"
                            : `${
                                colorMode === "dark" ? "gray.300" : "gray.500"
                              }`
                        }`}
                        fontSize="16px"
                        fontWeight="500"
                      >
                        {user?.status}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
                <HStack space={3}>
                  <Pressable>
                    <Icon
                      size="xl"
                      color="cyan.400"
                      as={<MaterialIcons name="videocam" />}
                    />
                  </Pressable>
                  <Pressable>
                    <Icon
                      size="xl"
                      color="green.400"
                      as={<MaterialIcons name="add-call" />}
                    />
                  </Pressable>
                </HStack>
              </HStack>
            );
          }
        })}
    </>
  );
};

export default Header;
