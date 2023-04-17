import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import { IChat, IMessage, IUser } from "../../utils/interfaces/interface";
import { toast } from "react-hot-toast";
import useSocket from "../../hooks/useSocket";
import useChatUpdate from "../../hooks/useChatUpdate";
import useMessage from "../../hooks/useMessage";
import MessageItem from "../../components/MessageItem";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const socket = useSocket();
  const axios = useAxios();
  const dispatch = useDispatch();
  const { setAllChat, setSelectedChat, chatState, addNewChat } =
    useChatUpdate();
  const {
    message: messageFromRedux,
    newMessage,
    setMessage: setMessageToRedux,
  } = useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [chatUuid, setChatUuid] = useState<string>("");
  const [contact, setContact] = useState<Array<string>>([]);
  const [selectedUser, setSelectedUser] = useState<Array<IUser>>([]);
  const viewRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState<boolean>(false);

  // scrool to bottom
  const scrollTobottom = () => {
    viewRef.current?.scrollTo({
      top: viewRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  // search user and create chat
  const searchUserAndCreateChat = async (e: any) => {
    const search: string = e.target.value;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/users/search", { search });
      setContact(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // select user
  const selectUser = (user: IUser) => {
    const exists = selectedUser?.find(
      (item) => item?.username === user?.username
    );
    if (!exists) return setSelectedUser((prev) => [...prev, user]);
    toast.error("Already selected!");
  };

  // create chat handler
  const handleCreatechat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/chats/create", {
        users: selectedUser,
      });
      const chat = data?.chat;
      addNewChat(chat);
    } catch (error: any) {
      if (!error?.response || !error?.response?.data)
        return toast.error("Network error!");

      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  // send message
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.connect();
    if (message && chatUuid) {
      socket.emit(
        "chat_message",
        { text: message, chatUuid },
        (response: any) => {
          const message = response.message;
          newMessage(message);
          scrollTobottom();
          setMessage("");
        }
      );
    }
  };

  // get all chat
  useEffect(() => {
    socket.connect();
    const getChat = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/chats/get-all");
        setAllChat(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getChat();
  }, [contact, requestUser]);

  // get all message from db
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/messages/${chatState.selectedChat?.uuid}`
        );
        data &&
          data?.filter((mess: any) => {
            setMessageToRedux(mess);
          });
        scrollTobottom();
      } catch (error: any) {
        if (!error && !error.response) {
          <Text color="red.300">Server error</Text>;
        }
      }
    };
    getMessage();
  }, [chatState?.selectedChat]);

  // reverse_message for both
  useEffect(() => {
    socket.on("reverse_message", ({ message }) => {
      newMessage(message);
      scrollTobottom();
    });
    return () => {
      socket?.off("reverse_message");
    };
  }, []);

  // when user typeing
  useEffect(() => {
    socket.on("typing", ({ typing }) => {
      setTyping(typing as boolean);
    });
    return () => {
      socket?.off("typing");
    };
  }, [socket]);
  const handleTyping = () => {
    socket?.emit("typing", { chat: chatState.selectedChat, isTyping: true });
  };
  const handleKeyup = () => {
    setTimeout(() => {
      socket?.emit("typing", {
        chat: chatState?.selectedChat,
        isTyping: false,
      });
    }, 5000);
  };

  // join call
  const joinVideoCall = () => {
    chatState?.selectedChat?.users
      ?.filter((user: IUser) => requestUser?.uuid !== user?.uuid)
      .map((user: IUser, index: number) => {
        socket.connect();
        socket.emit("join-call", {
          chatUuid: chatState?.selectedChat?.uuid,
          partnerUuid: user?.uuid,
          callType: "VIDEO",
        });
      });
    navigate("/video-chat");
  };

  return (
    <>
      <Link to="uploads">Uploads</Link>
      <Flex justifyContent="space-between" w="full" gap={5}>
        <VStack w="40%" align="left">
          <Flex my={7} align="center" gap={4}>
            <Avatar name={requestUser.name}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text>{requestUser.name}</Text>
          </Flex>
          {loading ? (
            <Spinner />
          ) : (
            contact.map((item: any, index: number) => (
              <Text
                bg="gray.300"
                px={5}
                py={2}
                m={2}
                cursor="pointer"
                key={index}
                onClick={() => selectUser(item as IUser)}
              >
                {item?.username}
              </Text>
            ))
          )}

          {selectedUser.map((u: IUser, i: number) => (
            <Text key={i}>Selected User === {u.username + ","}</Text>
          ))}

          <Button onClick={handleCreatechat}>create chat</Button>
          <Input
            type="text"
            placeholder="Search user"
            onChange={searchUserAndCreateChat}
          />
          {chatState?.chats &&
            chatState?.chats?.map((item: IChat, index: number) => {
              return (
                <Box
                  key={index}
                  onClick={() => setChatUuid(item?.uuid as string)}
                >
                  {item &&
                    item?.users?.map((user: IUser, i: number) => {
                      if (user?.username !== requestUser.username) {
                        return (
                          <Text
                            my={1}
                            bg={`${
                              chatState.selectedChat?.uuid === item?.uuid
                                ? "green.500"
                                : "gray.50"
                            }`}
                            color={`${
                              user?.status === "ONLINE" ? "green.500" : "dark"
                            }`}
                            fontSize="xl"
                            key={index}
                            cursor="pointer"
                            onClick={() => setSelectedChat(item)}
                          >
                            {user?.name}
                          </Text>
                        );
                      }
                    })}
                </Box>
              );
            })}
        </VStack>
        <Flex w="60%" align="center">
          <VStack align="left" w="full">
            {/* video chat button */}
            <ButtonGroup>
              <Button onClick={() => navigate("/video-chat")}>
                Audio call
              </Button>
              <Button onClick={joinVideoCall}>Video call</Button>
            </ButtonGroup>
            <Text>{typing ? "Typing..." : null}</Text>
            {/* converstaion message */}
            <Box
              h="96"
              ref={viewRef}
              border="2px"
              borderColor="gray.200"
              maxH="full"
              p={3}
              scrollBehavior="smooth"
              overflowY="scroll"
            >
              {messageFromRedux?.message &&
                messageFromRedux?.message?.map(
                  (item: IMessage, index: number) => (
                    <MessageItem
                      message={item}
                      key={index}
                      reqUser={requestUser}
                    />
                  )
                )}
            </Box>
            {/* messaging input form */}
            <form onSubmit={sendMessage}>
              <HStack>
                <Input
                  onKeyUp={handleKeyup}
                  onKeyDown={handleTyping}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit">submit</Button>
              </HStack>
            </form>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
