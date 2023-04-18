import { FontAwesome } from "@expo/vector-icons";
import { HStack, Icon, Pressable, TextArea, useColorMode } from "native-base";
import React, { useState } from "react";
import { IChat } from "../../utils/interfaces/interface";
import useMessage from "../../hooks/useMessage";
import useSocket from "../../hooks/useSocket";
import { MaterialIcons } from "@expo/vector-icons";
import useChatUpdate from "../../hooks/useChatUpdate";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFileUpload from "../../hooks/useFileUpload";
import * as ImagePicker from "expo-image-picker";

interface ITypeMessageBoxProps {
  chat: IChat;
  scrollToBottom: () => void;
}

const TypeBox = ({ chat, scrollToBottom }: ITypeMessageBoxProps) => {
  const { newMessage } = useMessage();
  const { chatState } = useChatUpdate();
  const { bottom } = useSafeAreaInsets();
  const socket = useSocket();
  const [text, setText] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const { data: imageData, success, error, upload } = useFileUpload();

  // image picker
  const pickImage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: undefined,
        quality: 1,
      });
      if (!response.canceled) {
        const resImage = response?.assets;
        resImage?.filter((item: any) => {
          if (item?.type !== "image") return console.log("Please input image!");
          const imageType = item?.uri.split(".")[1];
          upload({
            uri: item.uri,
            type: item.type,
            name: `image.${imageType}`,
          });
        });
      }
    } catch (error) {
      if (error) return console.log("Image not uploaded!");
    }
  };

  // send message
  const submitMessage = () => {
    socket.connect();
    if (!text && text === "") return;
    if (text && chat?.uuid) {
      socket.emit(
        "chat_message",
        { text, image: imageData, chatUuid: chat?.uuid },
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
    setTimeout(() => {
      socket?.emit("typing", {
        chat: chatState?.selectedChat,
        isTyping: false,
      });
      setTyping(true);
    }, 3000);
    socket?.emit("typing", { chat: chatState.selectedChat, isTyping: true });
  };

  return (
    <HStack
      pt={4}
      px={4}
      pb={bottom}
      space={3}
      bg={colorMode === "dark" ? "gray.600" : "white"}
      rounded="3xl"
      borderBottomLeftRadius="0"
      borderBottomRightRadius="0"
      alignItems="center"
      w="full"
      justifyContent="flex-start"
      overflow="hidden"
    >
      <Pressable onPress={pickImage}>
        <Icon
          size="2xl"
          color={colorMode === "dark" ? "white" : "gray.900"}
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
        placeholderTextColor={colorMode === "dark" ? "white" : "gray.900"}
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
