import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  View,
  VStack,
} from "native-base";
import React from "react";
import CustomTab from "../../../components/Details/CustomTab";
import { IUser } from "../../../utils/interfaces/interface";
import useChatUpdate from "../../../hooks/useChatUpdate";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { baseURLMac } from "../../../utils/axios/axios";
import GoBack from "../../../components/common/Back/GoBack";

const Details = () => {
  const { chatState } = useChatUpdate();
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const { colorMode } = useColorMode();
  const { top } = useSafeAreaInsets();

  return (
    <>
      {chatState.selectedChat?.users &&
        chatState.selectedChat?.users?.map((user: IUser, index: number) => {
          if (requestUser.username !== user.username) {
            return (
              <View key={index}>
                <Box
                  pt={top}
                  bg={colorMode === "dark" ? "gray.600" : "white"}
                  rounded="3xl"
                  borderTopLeftRadius="0"
                  borderTopRightRadius="0"
                  pb={5}
                  px={4}
                >
                  <GoBack />
                </Box>
                <VStack alignItems="center" space="2" pt={3}>
                  <Avatar
                    size="2xl"
                    source={{ uri: `${baseURLMac}/${user?.image}` }}
                  >
                    <Avatar.Badge
                      bg={`${
                        user?.status !== "OFFLINE" ? "green.500" : "gray.500"
                      }`}
                    />
                  </Avatar>
                  <VStack space={0} alignItems="center">
                    <Heading fontSize="2xl" fontWeight="bold">
                      {user?.name}
                    </Heading>
                    <Text
                      fontSize="20px"
                      fontWeight="500"
                      color={`${
                        user?.status !== "OFFLINE" ? "green.500" : "gray.500"
                      }`}
                    >
                      {user?.status}
                    </Text>
                  </VStack>
                </VStack>
                <HStack
                  my={7}
                  w="full"
                  justifyContent="center"
                  px={8}
                  space={3}
                >
                  <IconButton
                    bg="gray.200"
                    rounded="lg"
                    p={2}
                    icon={
                      <Icon
                        size="10"
                        color="gray.500"
                        as={<MaterialIcons name="notifications" />}
                      />
                    }
                  />
                  <IconButton
                    bg="gray.200"
                    rounded="lg"
                    p={2}
                    icon={
                      <Icon
                        size="10"
                        color="gray.500"
                        as={<MaterialIcons name="videocam" />}
                      />
                    }
                  />
                  <IconButton
                    bg="gray.200"
                    rounded="lg"
                    p={2}
                    icon={
                      <Icon
                        size="10"
                        color="gray.500"
                        as={<MaterialIcons name="call" />}
                      />
                    }
                  />
                  <IconButton
                    bg="gray.200"
                    rounded="lg"
                    p={2}
                    icon={
                      <Icon
                        size="10"
                        color="gray.500"
                        as={<MaterialIcons name="settings" />}
                      />
                    }
                  />
                </HStack>
                <CustomTab />
              </View>
            );
          }
        })}
    </>
  );
};

export default Details;
