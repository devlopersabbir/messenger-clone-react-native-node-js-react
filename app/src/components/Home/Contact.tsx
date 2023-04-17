import {
  Avatar,
  Button,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { IChat, IUser } from "../../utils/interfaces/interface";
import useChatUpdate from "../../hooks/useChatUpdate";
import { baseURLMac } from "../../utils/axios/axios";

interface IContactProps {
  chat?: IChat;
  navigation?: any;
  users?: IUser[];
  lastMessage?: string | null;
}
const Contact: React.FC<IContactProps> = ({
  users,
  chat,
  lastMessage,
  navigation,
}) => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const { setSelectedChat } = useChatUpdate();
  return (
    <>
      {users &&
        users?.map((user: IUser, index: number) => {
          if (user?.username !== requestUser?.username) {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedChat(chat as IChat);
                  navigation.navigate("Chat");
                }}
              >
                <HStack justifyContent="space-between" my={3}>
                  <HStack space={3} flex={1} overflow="hidden" w="full">
                    <Avatar
                      size="lg"
                      source={{
                        uri: `${baseURLMac}/${user?.image}`,
                      }}
                    >
                      <Avatar.Badge
                        bg={`${
                          user?.status === "ONLINE" ? "green.600" : "gray.600"
                        }`}
                      />
                    </Avatar>
                    <VStack justifyContent="space-between" py={2}>
                      <Heading fontSize="19px" fontWeight="600">
                        {user.name}
                      </Heading>
                      <Text pr="50px">
                        {lastMessage && lastMessage.substring(0, 50)}
                        ...
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack alignItems="flex-end" justifyContent="space-between">
                    <Text>last seen</Text>
                    <Button
                      bg="lightBlue.400"
                      color="white"
                      py={1}
                      px={2}
                      textAlign="center"
                      fontWeight="900"
                      fontSize="16px"
                      rounded="full"
                    >
                      12
                    </Button>
                  </VStack>
                </HStack>
              </Pressable>
            );
          }
        })}
    </>
  );
};

export default Contact;
