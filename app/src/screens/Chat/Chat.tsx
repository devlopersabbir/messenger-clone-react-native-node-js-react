import { ScrollView, Text, useToast, View, VStack } from "native-base";
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
  const viewRef = useRef<HTMLDivElement>(null);

  const scrollTobottom = () => {
    viewRef.current?.scrollTo({
      top: viewRef.current?.scrollHeight,
      behavior: "smooth",
    });
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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <View flex={1} bg="white">
      <Header chat={chatState.selectedChat} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bg="gray.100"
        pt={4}
        px={3}
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
        </VStack>
      </ScrollView>
      <TypeBox
        chat={chatState.selectedChat as IChat}
        scrollToBottom={scrollTobottom}
      />
    </View>
  );
};

export default Chat;
