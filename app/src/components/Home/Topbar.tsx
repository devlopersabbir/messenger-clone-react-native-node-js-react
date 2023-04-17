import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  VStack,
  HStack,
  Text,
  Button,
  ScrollView,
  Modal,
  Input,
  Icon,
  Pressable,
  Avatar,
  Heading,
  Flex,
  Spinner,
  Divider,
} from "native-base";
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { IChat, IUser } from "../../utils/interfaces/interface";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import useChatUpdate from "../../hooks/useChatUpdate";
import { baseURLMac } from "../../utils/axios/axios";

interface ITopbarProps {
  navigation?: any;
}
const Topbar: React.FC<ITopbarProps> = ({ navigation }) => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const axios = useAxios();
  const toast = useToast();
  const { chatState, addNewChat, setAllChat, setSelectedChat } =
    useChatUpdate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contact, setContact] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<Array<IUser>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const createChat = () => {
    setShowModal(true);
  };
  // search user and create chat
  const searchUserAndCreateChat = async (search: string) => {
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
    toast.show("Already selected!");
  };

  // remove user from selectedUser array
  const removeUser = (user: IUser) => {
    setSelectedUser((prev) => prev.filter((u) => u.uuid !== user.uuid));
  };

  // create chat handler
  const handleCreatechat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/chats/create", {
        users: selectedUser,
      });
      toast.show(data?.message);
      setShowModal(false);
      addNewChat(data?.chat as IChat);
      setAllChat([...chatState.chats, data?.chat]);
      setSelectedUser([]);
    } catch (error: any) {
      console.log(error?.response.data);
      if (!error?.response || !error?.response?.data)
        return toast.show("Network error!");

      toast.show(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <VStack
        space={3}
        px={3}
        safeAreaTop={true}
        pb={4}
        bg="white"
        borderRadius="3xl"
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack alignItems="center" space={3}>
            <VStack alignItems="center">
              <Button
                onPress={createChat}
                p={0}
                w="65px"
                h="65px"
                rounded="full"
              >
                <AntDesign name="plus" size={32} color="white" />
              </Button>
            </VStack>
            {chatState.chats &&
              chatState?.chats?.map((chat: IChat, index: number) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelectedChat(chat as IChat);
                    navigation.navigate("Chat");
                  }}
                >
                  {chat?.users &&
                    chat?.users?.map((user: IUser, index: number) => {
                      if (user?.username !== requestUser?.username) {
                        return (
                          <VStack key={index}>
                            <Avatar
                              size="lg"
                              source={{ uri: `${baseURLMac}/${user?.image}` }}
                            >
                              <Avatar.Badge
                                bg={`${
                                  user?.status === "ONLINE"
                                    ? "green.600"
                                    : "gray.600"
                                }`}
                              />
                            </Avatar>
                          </VStack>
                        );
                      }
                    })}
                </Pressable>
              ))}
          </HStack>
        </ScrollView>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content>
          <Modal.Body>
            <Input
              onChangeText={(search) => searchUserAndCreateChat(search)}
              variant="unstyled"
              fontSize="xl"
              placeholder="Enter username..."
              px={2}
              type="text"
              w="full"
              InputRightElement={
                selectedUser.length > 0 ? (
                  <Pressable onPress={handleCreatechat}>
                    <Icon
                      size="xl"
                      mx={3}
                      as={
                        <AntDesign name="rightsquare" size={24} color="black" />
                      }
                    />
                  </Pressable>
                ) : (
                  <Icon size="xl" mx={3} as={<Feather name="search" />} />
                )
              }
            />
            <Divider mt={3} />
            <HStack space={2} my={1}>
              {selectedUser.map((u: IUser, i: number) => (
                <Pressable key={i} onPress={() => removeUser(u)}>
                  <Text
                    bg="gray.600"
                    color="white"
                    px={3}
                    py={0}
                    fontSize="18px"
                    rounded="3xl"
                    mt={2}
                    key={i}
                  >
                    {u.username}
                  </Text>
                </Pressable>
              ))}
            </HStack>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <VStack space={5}>
                {contact &&
                  contact.map((item: IUser, index: number) => (
                    <React.Fragment key={index}>
                      <Pressable
                        key={index}
                        onPress={() => selectUser(item as IUser)}
                      >
                        <Flex
                          flexDir="row"
                          align="center"
                          py={2}
                          key={index}
                          w="full"
                        >
                          <Avatar
                            size="lg"
                            source={{ uri: `${baseURLMac}/${item?.image}` }}
                          >
                            <Avatar.Badge />
                          </Avatar>
                          <VStack ml={3} space={0}>
                            <Heading fontSize="20px" fontWeight="600">
                              {item?.name}
                            </Heading>
                            <Text fontSize="17px">{item?.username}</Text>
                          </VStack>
                        </Flex>
                      </Pressable>
                      <Divider my={-5} bg="blue.300" />
                    </React.Fragment>
                  ))}
              </VStack>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Topbar;
