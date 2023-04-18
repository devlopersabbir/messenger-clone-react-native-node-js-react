import { Flex, Text, useColorMode, useToast, VStack } from "native-base";
import { TypingAnimation } from "react-native-typing-animation";

import { ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Message from "../../components/Chat/Message";
import TypeBox from "../../components/Chat/TypeBox";
import { ChatScreen } from "../../utils/PageTypes";
import { useSelector } from "react-redux";
import Loading from "../../components/common/Home/Loader/Loading";
import ErrorMessage from "../../components/common/Home/Loader/ErrorMessage";
import useAxios from "../../hooks/useAxios";
import useChatUpdate from "../../hooks/useChatUpdate";
import useMessage from "../../hooks/useMessage";
import { IChat, IMessage } from "../../utils/interfaces/interface";
import useSocket from "../../hooks/useSocket";
import Header from "../../components/Chat/Header";

const Chat = ({ navigation }: ChatScreen) => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const toast = useToast();
  const { colorMode } = useColorMode();
  const axios = useAxios();
  const socket = useSocket();
  const { chatState } = useChatUpdate();
  const {
    message: messageFromRedux,
    setMessage: setMessageToRedux,
    newMessage,
  } = useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isTyping, setTyping] = useState<boolean>(false);
  const viewRef = useRef<any>(null);

  // scrollTobottom function
  const scrollTobottom = () => {
    viewRef.current?.scrollToEnd({ animated: true, behavior: "smooth" });

    // if (viewRef.current) {
    //   viewRef.current?.scrollTo({
    //     left: viewRef.current?.scrollHeight,
    //     behavior: "smooth",
    //   });
    // }
  };
  // get all message from db
  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/v1/messages/${chatState?.selectedChat?.uuid}`
        );
        data &&
          data?.filter((mess: any) => {
            setMessageToRedux(mess);
          });
        scrollTobottom();
      } catch (error: any) {
        console.log(error?.response?.data);
        if (!error && !error.response) {
          <Text color="red.300">Server error</Text>;
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMessage();
  }, [socket]);
  // reverse_message for both
  useEffect(() => {
    socket?.on("reverse_message", ({ message }) => {
      newMessage(message);
      scrollTobottom();
    });
    return () => {
      socket?.off("reverse_message");
      scrollTobottom();
    };
  }, [socket]);

  // when user typeing
  useEffect(() => {
    socket.on("typing", ({ typing }) => {
      setTyping(typing as boolean);
      // console.log(typing);
    });
    return () => {
      socket?.off("typing");
    };
  }, [socket]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <Flex
      flex={1}
      justifyContent="space-between"
      bg={colorMode === "dark" ? "gray.900" : "gray.100"}
    >
      <Header chat={chatState.selectedChat} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          overflow: "scroll",
          paddingRight: 12,
          paddingLeft: 12,
          paddingBottom: 4,
          paddingTop: 4,
        }}
        ref={viewRef}
      >
        <VStack space={2} w="full" pb={8}>
          {messageFromRedux?.message &&
            messageFromRedux?.message?.map((item: IMessage, index: number) => (
              <Message
                key={index}
                requestUser={requestUser}
                message={item}
                chat={chatState?.selectedChat}
                scrollToBottom={scrollTobottom}
              />
            ))}

          {isTyping ? (
            <TypingAnimation
              dotColor={colorMode === "dark" ? "white" : "black"}
              dotMargin={8}
              dotAmplitude={5}
              dotSpeed={0.2}
              dotRadius={2.5}
              dotX={12}
              dotY={6}
            />
          ) : null}
        </VStack>
      </ScrollView>
      <TypeBox
        chat={chatState.selectedChat as IChat}
        scrollToBottom={scrollTobottom}
      />
    </Flex>
  );
};

export default Chat;
