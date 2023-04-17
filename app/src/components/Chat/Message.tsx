import { Box, Text, HStack, Flex, Avatar } from "native-base";
import React, { useEffect } from "react";
import { IChat, IMessage, IUser } from "../../utils/interfaces/interface";
import { baseURLMac } from "../../utils/axios/axios";

interface IMessageProps {
  message: IMessage;
  requestUser?: IUser;
  chat?: IChat;
  scrollToBottom: () => void;
}
const Message: React.FC<IMessageProps> = ({
  message,
  requestUser,
  chat,
  scrollToBottom,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [message, chat]);
  return (
    <>
      <HStack
        w="full"
        justifyContent={
          message?.userUuid === requestUser?.uuid ? "flex-end" : "flex-start"
        }
        alignItems="flex-end"
        space={1}
      >
        {message?.userUuid !== requestUser?.uuid ? (
          <>
            {chat?.users
              ?.filter((u: IUser) => requestUser?.uuid !== u?.uuid)
              .map((u: IUser, i: number) => (
                <Avatar
                  key={i}
                  size="xs"
                  source={{ uri: `${baseURLMac}/${u?.image}` }}
                />
              ))}
          </>
        ) : null}
        <Box
          w="77%"
          alignItems={
            message?.userUuid === requestUser?.uuid ? "flex-end" : "flex-start"
          }
        >
          <Flex
            bg={message?.userUuid === requestUser?.uuid ? "blue.500" : "white"}
            borderRadius={20}
            py={2}
            px={4}
          >
            <Text
              fontSize="17px"
              color={
                message?.userUuid === requestUser?.uuid ? "white" : "gray.700"
              }
            >
              {message && message.text}
            </Text>
          </Flex>
        </Box>
      </HStack>
    </>
  );
};

export default Message;
