import { Entypo, FontAwesome } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text, TextArea } from "native-base";
import React, { useState } from "react";
import { IChat } from "../../utils/interfaces/interface";
import useMessage from "../../hooks/useMessage";
import useSocket from "../../hooks/useSocket";
import { MaterialIcons } from "@expo/vector-icons";
import useChatUpdate from "../../hooks/useChatUpdate";

interface ITypeMessageBoxProps {
  chat: IChat;
  scrollToBottom: () => void;
}

const TypeBox = ({ chat, scrollToBottom }: ITypeMessageBoxProps) => {
  const { newMessage } = useMessage();
  const { chatState } = useChatUpdate();
  const socket = useSocket();
  const [text, setText] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);

  // send message
  const submitMessage = () => {
    socket.connect();
    if (!text && text === "") return;
    if (text && chat?.uuid) {
      socket.emit(
        "chat_message",
        { text, chatUuid: chat?.uuid },
        (response: any) => {
          const message = response.message;
          newMessage(message);
          scrollToBottom();
          setText("");
        }
      );
    }
    socket?.off();
  };

  // when typing
  const handleKeyPress = () => {
    console.log("typing....");
    setTimeout(() => {
      socket?.emit("typing", {
        chat: chatState?.selectedChat,
        isTyping: false,
      });
    }, 3000);
    socket?.emit("typing", { chat: chatState.selectedChat, isTyping: true });
  };

  return (
    <HStack
      p={4}
      space={3}
      bg="gray.200"
      rounded="3xl"
      borderBottomLeftRadius="0"
      borderBottomRightRadius="0"
      alignItems="center"
      w="full"
      justifyContent="flex-start"
      overflow="hidden"
      safeAreaBottom
    >
      <Pressable>
        {typing ? <Text>Loading...</Text> : null}
        <Icon
          size="2xl"
          color="gray.900"
          as={<MaterialIcons name="attach-file" />}
        />
      </Pressable>

      <TextArea
        onKeyPress={handleKeyPress}
        autoCompleteType={false}
        type="text"
        h="10"
        w="full"
        variant="unstyled"
        placeholder="Let's type here..."
        fontSize="xl"
        overflowY="scroll"
        flex={1}
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <Pressable onPress={submitMessage}>
        <Icon size="2xl" color="blue.400" as={<FontAwesome name="send" />} />
      </Pressable>
    </HStack>
  );
};

export default TypeBox;
